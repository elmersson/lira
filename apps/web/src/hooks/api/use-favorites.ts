import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

// Cache timing constants
const FAVORITES_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const FAVORITES_GC_TIME = 10 * 60 * 1000; // 10 minutes

export type Favorite = {
  id: number;
  userId: number;
  entityType: "project" | "task" | "team" | "user";
  entityId: number;
  createdAt: string;
  entity?: any;
};

// API functions
const favoritesApi = {
  addFavorite: async (data: {
    userId: number;
    entityType: string;
    entityId: number;
  }) => {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to add favorite");
    return response.json();
  },

  removeFavorite: async (data: {
    userId: number;
    entityType: string;
    entityId: number;
  }) => {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to remove favorite");
    return response.json();
  },

  getUserFavorites: async (
    userId: number
  ): Promise<Record<string, Favorite[]>> => {
    const response = await fetch(`${API_BASE_URL}/favorites/user/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch favorites");
    return response.json();
  },

  getFavoritesByType: async (
    userId: number,
    entityType: string
  ): Promise<Favorite[]> => {
    const response = await fetch(
      `${API_BASE_URL}/favorites/user/${userId}/${entityType}`
    );
    if (!response.ok) throw new Error("Failed to fetch favorites by type");
    return response.json();
  },

  checkIsFavorite: async (
    userId: number,
    entityType: string,
    entityId: number
  ): Promise<{ isFavorite: boolean }> => {
    const response = await fetch(
      `${API_BASE_URL}/favorites/check/${userId}/${entityType}/${entityId}`
    );
    if (!response.ok) throw new Error("Failed to check favorite status");
    return response.json();
  },
};

// Hooks
export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoritesApi.addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Added to favorites!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add favorite");
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoritesApi.removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Removed from favorites");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove favorite");
    },
  });
};

export const useUserFavorites = (userId: number) => {
  console.log("Fetching favorites for userId:", userId);
  return useQuery({
    queryKey: ["favorites", "user", userId],
    queryFn: () => favoritesApi.getUserFavorites(userId),
    enabled: !!userId,
    staleTime: FAVORITES_STALE_TIME, // 5 minutes - data is considered fresh for 5 minutes
    gcTime: FAVORITES_GC_TIME, // 10 minutes - keep in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on every mount if data exists
    refetchOnReconnect: false, // Don't refetch on network reconnect
  });
};

export const useFavoritesByType = (userId: number, entityType: string) => {
  return useQuery({
    queryKey: ["favorites", "user", userId, entityType],
    queryFn: () => favoritesApi.getFavoritesByType(userId, entityType),
    enabled: !!userId && !!entityType,
    staleTime: FAVORITES_STALE_TIME, // 5 minutes - data is considered fresh for 5 minutes
    gcTime: FAVORITES_GC_TIME, // 10 minutes - keep in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on every mount if data exists
    refetchOnReconnect: false, // Don't refetch on network reconnect
  });
};

export const useIsFavorite = (
  userId: number,
  entityType: string,
  entityId: number
) => {
  return useQuery({
    queryKey: ["favorites", "check", userId, entityType, entityId],
    queryFn: () => favoritesApi.checkIsFavorite(userId, entityType, entityId),
    enabled: !!userId && !!entityType && !!entityId,
    staleTime: FAVORITES_STALE_TIME, // 5 minutes - data is considered fresh for 5 minutes
    gcTime: FAVORITES_GC_TIME, // 10 minutes - keep in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on every mount if data exists
    refetchOnReconnect: false, // Don't refetch on network reconnect
  });
};
