import Image from "next/image";

import ConnectButton from "@/components/ui/connect-button";
import { useAccount } from "wagmi";
import DefaultLanding from "../sections/default-landing";
import { useState } from "react";
import { MainNav } from "./navbar";
import AIComponent from "./ai";

interface ClassifyResponse {
  response: string;
  action: string;
  params: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { status } = useAccount();
  const [classifyResponse, setClassifyResponse] = useState<ClassifyResponse>({
    response: "",
    action: "",
    params: "",
  });
  const [access, setAccess] = useState(true); // TODO: Turn this off
  return (
    <>
      {access && (
        <div className="h-screen flex">
          <div className="px-8 w-[75%] flex flex-col justify-center items-center">
            <div className="flex w-full justify-between">
              <div className="flex items-center py-6">
                <Image src={"/logo.png"} height={50} width={50} alt="Logo" />
                <MainNav className="mx-6" />
              </div>
            </div>

            <div className="flex flex-1 space-x-12 w-full">
              <div className="flex-1 flex flex-col w-full h-full">
                {status != "connected" ? <DefaultLanding /> : children}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center p-4 h-full bg-background border">
            <ConnectButton />
            <AIComponent
              classifyResponse={classifyResponse}
              setClassifyResponse={setClassifyResponse}
            />
          </div>
        </div>
      )}
    </>
  );
}
