import LibraryApi from "@/api/LibraryApi";

export default async function deleteBook(bookId: string): Promise<void> {
  try {
    const response = await LibraryApi.delete(`/books/${bookId}`);
    if (response.status !== 204) {
      throw new Error("Failed to delete book");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw new Error("Error deleting book");
  }
}
