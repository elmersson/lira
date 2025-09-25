"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

// Zod schemas for form validation
const createUserSchema = z.object({
  cognitoId: z.string().min(1, "Cognito ID is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  profilePictureUrl: z.string().url().optional().or(z.literal("")),
  teamId: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === "") return;
      const num = Number.parseInt(val, 10);
      return Number.isNaN(num) ? undefined : num;
    }),
});

const updateUserSchema = createUserSchema.partial();

type CreateUserForm = z.infer<typeof createUserSchema>;
type UpdateUserForm = z.infer<typeof updateUserSchema>;

// API functions
async function fetchUsers() {
  const response = await fetch(`${SERVER_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

async function createUser(data: CreateUserForm) {
  // Remove empty/undefined values
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) => value !== "" && value !== undefined && value !== null
    )
  );

  const response = await fetch(`${SERVER_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cleanData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create user");
  }
  return response.json();
}

async function updateUser(id: number, data: UpdateUserForm) {
  const response = await fetch(`${SERVER_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user");
  }
  return response.json();
}

async function deleteUser(id: number) {
  const response = await fetch(`${SERVER_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete user");
  }
  return response.json();
}

export default function UsersPage() {
  const queryClient = useQueryClient();

  // React Query for GET request
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // React Query for POST request
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
    },
  });

  // React Query for PUT request
  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserForm }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      resetUpdate();
    },
  });

  // React Query for DELETE request
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // React Hook Form setup for create
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
  });

  // React Hook Form setup for update
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: updateErrors },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = (data: CreateUserForm) => {
    createUserMutation.mutate(data);
  };

  const onUpdateSubmit = (data: UpdateUserForm) => {
    const userId = Number.parseInt(
      (document.getElementById("updateUserId") as HTMLInputElement)?.value ||
        "0",
      10
    );
    if (userId) {
      updateUserMutation.mutate({ id: userId, data });
    }
  };

  const handleDelete = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">← Back</Button>
        </Link>
        <h1 className="font-bold text-2xl">Users API</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* GET Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
                GET
              </span>
              /users
            </CardTitle>
            <CardDescription>
              Retrieve all users from the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["users"] })
              }
            >
              {isLoading ? "Loading..." : "Fetch Users"}
            </Button>

            {error && (
              <div className="mt-4 rounded bg-red-50 p-3 text-red-800">
                Error: {error.message}
              </div>
            )}

            {users && (
              <div className="mt-4">
                <h4 className="font-medium">Response:</h4>
                <pre className="mt-2 max-h-60 overflow-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
                  {JSON.stringify(users, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* POST Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-800 text-xs">
                POST
              </span>
              /users
            </CardTitle>
            <CardDescription>Create a new user</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="cognitoId">Cognito ID *</Label>
                <Input
                  id="cognitoId"
                  {...register("cognitoId")}
                  placeholder="Enter Cognito ID"
                />
                {errors.cognitoId && (
                  <p className="text-red-500 text-sm">
                    {errors.cognitoId.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  {...register("username")}
                  placeholder="Enter username"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="profilePictureUrl">Profile Picture URL</Label>
                <Input
                  id="profilePictureUrl"
                  {...register("profilePictureUrl")}
                  placeholder="Enter profile picture URL"
                />
                {errors.profilePictureUrl && (
                  <p className="text-red-500 text-sm">
                    {errors.profilePictureUrl.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="teamId">Team ID</Label>
                <Input
                  id="teamId"
                  type="number"
                  {...register("teamId", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  placeholder="Enter team ID"
                />
                {errors.teamId && (
                  <p className="text-red-500 text-sm">
                    {errors.teamId.message}
                  </p>
                )}
              </div>

              <Button
                className="w-full"
                disabled={createUserMutation.isPending}
                type="submit"
              >
                {createUserMutation.isPending ? "Creating..." : "Create User"}
              </Button>

              {createUserMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {createUserMutation.error.message}
                </div>
              )}

              {createUserMutation.data && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <h4 className="font-medium">User Created Successfully!</h4>
                  <pre className="mt-2 overflow-auto text-sm">
                    {JSON.stringify(createUserMutation.data, null, 2)}
                  </pre>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* PUT Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-xs text-yellow-800">
                PUT
              </span>
              /users/:id
            </CardTitle>
            <CardDescription>Update an existing user</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={handleSubmitUpdate(onUpdateSubmit)}
            >
              <div>
                <Label htmlFor="updateUserId">User ID *</Label>
                <Input
                  id="updateUserId"
                  placeholder="Enter user ID to update"
                  required
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="updateCognitoId">Cognito ID</Label>
                <Input
                  id="updateCognitoId"
                  {...registerUpdate("cognitoId")}
                  placeholder="Enter new Cognito ID"
                />
                {updateErrors.cognitoId && (
                  <p className="text-red-500 text-sm">
                    {updateErrors.cognitoId.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="updateUsername">Username</Label>
                <Input
                  id="updateUsername"
                  {...registerUpdate("username")}
                  placeholder="Enter new username"
                />
                {updateErrors.username && (
                  <p className="text-red-500 text-sm">
                    {updateErrors.username.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="updateProfilePictureUrl">
                  Profile Picture URL
                </Label>
                <Input
                  id="updateProfilePictureUrl"
                  {...registerUpdate("profilePictureUrl")}
                  placeholder="Enter new profile picture URL"
                />
                {updateErrors.profilePictureUrl && (
                  <p className="text-red-500 text-sm">
                    {updateErrors.profilePictureUrl.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="updateTeamId">Team ID</Label>
                <Input
                  id="updateTeamId"
                  type="number"
                  {...registerUpdate("teamId", {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  placeholder="Enter new team ID"
                />
                {updateErrors.teamId && (
                  <p className="text-red-500 text-sm">
                    {updateErrors.teamId.message}
                  </p>
                )}
              </div>

              <Button
                className="w-full"
                disabled={updateUserMutation.isPending}
                type="submit"
              >
                {updateUserMutation.isPending ? "Updating..." : "Update User"}
              </Button>

              {updateUserMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {updateUserMutation.error.message}
                </div>
              )}

              {updateUserMutation.data && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <h4 className="font-medium">User Updated Successfully!</h4>
                  <pre className="mt-2 overflow-auto text-sm">
                    {JSON.stringify(updateUserMutation.data, null, 2)}
                  </pre>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* DELETE Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded bg-red-100 px-2 py-1 font-mono text-red-800 text-xs">
                DELETE
              </span>
              /users/:id
            </CardTitle>
            <CardDescription>Delete a user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="deleteUserId">User ID *</Label>
                <Input
                  id="deleteUserId"
                  placeholder="Enter user ID to delete"
                  type="number"
                />
              </div>

              <Button
                className="w-full"
                disabled={deleteUserMutation.isPending}
                onClick={() => {
                  const userId = Number.parseInt(
                    (
                      document.getElementById(
                        "deleteUserId"
                      ) as HTMLInputElement
                    )?.value || "0",
                    10
                  );
                  if (userId) {
                    handleDelete(userId);
                  }
                }}
                variant="destructive"
              >
                {deleteUserMutation.isPending ? "Deleting..." : "Delete User"}
              </Button>

              {deleteUserMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {deleteUserMutation.error.message}
                </div>
              )}

              {deleteUserMutation.data && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <h4 className="font-medium">User Deleted Successfully!</h4>
                  <pre className="mt-2 overflow-auto text-sm">
                    {JSON.stringify(deleteUserMutation.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Methods Info */}
      <Card>
        <CardHeader>
          <CardTitle>Available HTTP Methods</CardTitle>
          <CardDescription>
            This endpoint supports the following operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
                GET
              </span>
              <span>/users</span>
              <span className="text-muted-foreground text-sm">
                - Retrieve all users
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-800 text-xs">
                POST
              </span>
              <span>/users</span>
              <span className="text-muted-foreground text-sm">
                - Create a new user
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-xs text-yellow-800">
                PUT
              </span>
              <span>/users/:id</span>
              <span className="text-muted-foreground text-sm">
                - Update an existing user
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-red-100 px-2 py-1 font-mono text-red-800 text-xs">
                DELETE
              </span>
              <span>/users/:id</span>
              <span className="text-muted-foreground text-sm">
                - Delete a user
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
