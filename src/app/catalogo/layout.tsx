import Styles from "./layout.module.scss";

import Navbar from "@/components/Navbar";
import { CatalogContextProvider } from "@/contexts/CatalogContext";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CatalogContextProvider>
      <div className={Styles.Layout}>
        <Navbar />
        {children}
      </div>
    </CatalogContextProvider>
  );
}
