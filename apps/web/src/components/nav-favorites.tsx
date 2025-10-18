"use client";

import {
  ArrowUpRight,
  Link as LinkIcon,
  MoreHorizontal,
  StarOff,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  type Favorite,
  useRemoveFavorite,
  useUserFavorites,
} from "@/hooks/api/use-favorites";
import { useTestUser } from "@/hooks/api/use-test-user";

// Helper function to generate emoji for entity types
const getEntityEmoji = (entityType: string): string => {
  switch (entityType) {
    case "project":
      return "📁";
    case "task":
      return "✅";
    case "team":
      return "👥";
    case "user":
      return "👤";
    default:
      return "⭐";
  }
};

// Helper function to generate navigation URL
const getEntityUrl = (entityType: string, entityId: number): string => {
  switch (entityType) {
    case "project":
      return `/dashboard/projects/${entityId}`;
    case "task":
      return `/dashboard/tasks/${entityId}`;
    case "team":
      return `/dashboard/teams/${entityId}`;
    case "user":
      return `/dashboard/users/${entityId}`;
    default:
      return "/dashboard";
  }
};

// Helper function to get entity name
const getEntityName = (favorite: Favorite): string => {
  if (favorite.entity) {
    // Check for different possible name fields based on entity type
    return (
      favorite.entity.name ||
      favorite.entity.title ||
      favorite.entity.username ||
      `${favorite.entityType} ${favorite.entityId}`
    );
  }
  return `${favorite.entityType} ${favorite.entityId}`;
};

// Default user ID fallback
const DEFAULT_USER_ID = 3;

export function NavFavorites() {
  const { isMobile } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);
  const { data: user } = useTestUser();
  const { data: favoritesData, isLoading } = useUserFavorites(
    user?.userId || DEFAULT_USER_ID
  );
  const removeFavoriteMutation = useRemoveFavorite();

  // Prevent hydration mismatch by only rendering dynamic content after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Flatten favorites from grouped data into a single array
  const favorites: Favorite[] = favoritesData
    ? Object.values(favoritesData).flat()
    : [];

  const handleRemoveFavorite = async (favorite: Favorite) => {
    if (!user) {
      return;
    }

    await removeFavoriteMutation.mutateAsync({
      userId: user.userId,
      entityType: favorite.entityType,
      entityId: favorite.entityId,
    });
  };

  const handleCopyLink = (favorite: Favorite) => {
    const url = getEntityUrl(favorite.entityType, favorite.entityId);
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
  };

  const handleOpenInNewTab = (favorite: Favorite) => {
    const url = getEntityUrl(favorite.entityType, favorite.entityId);
    window.open(url, "_blank");
  };

  // Show consistent initial state during SSR and hydration
  if (!isMounted) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Favorites</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70" disabled>
              <span>⭐</span>
              <span>Favorites</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  // Show loading state only after mount
  if (isLoading) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Favorites</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton disabled>
              <span>Loading...</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Favorites</SidebarGroupLabel>
      <SidebarMenu>
        {favorites.length === 0 ? (
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70" disabled>
              <span>⭐</span>
              <span>No favorites yet</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          favorites.map((favorite) => {
            const entityName = getEntityName(favorite);
            const entityEmoji = getEntityEmoji(favorite.entityType);

            return (
              <SidebarMenuItem
                key={`${favorite.entityType}-${favorite.entityId}`}
              >
                <SidebarMenuButton asChild>
                  <Link
                    href={
                      getEntityUrl(
                        favorite.entityType,
                        favorite.entityId
                      ) as "/dashboard"
                    }
                    title={entityName}
                  >
                    <span>{entityEmoji}</span>
                    <span className="truncate">{entityName}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align={isMobile ? "end" : "start"}
                    className="w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                  >
                    <DropdownMenuItem
                      onClick={() => handleRemoveFavorite(favorite)}
                    >
                      <StarOff className="text-muted-foreground" />
                      <span>Remove from Favorites</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleCopyLink(favorite)}>
                      <LinkIcon className="text-muted-foreground" />
                      <span>Copy Link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleOpenInNewTab(favorite)}
                    >
                      <ArrowUpRight className="text-muted-foreground" />
                      <span>Open in New Tab</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          })
        )}
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="text-sidebar-foreground/70">
            <Link href="/dashboard/favorites">
              <MoreHorizontal />
              <span>More</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
