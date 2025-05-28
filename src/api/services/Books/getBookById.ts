import LibraryApi from "@/api/LibraryApi";
import { Book } from "@/types/Books.types";

export default async function getBookById(bookId: string): Promise<Book> {
  try {
    const response = await LibraryApi.get<Book>(`/books/${bookId}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch book");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw new Error("Error fetching book");
  }
}
