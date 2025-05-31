import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "react-use";

export const useFavoriteBookQuery = () => {
  const [favorite] = useLocalStorage<string>("@bookstore:favorite");

  return useQuery({
    queryKey: ["favoriteBooks"],
    queryFn: () => {
      if (!favorite) {
        return [];
      }
      const favoriteString = favorite || "[]";
      try {
        const favoriteBooks = JSON.parse(favoriteString);
        return Array.isArray(favoriteBooks) ? favoriteBooks : [];
      } catch (error) {
        console.error("Error parsing favorite books:", error);
        return [];
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    gcTime: 1000 * 60 * 60,
  });
};

export const useFavoriteBookMutation = () => {
  const [favorite, setFavorite] = useLocalStorage<string>(
    "@bookstore:favorite"
  );

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["favoriteBooks", "update"],
    mutationFn: async (bookId: number) => {
      const favoriteString = favorite || "[]";
      let favoriteBooks: number[] = [];

      try {
        favoriteBooks = JSON.parse(favoriteString);
      } catch (error) {
        console.error("Error parsing favorite books:", error);
      }

      if (favoriteBooks.includes(bookId)) {
        favoriteBooks = favoriteBooks.filter((id) => id !== bookId);
      } else {
        favoriteBooks.push(bookId);
      }

      setFavorite(JSON.stringify(favoriteBooks));
      return favoriteBooks;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["favoriteBooks"], data);
    },
  });
};
