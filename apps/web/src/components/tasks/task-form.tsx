"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  type CreateTaskForm,
  createTaskSchema,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_OPTIONS,
  type Task,
  type UpdateTaskForm,
  updateTaskSchema,
} from "@/lib/types/task";

type TaskFormProps = {
  onSubmit: (data: CreateTaskForm | UpdateTaskForm) => void;
  initialData?: Task;
  isLoading?: boolean;
  mode: "create" | "update";
};

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
export function TaskForm({
  onSubmit,
  initialData,
  isLoading,
  mode,
}: TaskFormProps) {
  const schema = mode === "create" ? createTaskSchema : updateTaskSchema;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTaskForm | UpdateTaskForm>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          emoji: initialData.emoji || "",
          description: initialData.description || "",
          status: initialData.status,
          statusEmoji: initialData.statusEmoji || "",
          priority: initialData.priority,
          priorityEmoji: initialData.priorityEmoji || "",
          tags: initialData.tags || "",
          startDate: initialData.startDate || "",
          dueDate: initialData.dueDate || "",
          points: initialData.points,
          projectId: initialData.projectId,
          authorUserId: initialData.authorUserId,
          assignedUserId: initialData.assignedUserId || undefined,
        }
      : {
          title: "",
          emoji: "",
          description: "",
          status: "todo",
          statusEmoji: "",
          priority: "medium",
          priorityEmoji: "",
          tags: "",
          startDate: "",
          dueDate: "",
          projectId: 1, // Changed from 0 to 1
          authorUserId: 1, // Changed from 0 to 1
        },
  });

  const status = watch("status");
  const priority = watch("priority");

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="emoji">Task Emoji</Label>
        <Input
          id="emoji"
          {...register("emoji")}
          maxLength={10}
          placeholder="✅"
        />
        {errors.emoji && (
          <p className="text-destructive text-sm">{errors.emoji.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter task description"
          rows={3}
        />
        {errors.description && (
          <p className="text-destructive text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            onValueChange={(value) =>
              setValue(
                "status",
                value as "todo" | "in_progress" | "review" | "done"
              )
            }
            value={status}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {TASK_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.replace("_", " ").toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-destructive text-sm">{errors.status.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority *</Label>
          <Select
            onValueChange={(value) =>
              setValue(
                "priority",
                value as "low" | "medium" | "high" | "urgent"
              )
            }
            value={priority}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {TASK_PRIORITY_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.priority && (
            <p className="text-destructive text-sm">
              {errors.priority.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="statusEmoji">Status Emoji</Label>
          <Input
            id="statusEmoji"
            {...register("statusEmoji")}
            maxLength={10}
            placeholder="⏳"
          />
          {errors.statusEmoji && (
            <p className="text-destructive text-sm">
              {errors.statusEmoji.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="priorityEmoji">Priority Emoji</Label>
          <Input
            id="priorityEmoji"
            {...register("priorityEmoji")}
            maxLength={10}
            placeholder="🔴"
          />
          {errors.priorityEmoji && (
            <p className="text-destructive text-sm">
              {errors.priorityEmoji.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" type="date" {...register("startDate")} />
          {errors.startDate && (
            <p className="text-destructive text-sm">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input id="dueDate" type="date" {...register("dueDate")} />
          {errors.dueDate && (
            <p className="text-destructive text-sm">{errors.dueDate.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          {...register("tags")}
          placeholder="Enter tags (comma-separated)"
        />
        {errors.tags && (
          <p className="text-destructive text-sm">{errors.tags.message}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="points">Story Points</Label>
          <Input
            id="points"
            max="100"
            min="1"
            type="number"
            {...register("points", { valueAsNumber: true })}
            placeholder="1-100"
          />
          {errors.points && (
            <p className="text-destructive text-sm">{errors.points.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectId">Project ID *</Label>
          <Input
            id="projectId"
            min="1"
            type="number"
            {...register("projectId", { valueAsNumber: true })}
            placeholder="Enter project ID"
          />
          {errors.projectId && (
            <p className="text-destructive text-sm">
              {errors.projectId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="authorUserId">Author ID *</Label>
          <Input
            id="authorUserId"
            min="1"
            type="number"
            {...register("authorUserId", { valueAsNumber: true })}
            placeholder="Enter author ID"
          />
          {errors.authorUserId && (
            <p className="text-destructive text-sm">
              {errors.authorUserId.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="assignedUserId">Assignee ID (Optional)</Label>
        <Input
          id="assignedUserId"
          min="1"
          type="number"
          {...register("assignedUserId", { valueAsNumber: true })}
          placeholder="Enter assignee ID"
        />
        {errors.assignedUserId && (
          <p className="text-destructive text-sm">
            {errors.assignedUserId.message}
          </p>
        )}
      </div>

      <Button className="w-full" disabled={isLoading} type="submit">
        {isLoading
          ? "Saving..."
          : `${mode === "create" ? "Create" : "Update"} Task`}
      </Button>
    </form>
  );
}
