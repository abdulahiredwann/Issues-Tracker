"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient();
function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
  );
}

export default QueryClientProvider;
