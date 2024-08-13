import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/ui/side-bar";
import { Button } from "./button";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/",
  },
  {
    title: "Account",
    href: "/",
  },
  {
    title: "Appearance",
    href: "/",
  },
  {
    title: "Notifications",
    href: "/",
  },
  {
    title: "Display",
    href: "/",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
          <Button variant="outline" className="my-auto">
            Connect Wallet
          </Button>
        </div>
        <Separator />

        <div className="flex flex-1 space-x-12 pt-6 w-full">
          <aside className="-mx-2 w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>

          <div className="flex-1 h-full">{children}</div>
        </div>
      </div>
    </>
  );
}
