"use client";
import AsyncLayoutDynamic from "@/containers/drip/async-layout-dynamic";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AsyncLayoutDynamic>{children}</AsyncLayoutDynamic>
  );
}
