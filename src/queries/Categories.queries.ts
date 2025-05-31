import createCategory from "@/api/services/Categories/createCategory";
import deleteCategory from "@/api/services/Categories/deleteCategory";
import getAllCategories from "@/api/services/Categories/getAllCategories";
import getCategoryById from "@/api/services/Categories/getCatgegoryById";
import updateCategory from "@/api/services/Categories/updateCategory";
import { useUserSessionQuery } from "@/hooks/useUserSession";
import {
  CategoryPayload,
  CategoryUpdatePayload,
} from "@/types/Categories.types";
import { UserSession } from "@/types/Users.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  const { data: userSession } = useUserSessionQuery();
  const parsedUserSession = userSession
    ? (JSON.parse(userSession) as UserSession)
    : null;

  const userId = parsedUserSession?.userId;

  if (!userId) {
    throw new Error("User ID is required to edit a category.");
  }

  return useMutation({
    mutationFn: (payload: CategoryUpdatePayload) =>
      updateCategory({
        ...payload,
        createdById: userId,
      }),
    mutationKey: ["categories", "editCategory"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export const useCreateCategory = () => {
  const { data: userSession } = useUserSessionQuery();
  const parsedUserSession = userSession
    ? (JSON.parse(userSession) as UserSession)
    : null;

  const userId = parsedUserSession?.userId;

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
