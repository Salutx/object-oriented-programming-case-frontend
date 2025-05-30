import Styles from "./layout.module.scss";

import Navbar from "@/components/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={Styles.Layout}>
      <Navbar />
      {children}
    </div>
  );
}
