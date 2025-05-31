import { User } from "./Users.types";

export interface Category {
  categoryId: number;
  name: string;
  createdAt: string;
  createdBy: User;
}

export interface CategoryPayload {
  name: string;
}

export interface CategoryUpdatePayload {
  name: string;
  categoryId: number;
}
