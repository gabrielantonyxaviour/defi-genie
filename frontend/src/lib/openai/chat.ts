import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function generateChatResponse({
  input,
  setConvo,
}: {
  input: string;
  setConvo: (message: string) => void;
}) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: input,
      },
    ],
  });

  console.log(completion);

  setConvo(completion.choices[0].message.content || "");
}
