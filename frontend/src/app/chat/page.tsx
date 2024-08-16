"use client";

import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import generateChatResponse from "@/lib/openai/chat";
import { useAccount } from "wagmi";
import { forma } from "viem/chains";

interface Convo {
  id: string;
  isAI: boolean;
  message: string;
}

export default function Page() {
  const [convos, setConvos] = useState<Convo[]>([
    {
      id: "1",
      isAI: true,
      message: "Hello Degen, how can I help you today?",
    },
  ]);
  const [prompt, setPrompt] = useState<string>("");
  const { status } = useAccount();
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full mx-auto pt-8">
      <div className="flex-1 w-[80%] ">
        {convos.map((convo) => (
          <div
            key={convo.id}
            className={`flex text-sm ${
              convo.isAI ? "justify-start" : "justify-end"
            } items-center space-x-2`}
          >
            {convo.isAI && (
              <Avatar className="h-9 w-9">
                <AvatarImage src={"/logo.png"} alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
            )}
            <Card>
              <CardContent className="py-3">
                <p className="">{convo.message}</p>
              </CardContent>
            </Card>
            {!convo.isAI && (
              <Avatar className="h-9 w-9">
                <AvatarImage src={"/coins/usdt.png"} alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      <div className="flex mx-auto py-4 w-[75%]">
        <Input
          type="text"
          disabled={status != "connected"}
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          placeholder="Enter your prompt"
          className="sticky top-0 z-50  border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        />
        <Button
          className="ml-2"
          disabled={status != "connected"}
          onClick={async () => {
            const currentConvo = {
              id: (convos.length + 1).toString(),
              isAI: false,
              message: prompt,
            };
            setConvos([...convos, currentConvo]);
            await generateChatResponse({
              input: prompt,
              setConvo: (response) =>
                setConvos([
                  ...convos,
                  currentConvo,
                  {
                    id: (convos.length + 1).toString(),
                    isAI: true,
                    message: response,
                  },
                ]),
            });
            setPrompt("");
          }}
        >
          <Icons.rightArrow className="h-3 w-3 fill-current" />
        </Button>
      </div>
    </div>
  );
}
