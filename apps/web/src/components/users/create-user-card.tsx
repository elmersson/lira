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
import { useCreateUser } from "@/hooks/api/use-users";
import type { CreateUserForm, UpdateUserForm } from "@/lib/types/user";
import { UserForm } from "./user-form";

export function CreateUserCard() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const createUserMutation = useCreateUser();

  const handleSubmit = async (data: CreateUserForm | UpdateUserForm) => {
    try {
      // Ensure data has required fields for creation
      if (data.cognitoId && data.username) {
        await createUserMutation.mutateAsync(data as CreateUserForm);
        setIsFormVisible(false);
      }
    } catch {
      // Error is handled by the mutation
    }
  };

  if (isFormVisible) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create New User</CardTitle>
          <CardDescription>Add a new user to the system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <UserForm
            isLoading={createUserMutation.isPending}
            mode="create"
            onSubmit={handleSubmit}
          />
          <Button
            className="w-full"
            onClick={() => setIsFormVisible(false)}
            variant="outline"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-dashed">
      <CardContent className="flex items-center justify-center p-6">
        <Button className="w-full" onClick={() => setIsFormVisible(true)}>
          Create New User
        </Button>
      </CardContent>
    </Card>
  );
}
