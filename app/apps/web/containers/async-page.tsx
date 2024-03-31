"use client";

import { useWalletStore } from "@/lib/stores/wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ReactNode, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";

import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import logo from "@/public/logo.webp";

import { useAnalysis, useAnalysisStore } from "@/lib/stores/analysis";

import { buttonVariants } from "@/components/ui/button";

const FormSchema = z.object({
  dna: z.string().min(2, {
    message: "DNA must be at least 2 characters.",
  }),
});

export interface SearchProps {
  wallet?: string;
  loading: boolean;
  onConnectWallet: () => void;
  onAnalysis: () => void;
}

const Search = ({
  wallet,
  loading,
  onConnectWallet,
  onAnalysis,
}: SearchProps) => {
  if (!wallet) {
    onConnectWallet();
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dna: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    onAnalysis();
  }

  return (
    <div className="my-5 w-3/4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="w-full items-center">
              <FormField
                control={form.control}
                name="dna"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="hidden">DNA</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Your DNA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mx-2 my-2 w-20 flex-none">
              <Button type="submit">Search</Button>
            </div>
          </div>
          <div>
            <FormDescription>
              AAAAAAAAATTTTTTTTTTTTTTTTCCCCCCCCC
            </FormDescription>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default function Dna() {
  const wallet = useWalletStore();
  const analysisStore = useAnalysisStore();
  const analysis = useAnalysis();
  const router = useRouter();
  const [link, setLink] = useState(<></>);

  useEffect(() => {
    if (!wallet.wallet) return;

    const url = analysisStore.url[wallet.wallet] ?? "";
    if (url) {
      setLink(
        <Link
          href={`/result/${url}`}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          View your result
        </Link>,
      );
    }
  }, [analysisStore.url]);

  return (
    <div className="mx-auto -mt-32 h-full pt-16">
      <div className="flex h-full w-full items-center justify-center pt-16">
        <div className="flex basis-9/12 flex-col items-center justify-center 2xl:basis-3/12">
          <div className="logoAnimation mb-4 origin-center rotate-[30deg] transform">
            <Image src={logo} alt="Logo" width={120} height={120} />
          </div>
          <h1 className="text-3xl font-bold">MiDNA</h1>
          <Search
            wallet={wallet.wallet}
            onConnectWallet={wallet.connectWallet}
            onAnalysis={analysis}
            loading={false}
          />
          {link}
        </div>
      </div>
    </div>
  );
}
