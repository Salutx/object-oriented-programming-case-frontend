"use client";

import { createContext, useEffect, useState } from "react";
import {
  CatalogContextProps,
  CatalogContextProviderProps,
} from "./CatalogContext.types";
import { useFavoriteBookQuery } from "@/hooks/useFavoriteBook";

export const CatalogContext = createContext<CatalogContextProps>(
  {} as CatalogContextProps
);

export const CatalogContextProvider = ({
  children,
}: CatalogContextProviderProps) => {
  const { data: favoriteBooksData } = useFavoriteBookQuery();

  const [filteredCategories, setFilteredCategories] = useState<number[]>([]);
  const [filteredByFavorites, setFilteredByFavorites] =
    useState<boolean>(false);

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

  const handleFilterFavorites = () => {
    setFilteredByFavorites((prev) => !prev);
  };

  useEffect(() => {
    if (!favoriteBooksData || favoriteBooksData.length === 0) {
      setFilteredByFavorites(false);
      return;
    }
  }, [favoriteBooksData]);

  return (
    <CatalogContext.Provider
      value={{
        handleFilterCategory,
        filteredCategories,
        handleResetFilters,
        filteredByFavorites,
        handleFilterFavorites,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
