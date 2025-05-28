import createCategory from "@/api/services/Categories/createCategory";
import deleteCategory from "@/api/services/Categories/deleteCategory";
import getAllCategories from "@/api/services/Categories/getAllCategories";
import getCategoryById from "@/api/services/Categories/getCatgegoryById";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useCreateCategory = () =>
  useMutation({
    mutationFn: createCategory,
    mutationKey: ["categories", "createCategory"],
  });

export const useDeleteCategory = () =>
  useMutation({
    mutationFn: deleteCategory,
    mutationKey: ["categories", "deleteCategory"],
  });
