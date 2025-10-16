"use client";

import {
  Calendar,
  CheckSquare,
  Folder,
  Star,
  Trash2,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Favorite } from "@/hooks/api/use-favorites";
import { useRemoveFavorite, useUserFavorites } from "@/hooks/api/use-favorites";

type FavoritesListProps = {
  userId: number;
};

function getEntityIcon(entityType: string) {
  switch (entityType) {
    case "project":
      return <Folder className="h-4 w-4" />;
    case "task":
      return <CheckSquare className="h-4 w-4" />;
    case "team":
      return <User className="h-4 w-4" />;
    case "user":
      return <User className="h-4 w-4" />;
    default:
      return <Star className="h-4 w-4" />;
  }
}

function getEntityTypeColor(entityType: string) {
  switch (entityType) {
    case "project":
      return "bg-blue-100 text-blue-800";
    case "task":
      return "bg-green-100 text-green-800";
    case "team":
      return "bg-purple-100 text-purple-800";
    case "user":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function FavoritesList({ userId }: FavoritesListProps) {
  const { data: favorites, isLoading, error } = useUserFavorites(userId);
  const removeFavorite = useRemoveFavorite();

  const handleRemoveFavorite = (favorite: Favorite) => {
    removeFavorite.mutate({
      userId: favorite.userId,
      entityType: favorite.entityType,
      entityId: favorite.entityId,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card className="animate-pulse" key={i}>
            <CardContent className="p-4">
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-red-500">
            Failed to load favorites. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!favorites || Object.keys(favorites).length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Star className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 font-medium text-gray-900 text-lg">
            No favorites yet
          </h3>
          <p className="text-gray-500">
            Start favoriting projects, tasks, teams, and users to see them here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(favorites).map(([entityType, items]) => (
        <Card key={entityType}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 capitalize">
              {getEntityIcon(entityType)}
              {entityType}s ({items.length})
            </CardTitle>
            <CardDescription>Your favorited {entityType}s</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((favorite) => (
                <div
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
                  key={favorite.id}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getEntityIcon(favorite.entityType)}
                      <Badge
                        className={getEntityTypeColor(favorite.entityType)}
                        variant="secondary"
                      >
                        {favorite.entityType}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">
                        Entity ID: {favorite.entityId}
                      </p>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Calendar className="h-3 w-3" />
                        Favorited on{" "}
                        {new Date(favorite.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                    disabled={removeFavorite.isPending}
                    onClick={() => handleRemoveFavorite(favorite)}
                    size="sm"
                    variant="ghost"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
