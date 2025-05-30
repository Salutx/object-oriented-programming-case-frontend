import LibraryApi from "@/api/LibraryApi";
import { Book, BookPayload } from "@/types/Books.types";

export default async function createBook(payload: BookPayload & { createdById: number }): Promise<Book> {
  try {
    const response = await LibraryApi.post<Book>("/books", payload);
    if (response.status !== 201) {
      throw new Error("Failed to create book");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error("Error creating book");
  }
}
