"use client";

import { useAccount } from "wagmi";
import DefaultLanding from "@/components/sections/default-landing";
export default function Page() {
  const { status } = useAccount();

  if (status == "disconnected") return <DefaultLanding />;

  return <div className="flex-1"></div>;
}
