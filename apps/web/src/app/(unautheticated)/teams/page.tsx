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

// Update the schema to use numbers:
const createTeamSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters"),
  productOwnerUserId: z.number().optional(),
  projectManagerUserId: z.number().optional(),
});

const updateTeamSchema = createTeamSchema.partial();

type CreateTeamForm = z.infer<typeof createTeamSchema>;
type UpdateTeamForm = z.infer<typeof updateTeamSchema>;

// API functions
async function fetchTeams() {
  const response = await fetch(`${SERVER_URL}/teams`);
  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }
  return response.json();
}

async function createTeam(data: CreateTeamForm) {
  const response = await fetch(`${SERVER_URL}/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create team");
  }
  return response.json();
}

async function updateTeam(id: number, data: UpdateTeamForm) {
  const response = await fetch(`${SERVER_URL}/teams/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update team");
  }
  return response.json();
}

async function deleteTeam(id: number) {
  const response = await fetch(`${SERVER_URL}/teams/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete team");
  }
  return response.json();
}

export default function TeamsPage() {
  const queryClient = useQueryClient();

  // React Query for GET request
  const {
    data: teams,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  // React Query for POST request
  const createTeamMutation = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      reset();
    },
  });

  // React Query for PUT request
  const updateTeamMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTeamForm }) =>
      updateTeam(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      resetUpdate();
    },
  });

  // React Query for DELETE request
  const deleteTeamMutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });

  // React Hook Form setup for create
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTeamForm>({
    resolver: zodResolver(createTeamSchema),
  });

  // React Hook Form setup for update
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: updateErrors },
  } = useForm<UpdateTeamForm>({
    resolver: zodResolver(updateTeamSchema),
  });

  const onSubmit = (data: CreateTeamForm) => {
    createTeamMutation.mutate(data);
  };

  // Update the form submission to handle the ID properly:
  const onUpdateSubmit = (data: UpdateTeamForm) => {
    const teamIdInput = document.getElementById(
      "updateTeamId"
    ) as HTMLInputElement;
    const teamId = teamIdInput?.value;

    if (!teamId || teamId === "") {
      alert("Please enter a team ID");
      return;
    }

    const parsedId = Number.parseInt(teamId, 10);
    if (Number.isNaN(parsedId)) {
      alert("Team ID must be a valid number");
      return;
    }

    updateTeamMutation.mutate({ id: parsedId, data });
  };

  const handleDelete = (teamId: number) => {
    if (confirm("Are you sure you want to delete this team?")) {
      deleteTeamMutation.mutate(teamId);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">← Back</Button>
        </Link>
        <h1 className="font-bold text-2xl">Teams API</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* GET Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
                GET
              </span>
              /teams
            </CardTitle>
            <CardDescription>
              Retrieve all teams from the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["teams"] })
              }
            >
              {isLoading ? "Loading..." : "Fetch Teams"}
            </Button>

            {error && (
              <div className="mt-4 rounded bg-red-50 p-3 text-red-800">
                Error: {error.message}
              </div>
            )}

            {teams && (
              <div className="mt-4">
                <h4 className="font-medium">Response:</h4>
                <pre className="mt-2 max-h-60 overflow-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
                  {JSON.stringify(teams, null, 2)}
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
              /teams
            </CardTitle>
            <CardDescription>Create a new team</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="teamName">Team Name *</Label>
                <Input
                  id="teamName"
                  {...register("teamName")}
                  placeholder="Enter team name"
                />
                {errors.teamName && (
                  <p className="text-red-500 text-sm">
                    {errors.teamName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="productOwnerUserId">
                  Product Owner User ID
                </Label>
                <Input
                  id="productOwnerUserId"
                  type="number"
                  {...register("productOwnerUserId", {
                    valueAsNumber: true,
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  placeholder="Enter product owner user ID"
                />
                {errors.productOwnerUserId && (
                  <p className="text-red-500 text-sm">
                    {errors.productOwnerUserId.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="projectManagerUserId">
                  Project Manager User ID
                </Label>
                <Input
                  id="projectManagerUserId"
                  type="number"
                  {...register("projectManagerUserId", {
                    valueAsNumber: true,
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  placeholder="Enter project manager user ID"
                />
                {errors.projectManagerUserId && (
                  <p className="text-red-500 text-sm">
                    {errors.projectManagerUserId.message}
                  </p>
                )}
              </div>

              <Button
                className="w-full"
                disabled={createTeamMutation.isPending}
                type="submit"
              >
                {createTeamMutation.isPending ? "Creating..." : "Create Team"}
              </Button>

              {createTeamMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {createTeamMutation.error.message}
                </div>
              )}

              {createTeamMutation.data && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <h4 className="font-medium">Team Created Successfully!</h4>
                  <pre className="mt-2 overflow-auto text-sm">
                    {JSON.stringify(createTeamMutation.data, null, 2)}
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
              /teams/:id
            </CardTitle>
            <CardDescription>Update an existing team</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={handleSubmitUpdate(onUpdateSubmit)}
            >
              <div>
                <Label htmlFor="updateTeamId">Team ID *</Label>
                <Input
                  id="updateTeamId"
                  placeholder="Enter team ID to update"
                  required
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="updateTeamName">Team Name</Label>
                <Input
                  id="updateTeamName"
                  {...registerUpdate("teamName")}
                  placeholder="Enter new team name"
                />
                {updateErrors.teamName && (
                  <p className="text-red-500 text-sm">
                    {updateErrors.teamName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="updateProductOwnerUserId">
                  Product Owner User ID
                </Label>
                <Input
                  id="updateProductOwnerUserId"
                  type="number"
                  {...registerUpdate("productOwnerUserId", {
                    valueAsNumber: true,
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  placeholder="Enter new product owner user ID"
                />
                {updateErrors.productOwnerUserId && (
                  <p className="text-red-500 text-sm">
                    {updateErrors.productOwnerUserId.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="updateProjectManagerUserId">
                  Project Manager User ID
                </Label>
                <Input
                  id="updateProjectManagerUserId"
                  type="number"
                  {...registerUpdate("projectManagerUserId", {
                    valueAsNumber: true,
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  placeholder="Enter new project manager user ID"
                />
                {updateErrors.projectManagerUserId && (
                  <p className="text-red-500 text-sm">
                    {updateErrors.projectManagerUserId.message}
                  </p>
                )}
              </div>

              <Button
                className="w-full"
                disabled={updateTeamMutation.isPending}
                type="submit"
              >
                {updateTeamMutation.isPending ? "Updating..." : "Update Team"}
              </Button>

              {updateTeamMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {updateTeamMutation.error.message}
                </div>
              )}

              {updateTeamMutation.data && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <h4 className="font-medium">Team Updated Successfully!</h4>
                  <pre className="mt-2 overflow-auto text-sm">
                    {JSON.stringify(updateTeamMutation.data, null, 2)}
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
              /teams/:id
            </CardTitle>
            <CardDescription>Delete a team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="deleteTeamId">Team ID *</Label>
                <Input
                  id="deleteTeamId"
                  placeholder="Enter team ID to delete"
                  type="number"
                />
              </div>

              <Button
                className="w-full"
                disabled={deleteTeamMutation.isPending}
                onClick={() => {
                  const teamIdInput = document.getElementById(
                    "deleteTeamId"
                  ) as HTMLInputElement;
                  const teamId = teamIdInput?.value;

                  if (!teamId || teamId === "") {
                    alert("Please enter a team ID");
                    return;
                  }

                  const parsedId = Number.parseInt(teamId, 10);
                  if (Number.isNaN(parsedId)) {
                    alert("Team ID must be a valid number");
                    return;
                  }

                  handleDelete(parsedId);
                }}
                variant="destructive"
              >
                {deleteTeamMutation.isPending ? "Deleting..." : "Delete Team"}
              </Button>

              {deleteTeamMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {deleteTeamMutation.error.message}
                </div>
              )}

              {deleteTeamMutation.data && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <h4 className="font-medium">Team Deleted Successfully!</h4>
                  <pre className="mt-2 overflow-auto text-sm">
                    {JSON.stringify(deleteTeamMutation.data, null, 2)}
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
              <span>/teams</span>
              <span className="text-muted-foreground text-sm">
                - Retrieve all teams
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-800 text-xs">
                POST
              </span>
              <span>/teams</span>
              <span className="text-muted-foreground text-sm">
                - Create a new team
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-xs text-yellow-800">
                PUT
              </span>
              <span>/teams/:id</span>
              <span className="text-muted-foreground text-sm">
                - Update an existing team
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-red-100 px-2 py-1 font-mono text-red-800 text-xs">
                DELETE
              </span>
              <span>/teams/:id</span>
              <span className="text-muted-foreground text-sm">
                - Delete a team
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
