import LibraryApi from "@/api/LibraryApi";
import { Category } from "@/types/Categories.types";

export default async function getCategoryById(
  categoryId: string
): Promise<Category> {
  try {
    const response = await LibraryApi.get<Category>(
      `/categories/${categoryId}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch category");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("Error fetching category");
  }
}
