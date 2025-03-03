"use client";

import { CommandPaletteProvider } from "@/components/context/command-palette-context";
import { dexieStorageProvider } from "@/lib/idb";
import { SWRConfig } from "swr";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CommandPaletteProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <SWRConfig
          value={{
            provider: typeof window !== "undefined" ? dexieStorageProvider : undefined,
            keepPreviousData: true,
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnMount: true
          }}
        >
          {children}
        </SWRConfig>
      </div>
    </CommandPaletteProvider>
  );
}
