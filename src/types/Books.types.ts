import { Category } from "./Categories.types";
import { User } from "./Users.types";

export interface Book {
  bookId: number;
  name: string;
  publisher: string;
  publishedIn: string;
  createdBy: Omit<User, "password">;
  createdAt: string;
  categories: Category[];
  author: string;
}

export interface BookPayload {
  name: string;
  publisher: string;
  publishedIn: string;
  author: string;
  categoryIds: number[];
}

export interface BookUpdatePayload {
  name: string;
  publisher: string;
  publishedIn: string;
  author: string;
  categoryIds: number[];
  bookId: number;
}
