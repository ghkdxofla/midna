"use client";

import { Charts } from "@/components/result/charts";
import { usePathname, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAnalysis, useAnalysisStore } from "@/lib/stores/analysis";
import { useWalletStore } from "@/lib/stores/wallet";
import { useClientStore } from "@/lib/stores/client";

const data1 = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

const data2 = [
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

const dicts = {
  "0": data1,
  "1": data2,
};

export default function Dna() {
  const pathname = usePathname();
  const param = useParams();
  const [data, setData] = useState([]);

  const wallet = useWalletStore();
  const client = useClientStore();
  const analysisStore = useAnalysisStore();

  if (param["url"] === undefined) {
    return <></>;
  }

  const url = param["url"];

  useEffect(() => {
    if (!client.client || !wallet.wallet) return;

    const load = async () => {
      await analysisStore.loadAnalysis(client.client!, wallet.wallet!);
    };
    load();
  }, [url]);

  useEffect(() => {
    if (!client.client || !wallet.wallet) return;

    if (analysisStore.url[wallet.wallet] == url) {
      setData(dicts[url]);
    }
  }, [analysisStore.url]);

  return (
    <>
      <div className="mx-auto -mt-32 h-full pt-16">
        <div className="flex h-full w-full items-center justify-center pt-16">
          <div className="flex basis-9/12 flex-col items-center justify-center 2xl:basis-3/12">
            <Charts data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
