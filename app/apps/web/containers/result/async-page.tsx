"use client";

import { Charts } from "@/components/result/charts";

export default function Dna() {
  return (
    <>
      <div className="mx-auto -mt-32 h-full pt-16">
        <div className="flex h-full w-full items-center justify-center pt-16">
          <div className="flex basis-9/12 flex-col items-center justify-center 2xl:basis-3/12">
            <Charts />
          </div>
        </div>
      </div>
    </>
  );
}
