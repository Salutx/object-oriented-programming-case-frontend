import { Category } from "./Categories.types";

export interface Book {
  bookId: number;
  name: string;
  publisher: string;
  publishedIn: string;
  createdBy: number;
  createdAt: string;
  categories: Category[];
  author: string;
}

export interface BookPayload {
  name: string;
  publisher: string;
  publishedIn: string;
  author: string;
  categories: number[];
}
