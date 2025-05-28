import LibraryApi from "@/api/LibraryApi";
import { User, UserPayload } from "@/types/Users.types";

export default async function createUser(payload: UserPayload): Promise<User> {
  try {
    const response = await LibraryApi.post<User>("/users", payload);
    if (response.status !== 201) {
      throw new Error("Failed to create user");
    }

    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
}
