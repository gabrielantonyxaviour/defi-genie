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
import { Link } from "lucide-react";
import { cn } from "@/lib/utils";
import { MainNav } from "./navbar";

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
  const [access, setAccess] = useState(true); // TODO: Turn this off
  return (
    <>
      {/* <PasscodeDialog
        passcode={passCode}
        setPasscode={setPasscode}
        setAccess={setAccess}
      /> */}
      {access && (
        <div className="px-8 w-full h-screen flex flex-col">
          <div className="flex w-full justify-between">
            <div className="flex items-center py-6">
              <Image src={"/logo.png"} height={50} width={50} alt="Logo" />
              <MainNav className="mx-6" />
            </div>
            <ConnectButton />
          </div>

          <div className="flex flex-1 space-x-12 w-full">
            <div className="flex-1 flex flex-col w-full h-full">
              {status != "connected" ? <DefaultLanding /> : children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
