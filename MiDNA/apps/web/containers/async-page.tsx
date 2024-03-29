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

const FormSchema = z.object({
  dna: z.string().min(2, {
    message: "DNA must be at least 2 characters.",
  }),
});

const Search = () => {
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
          <div className="flex">
            <FormDescription>This is your DNA.</FormDescription>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default function Dna() {
  return (
    <div className="mx-auto -mt-32 h-full pt-16">
      <div className="flex h-full w-full items-center justify-center pt-16">
        <div className="flex basis-9/12 flex-col items-center justify-center 2xl:basis-3/12">
          <h1 className="text-xl font-bold">MiDNA</h1>
          <Search />
        </div>
      </div>
      <div className="flex w-full items-center justify-center pt-16">
        <nav>
          <ul>
            <li>
              <Link href="/faucet" className="text-blue-500 underline">
                Faucet
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
