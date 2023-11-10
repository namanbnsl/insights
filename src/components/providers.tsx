"use client";

import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  return (
    <SessionProvider>
      {props.children}
      <Toaster />
    </SessionProvider>
  );
};

export default Providers;
