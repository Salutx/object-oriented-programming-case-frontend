"use client";

import { createContext, useState } from "react";
import {
  CatalogContextProps,
  CatalogContextProviderProps,
} from "./CatalogContext.types";

export const CatalogContext = createContext<CatalogContextProps>(
  {} as CatalogContextProps
);

export const CatalogContextProvider = ({
  children,
}: CatalogContextProviderProps) => {
  const [filteredCategories, setFilteredCategories] = useState<number[]>([]);

  const handleFilterCategory = (categoryId: number) => {
    setFilteredCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const handleResetFilters = () => {
    setFilteredCategories([]);
  };

  return (
    <CatalogContext.Provider
      value={{ handleFilterCategory, filteredCategories, handleResetFilters }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
