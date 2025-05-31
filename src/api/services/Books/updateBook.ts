import LibraryApi from "@/api/LibraryApi";
import { Book, BookUpdatePayload } from "@/types/Books.types";

export default async function updateBook(
  payload: BookUpdatePayload
): Promise<Book> {
  try {
    const response = await LibraryApi.put<Book>(
      `/books/update/${payload.bookId}`,
      payload
    );
    if (response.status !== 200) {
      throw new Error("Failed to edit book");
    }
    return response.data;
  } catch (error) {
    console.error("Error editing book:", error);
    throw new Error("Error editing book");
  }
}
