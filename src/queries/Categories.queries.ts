import createCategory from "@/api/services/Categories/createCategory";
import deleteCategory from "@/api/services/Categories/deleteCategory";
import getAllCategories from "@/api/services/Categories/getAllCategories";
import getCategoryById from "@/api/services/Categories/getCatgegoryById";
import { CategoryPayload } from "@/types/Categories.types";
import { User } from "@/types/Users.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "react-use";

export const useGetAllCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

export const useGetCategoryById = () =>
  useMutation({
    mutationFn: getCategoryById,
    mutationKey: ["getCategoryById"],
  });

export const useCreateCategory = () => {
  const [userSession] = useLocalStorage<User | null>("userSession", null);
  const userId = userSession?.userId;

  const queryClient = useQueryClient();

  if (!userId) {
    throw new Error("User ID is required to create a category.");
  }

  return useMutation({
    mutationFn: (payload: CategoryPayload) =>
      createCategory({ ...payload, createdById: userId }),
    mutationKey: ["categories", "createCategory"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    mutationKey: ["categories", "deleteCategory"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
