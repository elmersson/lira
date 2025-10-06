import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "@/lib/api/tasks";
import { QUERY_KEYS } from "@/lib/constants/api";
import type { CreateTaskForm, UpdateTaskForm } from "@/lib/types/task";

export const useTasks = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.TASKS, { page, limit }],
    queryFn: () => taskApi.getAll(page, limit),
  });
};

export const useTask = (id: number) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.TASKS, id],
    queryFn: () => taskApi.getById(id),
    enabled: !!id && id > 0,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: CreateTaskForm) => taskApi.create(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: number; task: UpdateTaskForm }) =>
      taskApi.update(id, task),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEYS.TASKS, id] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => taskApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
  });
};
