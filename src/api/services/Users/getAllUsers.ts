import LibraryApi from "@/api/LibraryApi";
import { User } from "@/types/Users.types";

export default async function getAllUsers(): Promise<User[]> {
  try {
    const response = await LibraryApi.get<User[]>("/users");
    if (response.status !== 200) {
      throw new Error("Failed to fetch users");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Error fetching users");
  }
}
