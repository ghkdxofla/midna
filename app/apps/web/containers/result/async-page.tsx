"use client";

import { Charts, ChartData } from "@/components/result/charts";
import { usePathname, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAnalysis, useAnalysisStore } from "@/lib/stores/analysis";
import { useWalletStore } from "@/lib/stores/wallet";
import { useClientStore } from "@/lib/stores/client";

function extractSequencesFromFastq(fastqContent: string): string[] {
  const lines = fastqContent.split(' ');
  const sequences: string[] = [];

  // FASTQ 파일의 특성상, 두 번째 줄은 각 시퀀스를 포함하므로,
  // 모든 4줄 집합의 두 번째 줄을 추출
  for (let i = 3; i < lines.length; i += 8) {
    sequences.push(lines[i]);
  }

  return sequences;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }

  return matrix[a.length][b.length];
}

function calculateSimilarityScore(sequence: string, subsequence: string, threshold: number): number {
  let count = 0;

  for (let i = 0; i <= sequence.length - subsequence.length; i++) {
    const substring = sequence.substr(i, subsequence.length);
    const distance = levenshteinDistance(substring, subsequence);
    if (distance <= threshold) {
      count++;
    }
  }

  return count;
}

function formatChartData(analysisResult: { [disease: string]: { name: string; total: number }[] }): ChartData[] {
  const chartData: ChartData[] = [];

  for (const disease in analysisResult) {
    const sequenceScores = analysisResult[disease];
    const formattedData: ChartData = { disease } as ChartData;

    sequenceScores.forEach((score, index) => {
      formattedData[`sequence${index + 1}`] = score.total;
    });

    chartData.push(formattedData);
  }

  return chartData;
}

function analyzeSequences(fastqData: string) {
  const sequences = extractSequencesFromFastq(fastqData);
  const chartData: { [disease: string]: { name: string; total: number }[] } = {};

  for (const [disease, subsequence] of rareDiseaseSubsequences) {
    chartData[disease] = sequences.map((sequence, index) => {
      const similarityScore = calculateSimilarityScore(sequence, subsequence, subsequence.length * 0.7);
      return {
        name: `Sequence ${index + 1}`,
        total: similarityScore,
      };
    });
  }

  return chartData;
}

const fastqData = `
@SRR001666.1 071112_SLXA-EAS1_s_7:5:1:817:345 length=36
GGGTGATGGCCGCTGCCGATGGCGTCAAATCCCACC
+SRR001666.1 071112_SLXA-EAS1_s_7:5:1:817:345 length=36
IIIIIIIIIIIIIIIIIIIIIIIIIIIIATG9IC
@SRR001666.2 071112_SLXA-EAS1_s_7:5:1:801:338 length=36
GTTCAGGGATACGACGTTGTATTTTAAGAATCTGA
+SRR001666.2 071112_SLXA-EAS1_s_7:5:1:801:338 length=36
IIIIIIIIIIIIIIIIIIIIIIIIIIIII6IBI
@SRR001666.7 071112_SLXA-EAS1_s_7:5:1:818:347 length=36
CGTACGTACGTACGTACGTACGTACGTACGTACGTA
+SRR001666.7 071112_SLXA-EAS1_s_7:5:1:818:347 length=36
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
@SRR001666.8 071112_SLXA-EAS1_s_7:5:1:812:342 length=36
TAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGC
+SRR001666.8 071112_SLXA-EAS1_s_7:5:1:812:342 length=36
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
`;

const rareDiseaseSubsequences = [
  ["Disease 1", "CATGCGA"],
  ["Disease 2", "TTTTATT"],
  ["Disease 3", "AAAGTCT"],
  ["Disease 4", "GCGCGCT"],
];

export default function Dna() {
  const pathname = usePathname();
  const param = useParams();
  const [data, setData] = useState<ChartData[]>([]);

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
      const fastqData = analysisStore.data[url];
      const analysisResult = analyzeSequences(fastqData);
      const chartData = formatChartData(analysisResult);
      setData(chartData);
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
