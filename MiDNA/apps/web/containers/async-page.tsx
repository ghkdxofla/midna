"use client";

import Link from "next/link";

export default function Dna() {
  return (
    <div className="mx-auto -mt-32 h-full pt-16">
      <div className="flex h-full w-full items-center justify-center pt-16">
        <div className="flex basis-4/12 flex-col items-center justify-center 2xl:basis-3/12">
          <h1 className="text-xl font-bold">MiDNA</h1>
          <input
            id="dna"
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter DNA"
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-center pt-16">
        <nav>
          <ul>
            <li><Link href="/faucet" className="text-blue-500 underline">Faucet</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
