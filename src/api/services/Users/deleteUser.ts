import LibraryApi from "@/api/LibraryApi";

export default async function deleteUser(userId: string): Promise<void> {
  try {
    const response = await LibraryApi.delete(`/users/${userId}`);
    if (response.status !== 204) {
      throw new Error("Failed to delete user");
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting user");
  }
}
