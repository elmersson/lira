"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useAddFavorite,
  useIsFavorite,
  useRemoveFavorite,
} from "@/hooks/api/use-favorites";

type FavoriteButtonProps = {
  userId: number;
  entityType: "project" | "task" | "team" | "user";
  entityId: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "outline";
};

export function FavoriteButton({
  userId,
  entityType,
  entityId,
  size = "sm",
  variant = "ghost",
}: FavoriteButtonProps) {
  const { data: favoriteStatus, isLoading } = useIsFavorite(
    userId,
    entityType,
    entityId
  );
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorite = favoriteStatus?.isFavorite;

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite.mutate({ userId, entityType, entityId });
    } else {
      addFavorite.mutate({ userId, entityType, entityId });
    }
  };

  if (isLoading) {
    return (
      <Button className="animate-pulse" disabled size={size} variant={variant}>
        <Star className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      className={`transition-colors ${isFavorite ? "text-yellow-500 hover:text-yellow-600" : "text-gray-400 hover:text-yellow-500"}`}
      disabled={addFavorite.isPending || removeFavorite.isPending}
      onClick={handleToggleFavorite}
      size={size}
      variant={variant}
    >
      <Star className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
    </Button>
  );
}
