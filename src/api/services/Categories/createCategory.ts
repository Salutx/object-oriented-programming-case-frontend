import LibraryApi from "@/api/LibraryApi";
import { Category, CategoryPayload } from "@/types/Categories.types";

export default async function createCategory(
  payload: CategoryPayload & { createdById?: number }
): Promise<Category> {
  try {
    const response = await LibraryApi.post<Category>(
      "/categories/create",
      payload
    );
    if (response.status !== 201) {
      throw new Error("Failed to create category");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Error creating category");
  }
}
