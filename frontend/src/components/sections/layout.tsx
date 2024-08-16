import Image from "next/image";

import { SidebarNav } from "@/components/ui/side-bar";
import { Button } from "@/components/ui/button";
import ConnectButton from "@/components/ui/connect-button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { useAccount } from "wagmi";
import DefaultLanding from "../sections/default-landing";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
  },
  {
    title: "Positions",
    href: "/positions",
  },

  {
    title: "Ask AI",
    href: "/chat",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { status } = useAccount();
  return (
    <>
      <div className="px-8 w-full h-screen flex flex-col">
        <div className="flex w-full justify-between">
          <div className="flex items-center py-6">
            <Image src={"/logo.png"} height={50} width={60} alt="Logo" />
            <h2 className="text-xl font-bold tracking-tight ml-2">
              Defi.Genie
            </h2>
          </div>
          <ConnectButton />
        </div>

        <div className="flex flex-1 space-x-12 w-full">
          <aside className="-mx-2 w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>

          <div className="flex-1 flex flex-col w-full h-full">
            {status != "connected" ? <DefaultLanding /> : children}
            <div className="flex w-[75%] mx-auto py-4">
              <Input
                type="text"
                disabled={status != "connected"}
                placeholder="Enter your prompt"
                className="sticky top-0 z-50  border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              />
              <Button className="ml-2" disabled={status != "connected"}>
                <Icons.rightArrow className="h-3 w-3 fill-current" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
