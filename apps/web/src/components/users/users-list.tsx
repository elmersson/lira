"use client";

import Image from "next/image";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUsers } from "@/hooks/api/use-users";
import type { User } from "@/lib/types/user";

type UsersListProps = {
  className?: string;
};

export function UsersList({ className }: UsersListProps) {
  const { data: usersResponse, isLoading, error } = useUsers();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-destructive">Failed to load users</p>
        <p className="text-muted-foreground text-sm">{error.message}</p>
      </div>
    );
  }

  const users = usersResponse?.users || [];

  if (users.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Users ({users.length})</h2>
        <Badge variant="outline">{usersResponse?.total || 0} total</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.userId} user={user} />
        ))}
      </div>
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              {user.emoji && <span className="text-lg">{user.emoji}</span>}
              {user.username}
            </CardTitle>
            <CardDescription className="text-sm">
              ID: {user.userId}
            </CardDescription>
          </div>
          {user.profilePictureUrl && (
            <Image
              alt={`${user.username}'s avatar`}
              className="h-10 w-10 rounded-full"
              height={40}
              src={user.profilePictureUrl}
              width={40}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Cognito ID:</span>
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            {user.cognitoId}
          </code>
        </div>

        {user.team && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Team:</span>
            <Badge className="flex items-center gap-1" variant="secondary">
              {user.team.emoji && <span>{user.team.emoji}</span>}
              {user.team.teamName}
            </Badge>
          </div>
        )}

        {user.authoredTasks && user.authoredTasks.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Authored:</span>
            <Badge variant="outline">{user.authoredTasks.length} tasks</Badge>
          </div>
        )}

        {user.assignedTasks && user.assignedTasks.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Assigned:</span>
            <Badge variant="outline">{user.assignedTasks.length} tasks</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
