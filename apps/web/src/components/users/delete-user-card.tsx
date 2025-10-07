"use client";

import { useState } from "react";
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
import { useDeleteUser } from "@/hooks/api/use-users";

export function DeleteUserCard() {
  const [userId, setUserId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const deleteUserMutation = useDeleteUser();

  const handleInitiateDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const id = Number.parseInt(userId, 10);
      await deleteUserMutation.mutateAsync(id);
      setUserId("");
      setShowConfirmation(false);
    } catch {
      // Error is handled by the mutation
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleReset = () => {
    setUserId("");
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Confirm Deletion</CardTitle>
          <CardDescription>
            Are you sure you want to delete user #{userId}? This action cannot
            be undone.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              className="flex-1"
              disabled={deleteUserMutation.isPending}
              onClick={handleConfirmDelete}
              variant="destructive"
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Yes, Delete"}
            </Button>
            <Button
              className="flex-1"
              disabled={deleteUserMutation.isPending}
              onClick={handleCancel}
              variant="outline"
            >
              Cancel
            </Button>
          </div>

          {deleteUserMutation.error && (
            <div className="rounded bg-destructive/10 p-3 text-destructive">
              Error: {deleteUserMutation.error.message}
            </div>
          )}

          {deleteUserMutation.data && (
            <div className="rounded bg-green-50 p-3 text-green-800">
              User deleted successfully!
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete User</CardTitle>
        <CardDescription>
          Enter a user ID to delete (be careful - this is permanent!)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleInitiateDelete}>
          <div className="space-y-2">
            <Label htmlFor="deleteUserId">User ID</Label>
            <Input
              id="deleteUserId"
              min="1"
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID to delete"
              type="number"
              value={userId}
            />
          </div>
          <div className="flex gap-2">
            <Button disabled={!userId} type="submit" variant="destructive">
              Delete User
            </Button>
            <Button onClick={handleReset} type="button" variant="outline">
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
