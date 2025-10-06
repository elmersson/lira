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
import { useTask, useUpdateTask } from "@/hooks/api/use-tasks";
import type { UpdateTaskForm } from "@/lib/types/task";
import { TaskForm } from "./task-form";

export function UpdateTaskCard() {
  const [taskId, setTaskId] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { data: task, isLoading: isLoadingTask } = useTask(
    taskId ? Number.parseInt(taskId, 10) : 0
  );
  const updateTaskMutation = useUpdateTask();

  const handleFetchTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskId && task) {
      setIsFormVisible(true);
    }
  };

  const handleSubmit = async (data: UpdateTaskForm) => {
    try {
      console.log("Submitting update for task ID:", taskId, "with data:", data);
      const id = Number.parseInt(taskId, 10);
      await updateTaskMutation.mutateAsync({ id, task: data });
      setIsFormVisible(false);
      setTaskId("");
    } catch {
      // Error is handled by the mutation
      console.error("Failed to update task", data);
    }
  };

  const handleReset = () => {
    setTaskId("");
    setIsFormVisible(false);
  };

  if (isFormVisible && task) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Update Task #{taskId}</CardTitle>
          <CardDescription>Modify the task details below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TaskForm
            initialData={task}
            isLoading={updateTaskMutation.isPending}
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
        <CardTitle>Update Task</CardTitle>
        <CardDescription>Enter a task ID to update</CardDescription>
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
