"use client";

import Catalog from "@/containers/Catalog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Catalog />
    </QueryClientProvider>
  );
}
