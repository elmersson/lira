"use client";

import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTasks } from "@/hooks/api/use-tasks";
import type { Task } from "@/lib/types/task";

type TasksListProps = {
  className?: string;
};

export function TasksList({ className }: TasksListProps) {
  const { data: tasksResponse, isLoading, error } = useTasks();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-destructive">Failed to load tasks</p>
        <p className="text-muted-foreground text-sm">{error.message}</p>
      </div>
    );
  }

  const tasks = tasksResponse?.tasks || [];

  if (tasks.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No tasks found</p>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "todo":
        return "outline" as const;
      case "in_progress":
        return "default" as const;
      case "review":
        return "secondary" as const;
      case "done":
        return "default" as const;
      default:
        return "outline" as const;
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "low":
        return "secondary" as const;
      case "medium":
        return "outline" as const;
      case "high":
        return "default" as const;
      case "urgent":
        return "destructive" as const;
      default:
        return "outline" as const;
    }
  };

  const formatStatus = (status: string) => {
    return status.replace("_", " ").toUpperCase();
  };

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {tasks.map((task: Task) => (
        <Card className="transition-shadow hover:shadow-md" key={task.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="line-clamp-2 flex items-center gap-2 text-lg">
                {task.emoji && <span className="text-xl">{task.emoji}</span>}
                {task.title}
              </CardTitle>
              <Badge
                className="ml-2 flex items-center gap-1"
                variant={getPriorityVariant(task.priority)}
              >
                {task.priorityEmoji && <span>{task.priorityEmoji}</span>}
                {task.priority.toUpperCase()}
              </Badge>
            </div>
            <Badge
              className="flex w-fit items-center gap-1"
              variant={getStatusVariant(task.status)}
            >
              {task.statusEmoji && <span>{task.statusEmoji}</span>}
              {formatStatus(task.status)}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {task.description && (
              <CardDescription className="line-clamp-3">
                {task.description}
              </CardDescription>
            )}

            <div className="space-y-2 text-muted-foreground text-sm">
              {task.dueDate && (
                <div>
                  <span className="font-medium">Due:</span>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}

              <div>
                <span className="font-medium">Project:</span> #{task.projectId}
              </div>

              <div>
                <span className="font-medium">Author:</span> #
                {task.authorUserId}
              </div>

              {task.assignedUserId && (
                <div>
                  <span className="font-medium">Assignee:</span> #
                  {task.assignedUserId}
                </div>
              )}

              {task.points && (
                <div>
                  <span className="font-medium">Points:</span> {task.points}
                </div>
              )}

              {task.tags && (
                <div>
                  <span className="font-medium">Tags:</span> {task.tags}
                </div>
              )}

              <div>
                <span className="font-medium">Created:</span>{" "}
                {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
