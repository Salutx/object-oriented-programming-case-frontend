export interface CatalogContextProps {
  filteredCategories: number[];
  handleFilterCategory: (categoryId: number) => void;
  handleResetFilters: () => void;
  filteredByFavorites: boolean;
  handleFilterFavorites: () => void;
}

export interface CatalogContextProviderProps {
  children: React.ReactNode;
}
