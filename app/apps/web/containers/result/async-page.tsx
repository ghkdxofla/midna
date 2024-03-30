"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import logo from "@/public/logo.webp";
import { Separator } from "@/components/ui/separator";
import { Charts } from "@/components/result/charts";

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b p-2 shadow-sm">
      <div className="container flex">
        <div className="flex basis-6/12 items-center justify-start">
          <Link href="/">
            <Image
              className="inline-block"
              width={48}
              height={48}
              src={logo}
              alt={"MiDNA logo"}
            />
            <h1 className="inline-block pt-2 text-xl font-semibold">MiDNA</h1>
          </Link>
          <Separator className="mx-4 h-8" orientation={"vertical"} />
          <div className="flex grow"></div>
        </div>
      </div>
    </div>
  );
};

export default function Dna() {
  return (
    <>
      <Header />
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
