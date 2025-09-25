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
const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().or(z.literal("")),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

// API functions
async function fetchProjects() {
  const response = await fetch(`${SERVER_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
}

async function createProject(data: CreateProjectForm) {
  const response = await fetch(`${SERVER_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }
  return response.json();
}

export default function ProjectEndpoint() {
  const queryClient = useQueryClient();

  // React Query for GET request
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  // React Query for POST request
  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      // Reset form after successful creation
      reset();
    },
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit = (data: CreateProjectForm) => {
    createProjectMutation.mutate(data);
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">← Back</Button>
        </Link>
        <h1 className="font-bold text-2xl">Projects API</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* GET Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
                GET
              </span>
              /projects
            </CardTitle>
            <CardDescription>
              Retrieve all projects from the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["projects"] })
              }
            >
              {isLoading ? "Loading..." : "Fetch Projects"}
            </Button>

            {error && (
              <div className="mt-4 rounded bg-red-50 p-3 text-red-800">
                Error: {error.message}
              </div>
            )}

            {projects && (
              <div className="mt-4">
                <h4 className="font-medium">Response:</h4>
                <pre className="mt-2 overflow-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
                  {JSON.stringify(projects, null, 2)}
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
              /projects
            </CardTitle>
            <CardDescription>Create a new project</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter project name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  {...register("description")}
                  placeholder="Enter project description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" {...register("startDate")} />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" {...register("endDate")} />
                {errors.endDate && (
                  <p className="text-red-500 text-sm">
                    {errors.endDate.message}
                  </p>
                )}
              </div>

              <Button
                className="w-full"
                disabled={createProjectMutation.isPending}
                type="submit"
              >
                {createProjectMutation.isPending
                  ? "Creating..."
                  : "Create Project"}
              </Button>

              {createProjectMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {createProjectMutation.error.message}
                </div>
              )}

              {createProjectMutation.data && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <h4 className="font-medium">Project Created Successfully!</h4>
                  <pre className="mt-2 overflow-auto text-sm">
                    {JSON.stringify(createProjectMutation.data, null, 2)}
                  </pre>
                </div>
              )}
            </form>
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
              <span>/projects</span>
              <span className="text-muted-foreground text-sm">
                - Retrieve all projects
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-800 text-xs">
                POST
              </span>
              <span>/projects</span>
              <span className="text-muted-foreground text-sm">
                - Create a new project
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
