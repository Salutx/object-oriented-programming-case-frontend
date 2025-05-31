"use client";

import Styles from "./Catalog.module.scss";
import AsideFilters from "./components/AsideFilters/AsideFilters";
import Main from "./components/Main/Main";

const Catalog = () => {
  return (
    <div className={Styles.Container}>
      <AsideFilters />
      <Main />
    </div>
  );
};

export default Catalog;
