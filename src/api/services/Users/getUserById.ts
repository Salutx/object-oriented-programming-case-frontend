import LibraryApi from "@/api/LibraryApi";
import { User } from "@/types/Users.types";

export default async function getUserById(userId: string): Promise<User> {
  try {
    const response = await LibraryApi.get<User>(`/users/${userId}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch user");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Error fetching user");
  }
}
