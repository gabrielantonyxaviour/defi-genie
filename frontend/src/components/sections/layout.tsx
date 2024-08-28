import Image from "next/image";

import ConnectButton from "@/components/ui/connect-button";
import { useAccount } from "wagmi";
import DefaultLanding from "../sections/default-landing";
import { useEffect, useState } from "react";
import { MainNav } from "./navbar";
import AIComponent from "./ai";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowLeftCircleIcon,
  ArrowRight,
  ArrowRightCircleIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useTokenBalance } from "./context";
import axios from "axios";
interface Convo {
  id: string;
  isAI: boolean;
  message: string;
}

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
  const { balanceObject } = useTokenBalance();
  const [access, setAccess] = useState(true); // TODO: Turn this off
  const [openAi, setOpenAi] = useState(false);
  const [convos, setConvos] = useState<Convo[]>([]);
  useEffect(() => {
    (async function () {
      console.log("BEFORE SNEDING TO AI");
      console.log(JSON.stringify(balanceObject));
      if (balanceObject != null && convos.length == 0) {
        try {
          const response = await axios.post("/api/classify", {
            message: JSON.stringify(balanceObject),
          });

          console.log(response.data);
          if (response.data.success == false) throw Error("Error in response");

          console.log(typeof response.data.response.response);
          setConvos([
            {
              id: "1",
              isAI: true,
              message: response.data.response.response.replace(/\n/g, "<br />"),
            },
          ]);
          console.log({
            id: "1",
            isAI: true,
            message: response.data.response.response.replace(/\n/g, "<br />"),
          });
        } catch (e) {
          console.log(e);
          setConvos([
            ...convos,
            {
              id: "1",
              isAI: true,
              message:
                "There is something wrong with the AI. Please contact @marshal_14627 in Discord.",
            },
          ]);
        }
      }
    })();
  }, [balanceObject]);
  return (
    <>
      {access && (
        <div className="h-screen flex">
          <div className="px-8 w-full flex flex-col justify-center items-center">
            <div className="flex w-full justify-between">
              <div className="flex justify-between py-6 w-full">
                <div className="flex items-center">
                  <Image src={"/logo.png"} height={50} width={50} alt="Logo" />
                  <MainNav className="mx-6" />
                </div>
                <div className="flex">
                  <ConnectButton />
                </div>
              </div>
            </div>

            <div className="flex flex-1 space-x-12 w-full">
              <div className="flex-1 flex flex-col w-full h-full">
                {status != "connected" ? <DefaultLanding /> : children}
              </div>
            </div>
          </div>
          <Button
            disabled={status != "connected"}
            className="z-10 absolute bottom-10 right-10 border-2 rounded-full border-muted-foreground bg-transparent border-none hover:border-none hover:bg-transparent"
            onClick={() => {
              setOpenAi(true);
            }}
          >
            <Image
              src={"/ai.gif"}
              height={80}
              width={80}
              alt="Logo"
              className=" rounded-full border-[2px]"
            />
          </Button>
          <Sheet open={openAi}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="relative">
                  <ArrowRight
                    className="h-10 w-10 absolute -left-9 bg-background border-[1px]  p-2 text-WHITE cursor-pointer rounded-lg"
                    onClick={() => {
                      setOpenAi(false);
                    }}
                  />
                </SheetTitle>
                <SheetDescription className="h-screen">
                  <AIComponent
                    convos={convos}
                    setConvos={setConvos}
                    setClassifyResponse={setClassifyResponse}
                  />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </>
  );
}
