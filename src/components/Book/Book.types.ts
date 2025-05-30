import { Category } from "@/types/Categories.types";

export interface BookProps {
  imagePath?: string;
  categories: Category[];
  title: string;
  author: string;
  isFavorited?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  onFavorite?: () => void;
  createdAt?: string;
  onDelete?: () => void;
}
