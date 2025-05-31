import LibraryApi from "@/api/LibraryApi";
import { Category, CategoryUpdatePayload } from "@/types/Categories.types";

export default async function updateCategory(
  payload: CategoryUpdatePayload & {
    createdById: number;
  }
): Promise<Category> {
  try {
    const response = await LibraryApi.put<Category>(
      `/categories/update/${payload.categoryId}`,
      {
        name: payload.name,
        createdById: payload.createdById,
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to edit category");
    }
    return response.data;
  } catch (error) {
    console.error("Error editing category:", error);
    throw new Error("Error editing category");
  }
}
