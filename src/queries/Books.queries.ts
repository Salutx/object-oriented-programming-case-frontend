import createBook from "@/api/services/Books/createBook";
import deleteBook from "@/api/services/Books/deleteBook";
import getAllBooks from "@/api/services/Books/getAllBooks";
import getBookById from "@/api/services/Books/getBookById";
import { BookPayload } from "@/types/Books.types";
import { User } from "@/types/Users.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "react-use";

export const useGetAllBooks = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: getAllBooks,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

export const useGetBookById = () =>
  useMutation({
    mutationFn: getBookById,
    mutationKey: ["getBookById"],
  });

export const useCreateBook = () => {
  const [userSession] = useLocalStorage<User | null>("userSession", null);
  const userId = userSession?.userId;

  const queryClient = useQueryClient();

  if (!userId) {
    throw new Error("User ID is required to create a category.");
  }

  return useMutation({
    mutationFn: (payload: BookPayload) =>
      createBook({ ...payload, createdById: userId }),
    mutationKey: ["books", "createBook"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    mutationKey: ["books", "deleteBook"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
