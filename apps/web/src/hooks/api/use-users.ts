import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/lib/api/users";
import { QUERY_KEYS } from "@/lib/constants/api";
import type { CreateUserForm, UpdateUserForm } from "@/lib/types/user";

export const useUsers = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.USERS, { page, limit }],
    queryFn: () => userApi.getAll(page, limit),
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.USERS, id],
    queryFn: () => userApi.getById(id),
    enabled: !!id && id > 0,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: CreateUserForm) => userApi.create(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, user }: { id: number; user: UpdateUserForm }) =>
      userApi.update(id, user),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEYS.USERS, id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
    },
  });
};
