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
const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "review", "done"]).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  tags: z.string().optional(),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  points: z.number().min(1).max(100).optional(),
  projectId: z.number().min(1, "Project ID is required"),
  authorUserId: z.number().min(1, "Author user ID is required"),
  assignedUserId: z.number().min(1).optional(),
});

const updateTaskSchema = createTaskSchema.partial();

type CreateTaskForm = z.infer<typeof createTaskSchema>;
type UpdateTaskForm = z.infer<typeof updateTaskSchema>;

// API functions
async function fetchTasks() {
  const response = await fetch(`${SERVER_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

async function createTask(data: CreateTaskForm) {
  const response = await fetch(`${SERVER_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create task");
  }
  return response.json();
}

async function updateTask(id: number, data: UpdateTaskForm) {
  const response = await fetch(`${SERVER_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update task");
  }
  return response.json();
}

async function deleteTask(id: number) {
  const response = await fetch(`${SERVER_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete task");
  }
  return response.json();
}

export default function TasksPage() {
  const queryClient = useQueryClient();

  // React Query for GET request
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // React Query for POST request
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset();
    },
  });

  // React Query for PUT request
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskForm }) =>
      updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      resetUpdate();
    },
  });

  // React Query for DELETE request
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // React Hook Form setup for create
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskSchema),
  });

  // React Hook Form setup for update
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors: updateErrors },
  } = useForm<UpdateTaskForm>({
    resolver: zodResolver(updateTaskSchema),
  });

  const onSubmit = (data: CreateTaskForm) => {
    createTaskMutation.mutate(data);
  };

  const onUpdateSubmit = (data: UpdateTaskForm) => {
    const taskId = Number.parseInt(
      (document.getElementById("updateTaskId") as HTMLInputElement)?.value ||
        "0",
      10
    );
    if (taskId) {
      updateTaskMutation.mutate({ id: taskId, data });
    }
  };

  const handleDelete = (taskId: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">← Back</Button>
        </Link>
        <h1 className="font-bold text-2xl">Tasks API</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* GET Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
                GET
              </span>
              /tasks
            </CardTitle>
            <CardDescription>
              Retrieve all tasks from the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["tasks"] })
              }
            >
              {isLoading ? "Loading..." : "Fetch Tasks"}
            </Button>

            {error && (
              <div className="mt-4 rounded bg-red-50 p-3 text-red-800">
                Error: {error.message}
              </div>
            )}

            {tasks && (
              <div className="mt-4">
                <h4 className="font-medium">Response:</h4>
                <pre className="mt-2 max-h-60 overflow-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
                  {JSON.stringify(tasks, null, 2)}
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
              /tasks
            </CardTitle>
            <CardDescription>Create a new task</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter task title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  {...register("description")}
                  placeholder="Enter task description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    {...register("status")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select status</option>
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-sm">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    {...register("priority")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  {errors.priority && (
                    <p className="text-red-500 text-sm">
                      {errors.priority.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  {...register("tags")}
                  placeholder="Enter tags (comma separated)"
                />
                {errors.tags && (
                  <p className="text-red-500 text-sm">{errors.tags.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register("startDate")}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" {...register("dueDate")} />
                  {errors.dueDate && (
                    <p className="text-red-500 text-sm">
                      {errors.dueDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  max="100"
                  min="1"
                  type="number"
                  {...register("points", { valueAsNumber: true })}
                  placeholder="Enter story points"
                />
                {errors.points && (
                  <p className="text-red-500 text-sm">
                    {errors.points.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectId">Project ID *</Label>
                  <Input
                    id="projectId"
                    type="number"
                    {...register("projectId", { valueAsNumber: true })}
                    placeholder="Enter project ID"
                  />
                  {errors.projectId && (
                    <p className="text-red-500 text-sm">
                      {errors.projectId.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="authorUserId">Author User ID *</Label>
                  <Input
                    id="authorUserId"
                    type="number"
                    {...register("authorUserId", { valueAsNumber: true })}
                    placeholder="Enter author user ID"
                  />
                  {errors.authorUserId && (
                    <p className="text-red-500 text-sm">
                      {errors.authorUserId.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="assignedUserId">Assigned User ID</Label>
                <Input
                  id="assignedUserId"
                  type="number"
                  {...register("assignedUserId", { valueAsNumber: true })}
                  placeholder="Enter assigned user ID"
                />
                {errors.assignedUserId && (
                  <p className="text-red-500 text-sm">
                    {errors.assignedUserId.message}
                  </p>
                )}
              </div>

              <Button
                className="w-full"
                disabled={createTaskMutation.isPending}
                type="submit"
              >
                {createTaskMutation.isPending ? "Creating..." : "Create Task"}
              </Button>

              {createTaskMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {createTaskMutation.error.message}
                </div>
              )}

              {createTaskMutation.data && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <h4 className="font-medium">Task Created Successfully!</h4>
                  <pre className="mt-2 overflow-auto text-sm">
                    {JSON.stringify(createTaskMutation.data, null, 2)}
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
              /tasks/:id
            </CardTitle>
            <CardDescription>Update an existing task</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={handleSubmitUpdate(onUpdateSubmit)}
            >
              <div>
                <Label htmlFor="updateTaskId">Task ID *</Label>
                <Input
                  id="updateTaskId"
                  placeholder="Enter task ID to update"
                  required
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="updateTitle">Title</Label>
                <Input
                  id="updateTitle"
                  {...registerUpdate("title")}
                  placeholder="Enter new title"
                />
                {updateErrors.title && (
                  <p className="text-red-500 text-sm">
                    {updateErrors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="updateDescription">Description</Label>
                <Input
                  id="updateDescription"
                  {...registerUpdate("description")}
                  placeholder="Enter new description"
                />
                {updateErrors.description && (
                  <p className="text-red-500 text-sm">
                    {updateErrors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="updateStatus">Status</Label>
                  <select
                    id="updateStatus"
                    {...registerUpdate("status")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select status</option>
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                  {updateErrors.status && (
                    <p className="text-red-500 text-sm">
                      {updateErrors.status.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="updatePriority">Priority</Label>
                  <select
                    id="updatePriority"
                    {...registerUpdate("priority")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  {updateErrors.priority && (
                    <p className="text-red-500 text-sm">
                      {updateErrors.priority.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                className="w-full"
                disabled={updateTaskMutation.isPending}
                type="submit"
              >
                {updateTaskMutation.isPending ? "Updating..." : "Update Task"}
              </Button>

              {updateTaskMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {updateTaskMutation.error.message}
                </div>
              )}

              {updateTaskMutation.data && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <h4 className="font-medium">Task Updated Successfully!</h4>
                  <pre className="mt-2 overflow-auto text-sm">
                    {JSON.stringify(updateTaskMutation.data, null, 2)}
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
              /tasks/:id
            </CardTitle>
            <CardDescription>Delete a task</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="deleteTaskId">Task ID *</Label>
                <Input
                  id="deleteTaskId"
                  placeholder="Enter task ID to delete"
                  type="number"
                />
              </div>

              <Button
                className="w-full"
                disabled={deleteTaskMutation.isPending}
                onClick={() => {
                  const taskId = Number.parseInt(
                    (
                      document.getElementById(
                        "deleteTaskId"
                      ) as HTMLInputElement
                    )?.value || "0",
                    10
                  );
                  if (taskId) {
                    handleDelete(taskId);
                  }
                }}
                variant="destructive"
              >
                {deleteTaskMutation.isPending ? "Deleting..." : "Delete Task"}
              </Button>

              {deleteTaskMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {deleteTaskMutation.error.message}
                </div>
              )}

              {deleteTaskMutation.data && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <h4 className="font-medium">Task Deleted Successfully!</h4>
                  <pre className="mt-2 overflow-auto text-sm">
                    {JSON.stringify(deleteTaskMutation.data, null, 2)}
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
              <span>/tasks</span>
              <span className="text-muted-foreground text-sm">
                - Retrieve all tasks
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-800 text-xs">
                POST
              </span>
              <span>/tasks</span>
              <span className="text-muted-foreground text-sm">
                - Create a new task
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-xs text-yellow-800">
                PUT
              </span>
              <span>/tasks/:id</span>
              <span className="text-muted-foreground text-sm">
                - Update an existing task
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-red-100 px-2 py-1 font-mono text-red-800 text-xs">
                DELETE
              </span>
              <span>/tasks/:id</span>
              <span className="text-muted-foreground text-sm">
                - Delete a task
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
