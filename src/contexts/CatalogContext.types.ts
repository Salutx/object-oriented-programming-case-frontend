export interface CatalogContextProps {
  filteredCategories: number[];
  handleFilterCategory: (categoryId: number) => void;
  handleResetFilters: () => void;
}

export interface CatalogContextProviderProps {
  children: React.ReactNode;
}
