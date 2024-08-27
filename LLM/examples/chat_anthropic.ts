import { Contract, ethers, TransactionReceipt, Wallet } from "ethers";
import ABI from "./abis/AnthropicChatGpt.json";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface Message {
  role: string;
  content: string;
}

interface ResponseFormat {
  action: string;
  params: string;
  response: string;
}

const app = express();
app.use(express.json());

app.post('/start-chat', async (req, res) => {
  const rpcUrl = process.env.RPC_URL;
  if (!rpcUrl) return res.status(500).send("Missing RPC_URL in .env");
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) return res.status(500).send("Missing PRIVATE_KEY in .env");
  const contractAddress = process.env.ANTROPIC_CONTRACT_ADDRESS;
  if (!contractAddress) return res.status(500).send("Missing ANTROPIC_CONTRACT_ADDRESS in .env");

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new Wallet(privateKey, provider);
  const contract = new Contract(contractAddress, ABI, wallet);

  try {
    const message = req.body.message;
    if (!message) return res.status(400).send("Message is required");

    const transactionResponse = await contract.startChat(message);
    const receipt = await transactionResponse.wait();

    let chatId = getChatId(receipt, contract);
    if (chatId === undefined) {
      return res.status(500).send("Failed to get chat ID");
    }

    let lastProcessedMessageIndex = -1;
    let assistantResponse: ResponseFormat | null = null;

    while (!assistantResponse) {
      const newMessages: Message[] = await getNewMessages(contract, chatId, lastProcessedMessageIndex + 1);
      if (newMessages.length > 0) {
        for (let msg of newMessages) {
          if (msg.role === "assistant") {
            assistantResponse = parseAssistantResponse(msg.content);
            lastProcessedMessageIndex++;
            break;
          }
        }
      }
      if (!assistantResponse) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    res.status(200).json(assistantResponse);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
});

function getChatId(receipt: TransactionReceipt, contract: Contract): number | undefined {
  for (const log of receipt.logs) {
    try {
      const parsedLog = contract.interface.parseLog(log);
      if (parsedLog && parsedLog.name === "ChatCreated") {
        return Number(parsedLog.args[1]);
      }
    } catch (error) {
      // Silently ignore parsing errors
    }
  }
}

async function getNewMessages(
  contract: Contract,
  chatId: number,
  startIndex: number
): Promise<Message[]> {
  const messages = await contract.getMessageHistory(chatId);
  return messages.slice(startIndex).map((message: any) => ({
    role: message.role,
    content: message.content[0].value,
  }));
}

function parseAssistantResponse(content: string): ResponseFormat {
  const match = content.match(/\{\s*"action":\s*"([^"]*)"\s*,\s*"params":\s*"([^"]*)"\s*,\s*"response":\s*"([^"]*)"\s*\}/);
  if (match) {
    return {
      action: match[1],
      params: match[2],
      response: match[3].replace(/\\n/g, '\n')  // Replace escaped newlines with actual newlines
    };
  } else {
    return {
      action: "",
      params: "",
      response: content
    };
  }
}

app.listen(3000, () => {
  // Server is running
});