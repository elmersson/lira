import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "@/lib/api/teams";
import { QUERY_KEYS } from "@/lib/constants/api";
import type { UpdateTeamForm } from "@/lib/types/team";

export function useTeams() {
  return useQuery({
    queryKey: QUERY_KEYS.TEAMS,
    queryFn: teamApi.getAll,
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TEAMS });
    },
  });
}

export function useTeam(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEYS.TEAMS, id],
    queryFn: () => teamApi.getById(id),
    enabled: !!id,
  });
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTeamForm }) =>
      teamApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TEAMS });
    },
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TEAMS });
    },
  });
}
