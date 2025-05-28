import createUser from "@/api/services/Users/createUser";
import deleteUser from "@/api/services/Users/deleteUser";
import getAllUsers from "@/api/services/Users/getAllUsers";
import getUserById from "@/api/services/Users/getUserById";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

export const useGetUserById = () =>
  useMutation({
    mutationFn: getUserById,
    mutationKey: ["getUserById"],
  });

export const useCreateUser = () =>
  useMutation({
    mutationFn: createUser,
    mutationKey: ["users", "createUser"],
  });

export const useDeleteUser = () =>
  useMutation({
    mutationFn: deleteUser,
    mutationKey: ["users", "deleteUser"],
  });
