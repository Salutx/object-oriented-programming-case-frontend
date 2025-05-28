import LibraryApi from "@/api/LibraryApi";
import { Book } from "@/types/Books.types";

export default async function getAllBooks(): Promise<Book[]> {
  try {
    const response = await LibraryApi.get<Book[]>("/books");
    if (response.status !== 200) {
      throw new Error("Failed to fetch books");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Error fetching books");
  }
}
