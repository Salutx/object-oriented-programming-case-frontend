import createBook from "@/api/services/Books/createBook";
import deleteBook from "@/api/services/Books/deleteBook";
import getAllBooks from "@/api/services/Books/getAllBooks";
import getBookById from "@/api/services/Books/getBookById";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useCreateBook = () =>
  useMutation({
    mutationFn: createBook,
    mutationKey: ["books", "createBook"],
  });

export const useDeleteBook = () =>
  useMutation({
    mutationFn: deleteBook,
    mutationKey: ["books", "deleteBook"],
  });
