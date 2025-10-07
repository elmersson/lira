"use client";

import { useState } from "react";
import Loader from "@/components/loader";
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
import { useUpdateUser, useUser } from "@/hooks/api/use-users";
import type { UpdateUserForm } from "@/lib/types/user";
import { UserForm } from "./user-form";

export function UpdateUserCard() {
  const [userId, setUserId] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { data: user, isLoading: isLoadingUser } = useUser(
    userId ? Number.parseInt(userId, 10) : 0
  );
  const updateUserMutation = useUpdateUser();

  const handleFetchUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && user) {
      setIsFormVisible(true);
    }
  };

  const handleSubmit = async (data: UpdateUserForm) => {
    try {
      const id = Number.parseInt(userId, 10);
      await updateUserMutation.mutateAsync({ id, user: data });
      setIsFormVisible(false);
      setUserId("");
    } catch {
      // Error is handled by the mutation
    }
  };

  const handleReset = () => {
    setUserId("");
    setIsFormVisible(false);
  };

  if (isFormVisible && user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Update User #{userId}</CardTitle>
          <CardDescription>Modify the user details below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <UserForm
            initialData={user}
            isLoading={updateUserMutation.isPending}
            mode="update"
            onSubmit={handleSubmit}
          />
          <Button className="w-full" onClick={handleReset} variant="outline">
            Cancel
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update User</CardTitle>
        <CardDescription>Enter a user ID to update</CardDescription>
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
            <Button disabled={!userId || isLoadingUser || !user} type="submit">
              {isLoadingUser ? "Loading..." : "Load User"}
            </Button>
            <Button onClick={handleReset} type="button" variant="outline">
              Reset
            </Button>
          </div>
        </form>

        {userId && isLoadingUser && (
          <div className="mt-4 border-t pt-4">
            <Loader />
          </div>
        )}

        {userId && !user && !isLoadingUser && (
          <div className="mt-4 border-t pt-4">
            <p className="text-center text-destructive">User not found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
