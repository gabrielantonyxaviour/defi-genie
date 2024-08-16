import Image from "next/image";

import { SidebarNav } from "@/components/ui/side-bar";
import { Button } from "@/components/ui/button";
import ConnectButton from "@/components/ui/connect-button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { useAccount } from "wagmi";
import DefaultLanding from "../sections/default-landing";
import { useState } from "react";
import PasscodeDialog from "./passcode-dialog";

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
  const [passCode, setPasscode] = useState("");
  const [access, setAccess] = useState(false);
  return (
    <>
      <PasscodeDialog
        passcode={passCode}
        setPasscode={setPasscode}
        setAccess={setAccess}
      />
      {access && (
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
