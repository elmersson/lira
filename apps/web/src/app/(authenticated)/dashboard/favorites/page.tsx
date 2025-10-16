"use client";

import { AddFavoriteForm } from "@/components/favorites/add-favorite-form";
import { FavoritesList } from "@/components/favorites/favorites-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTestUser } from "@/hooks/api/use-test-user";

export default function FavoritesPage() {
  const { data: user, isLoading, error } = useTestUser();

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="font-bold text-3xl tracking-tight">Favorites</h2>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-primary border-b-2" />
            <p>Loading user...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="font-bold text-3xl tracking-tight">Favorites</h2>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-red-500">
              Failed to load user. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">Favorites</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Total Favorites
            </CardTitle>
            <span className="text-2xl">⭐</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">0</div>
            <p className="text-muted-foreground text-xs">Items favorited</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Favorite Projects
            </CardTitle>
            <span className="text-2xl">📁</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">0</div>
            <p className="text-muted-foreground text-xs">Projects starred</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Favorite Tasks
            </CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">0</div>
            <p className="text-muted-foreground text-xs">Tasks bookmarked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Favorite Teams
            </CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">0</div>
            <p className="text-muted-foreground text-xs">Teams followed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Favorites</CardTitle>
            <CardDescription>
              Manage all your favorited items in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FavoritesList userId={user.userId} />
          </CardContent>
        </Card>

        <AddFavoriteForm userId={user.userId} />
      </div>
    </div>
  );
}
