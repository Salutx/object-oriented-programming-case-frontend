import LibraryApi from "@/api/LibraryApi";

export default async function deleteCategory(
  categoryId: string
): Promise<void> {
  try {
    const response = await LibraryApi.delete(`/categories/${categoryId}`);
    if (response.status !== 204) {
      throw new Error("Failed to delete category");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error("Error deleting category");
  }
}
