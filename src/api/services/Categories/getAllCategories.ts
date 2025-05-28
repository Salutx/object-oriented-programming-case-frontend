import LibraryApi from "@/api/LibraryApi";
import { Category } from "@/types/Categories.types";

export default async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await LibraryApi.get<Category[]>("/categories");
    if (response.status !== 200) {
      throw new Error("Failed to fetch categories");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Error fetching categories");
  }
}
