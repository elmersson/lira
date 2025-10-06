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
import { useTask } from "@/hooks/api/use-tasks";

export function GetTaskCard() {
  const [taskId, setTaskId] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data: task,
    isLoading,
    error,
  } = useTask(taskId ? Number.parseInt(taskId, 10) : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskId) {
      setShouldFetch(true);
    }
  };

  const handleReset = () => {
    setTaskId("");
    setShouldFetch(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Task by ID</CardTitle>
        <CardDescription>Enter a task ID to fetch its details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="taskId">Task ID</Label>
            <Input
              id="taskId"
              min="1"
              onChange={(e) => setTaskId(e.target.value)}
              placeholder="Enter task ID"
              type="number"
              value={taskId}
            />
          </div>
          <div className="flex gap-2">
            <Button disabled={!taskId || isLoading} type="submit">
              {isLoading ? "Fetching..." : "Get Task"}
            </Button>
            <Button onClick={handleReset} type="button" variant="outline">
              Reset
            </Button>
          </div>
        </form>

        {shouldFetch && taskId && (
          <div className="mt-4 border-t pt-4">
            {isLoading && <Loader />}

            {error && (
              <div className="py-4 text-center">
                <p className="text-destructive">Failed to fetch task</p>
                <p className="text-muted-foreground text-sm">{error.message}</p>
              </div>
            )}

            {task && !isLoading && (
              <div className="space-y-3">
                <h3 className="font-semibold">Task Details:</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">ID:</span> {task.id}
                  </div>
                  <div>
                    <span className="font-medium">Title:</span> {task.title}
                  </div>
                  {task.description && (
                    <div>
                      <span className="font-medium">Description:</span>{" "}
                      {task.description}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Status:</span> {task.status}
                  </div>
                  <div>
                    <span className="font-medium">Priority:</span>{" "}
                    {task.priority}
                  </div>
                  <div>
                    <span className="font-medium">Project ID:</span>{" "}
                    {task.projectId}
                  </div>
                  <div>
                    <span className="font-medium">Author:</span>{" "}
                    {task.authorUserId}
                  </div>
                  {task.assignedUserId && (
                    <div>
                      <span className="font-medium">Assignee:</span>{" "}
                      {task.assignedUserId}
                    </div>
                  )}
                  {task.dueDate && (
                    <div>
                      <span className="font-medium">Due Date:</span>{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  )}
                  {task.tags && (
                    <div>
                      <span className="font-medium">Tags:</span> {task.tags}
                    </div>
                  )}
                  {task.points && (
                    <div>
                      <span className="font-medium">Points:</span> {task.points}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(task.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Updated:</span>{" "}
                    {new Date(task.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}

            {taskId && !task && !isLoading && !error && (
              <div className="py-4 text-center">
                <p className="text-muted-foreground">Task not found</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
