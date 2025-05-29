"use client";

import { CatalogContextProvider } from "@/contexts/CatalogContext";
import Styles from "./Catalog.module.scss";
import AsideFilters from "./components/AsideFilters/AsideFilters";
import Main from "./components/Main/Main";

const Catalog = () => {
  return (
    <CatalogContextProvider>
      <div className={Styles.Container}>
        <AsideFilters />
        <Main />
      </div>
    </CatalogContextProvider>
  );
};

export default Catalog;
