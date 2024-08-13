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
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5 flex w-full justify-between">
          <div className="flex">
            <Image src={"/logo.png"} height={50} width={60} alt="Logo" />
            <h2 className="text-2xl font-bold tracking-tight ml-2">
              Defi.Genie
            </h2>
          </div>
          <Button variant="outline">Connect Wallet</Button>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
