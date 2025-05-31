import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const localStorageSessionKey = "userSession";
export const localStorageFavoritesKey = "@bookstore:favorite";

export const UserSessionKeys = {
  localStorage: localStorageSessionKey,
  get: [localStorageSessionKey, "get"],
  post: [localStorageSessionKey, "post"],
};

export const useUserSessionQuery = () =>
  useQuery({
    queryKey: UserSessionKeys.get,
    queryFn: () => {
      const sessionString = localStorage.getItem(localStorageSessionKey);
      if ([null, undefined].includes(sessionString as null)) return undefined;
      return sessionString;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    gcTime: 1000 * 60 * 60,
  });

export const useUserSessionMutation = () =>
  useMutation({
    mutationKey: UserSessionKeys.post,
    mutationFn: async (session: string) =>
      localStorage.setItem(localStorageSessionKey, session),
  });

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation({
    mutationKey: UserSessionKeys.post,
    mutationFn: async () => {
      localStorage.removeItem(localStorageSessionKey);
      localStorage.removeItem(localStorageFavoritesKey);
      queryClient.clear();
      replace("/login");
    },
  });
};
