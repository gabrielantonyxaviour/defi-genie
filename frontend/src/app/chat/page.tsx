"use client";

import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";

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
      message: "Hello! How can I help you today?",
    },
    {
      id: "2",
      isAI: false,
      message: "I'm having trouble with my account.",
    },
    {
      id: "3",
      isAI: true,
      message: "What seems to be the problem?",
    },
    {
      id: "4",
      isAI: false,
      message: "I can't log in.",
    },
  ]);
  return (
    <div className="flex-1 w-[80%] mx-auto pt-8">
      {convos.map((convo) => (
        <div
          key={convo.id}
          className={`flex ${
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
  );
}
