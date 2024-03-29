"use client";
import AsyncLayoutDynamic from "@/containers/faucet/async-layout-dynamic";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AsyncLayoutDynamic>{children}</AsyncLayoutDynamic>
  );
}
