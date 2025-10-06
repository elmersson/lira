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
import { useDeleteTask, useTask } from "@/hooks/api/use-tasks";

export function DeleteTaskCard() {
  const [taskId, setTaskId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { data: task, isLoading: isLoadingTask } = useTask(
    taskId ? Number.parseInt(taskId, 10) : 0
  );
  const deleteTaskMutation = useDeleteTask();

  const handleFetchTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskId && task) {
      setShowConfirmation(true);
    }
  };

  const handleDelete = async () => {
    try {
      const id = Number.parseInt(taskId, 10);
      await deleteTaskMutation.mutateAsync(id);
      setTaskId("");
      setShowConfirmation(false);
    } catch {
      // Error is handled by the mutation
    }
  };

  const handleReset = () => {
    setTaskId("");
    setShowConfirmation(false);
  };

  if (showConfirmation && task) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">
            Delete Task #{taskId}
          </CardTitle>
          <CardDescription>This action cannot be undone</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 rounded-lg bg-muted p-4">
            <h4 className="font-medium">Task to be deleted:</h4>
            <div className="space-y-1 text-sm">
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
                <span className="font-medium">Priority:</span> {task.priority}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1"
              disabled={deleteTaskMutation.isPending}
              onClick={handleDelete}
              variant="destructive"
            >
              {deleteTaskMutation.isPending ? "Deleting..." : "Confirm Delete"}
            </Button>
            <Button className="flex-1" onClick={handleReset} variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Task</CardTitle>
        <CardDescription>Enter a task ID to delete</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleFetchTask}>
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
            <Button disabled={!taskId || isLoadingTask || !task} type="submit">
              {isLoadingTask ? "Loading..." : "Load Task"}
            </Button>
            <Button onClick={handleReset} type="button" variant="outline">
              Reset
            </Button>
          </div>
        </form>

        {taskId && isLoadingTask && (
          <div className="mt-4 border-t pt-4">
            <Loader />
          </div>
        )}

        {taskId && !task && !isLoadingTask && (
          <div className="mt-4 border-t pt-4">
            <p className="text-center text-destructive">Task not found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
