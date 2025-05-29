import LibraryApi from "@/api/LibraryApi";
import { UserLoginPayload, UserSession } from "@/types/Users.types";

export default async function loginUser({
  password,
  username,
}: UserLoginPayload): Promise<UserSession> {
  try {
    const response = await LibraryApi.post<UserSession>(`/users/login`, {
      password,
      username,
    });
    if (response.status !== 200) {
      throw new Error("Failed to login user");
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("Error logging in user");
  }
}
