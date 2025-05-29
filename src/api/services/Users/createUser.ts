import LibraryApi from "@/api/LibraryApi";
import { User, UserRegisterPayload } from "@/types/Users.types";

export default async function createUser(
  payload: UserRegisterPayload
): Promise<User> {
  try {
    const response = await LibraryApi.post<User>("/users/register", payload);
    if (response.status !== 201) {
      throw new Error("Failed to create user");
    }

    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
}
