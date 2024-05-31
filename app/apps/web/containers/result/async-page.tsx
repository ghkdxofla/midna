"use client";

import { Charts, ChartData } from "@/components/result/charts";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useWalletStore } from "@/lib/stores/wallet";
import { useClientStore } from "@/lib/stores/client";
import apiClient from "@/lib/axios";

export default function Dna() {
  const pathname = usePathname();
  const param = useParams();
  const [data, setData] = useState<ChartData[]>([]);

  const wallet = useWalletStore();
  const client = useClientStore();

  if (param["url"] === undefined) {
    return <></>;
  }

  const url = param["url"];

  useEffect(() => {
    if (!client.client || !wallet.wallet) return;

    const loadAnalysis = async () => {
      try {
        const response = await apiClient.get(`/api/analysis/${wallet.wallet}`);
        const fastqData = response.data.data[url];
        const rareDiseaseSubsequences = [
          ["Disease 1", "CATGCGA"],
          ["Disease 2", "TTTTATT"],
          ["Disease 3", "AAAGTCT"],
          ["Disease 4", "GCGCGCT"],
        ];
        
        const analysisResponse = await apiClient.post('/api/analysis/', {
          fastq_data: fastqData,
          rare_disease_subsequences: rareDiseaseSubsequences,
        });
        setData(analysisResponse.data.data);
      } catch (error) {
        console.error("Error fetching analysis data", error);
      }
    };
    
    loadAnalysis();
  }, [url]);

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
