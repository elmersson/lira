"use client";

import { useState } from "react";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/api/use-users";

export function GetUserCard() {
  const [userId, setUserId] = useState("");
  const [showUser, setShowUser] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useUser(userId && showUser ? Number.parseInt(userId, 10) : 0);

  const handleFetchUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      setShowUser(true);
    }
  };

  const handleReset = () => {
    setUserId("");
    setShowUser(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get User by ID</CardTitle>
        <CardDescription>Retrieve a specific user by their ID</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleFetchUser}>
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              min="1"
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
              type="number"
              value={userId}
            />
          </div>
          <div className="flex gap-2">
            <Button disabled={!userId} type="submit">
              Fetch User
            </Button>
            <Button onClick={handleReset} type="button" variant="outline">
              Reset
            </Button>
          </div>
        </form>

        {showUser && isLoading && (
          <div className="mt-4 border-t pt-4">
            <Loader />
          </div>
        )}

        {showUser && error && (
          <div className="mt-4 border-t pt-4">
            <p className="text-center text-destructive">
              Error: {error.message}
            </p>
          </div>
        )}

        {showUser && user && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <h3 className="font-medium">User Details:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">ID:</span>
                <Badge variant="outline">{user.userId}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Username:</span>
                <span className="font-medium">{user.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Cognito ID:</span>
                <code className="rounded bg-muted px-2 py-1 text-sm">
                  {user.cognitoId}
                </code>
              </div>
              {user.profilePictureUrl && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    Profile Picture:
                  </span>
                  <a
                    className="text-blue-600 hover:underline"
                    href={user.profilePictureUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View Image
                  </a>
                </div>
              )}
              {user.team && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Team:</span>
                  <Badge variant="secondary">
                    {user.team.teamName} (ID: {user.team.id})
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
