"use client";

import PositionsCard from "@/components/sections/positions-card";

export default function Page() {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-3 gap-4">
        <PositionsCard />
      </div>
    </div>
  );
}
