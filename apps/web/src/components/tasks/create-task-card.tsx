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
import { useCreateTask } from "@/hooks/api/use-tasks";
import type { CreateTaskForm, UpdateTaskForm } from "@/lib/types/task";
import { TaskForm } from "./task-form";

export function CreateTaskCard() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const createTaskMutation = useCreateTask();

  const handleSubmit = async (data: CreateTaskForm | UpdateTaskForm) => {
    try {
      // Ensure data has required fields for creation
      if (data.title && data.status && data.priority) {
        await createTaskMutation.mutateAsync(data as CreateTaskForm);
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
          <CardTitle>Create New Task</CardTitle>
          <CardDescription>Add a new task to your project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TaskForm
            isLoading={createTaskMutation.isPending}
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
          Create New Task
        </Button>
      </CardContent>
    </Card>
  );
}
