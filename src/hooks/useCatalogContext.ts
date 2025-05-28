import { CatalogContext } from "@/contexts/CatalogContext";
import { useContext } from "react";

const useCatalogContext = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalogContext must be used within a CatalogProvider");
  }
  return context;
};

export default useCatalogContext;
