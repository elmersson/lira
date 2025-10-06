"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TaskApiMethodsInfo() {
  const methods = [
    {
      method: "GET",
      endpoint: "/tasks",
      description: "Get all tasks with pagination",
      params: "?page=1&limit=10",
      response: "{ tasks: Task[], total: number, page: number, limit: number }",
    },
    {
      method: "POST",
      endpoint: "/tasks",
      description: "Create a new task",
      body: "{ title*, status*, priority*, projectId*, authorUserId*, description?, tags?, startDate?, dueDate?, points?, assignedUserId? }",
      response: "Task object with generated ID",
    },
    {
      method: "GET",
      endpoint: "/tasks/:id",
      description: "Get a specific task by ID",
      params: "Replace :id with task ID",
      response: "Task object with relations (project, author, assignee)",
    },
    {
      method: "PUT",
      endpoint: "/tasks/:id",
      description: "Update a specific task",
      params: "Replace :id with task ID",
      body: "Partial Task object (any field can be updated)",
      response: "Updated Task object",
    },
    {
      method: "DELETE",
      endpoint: "/tasks/:id",
      description: "Delete a specific task",
      params: "Replace :id with task ID",
      response: "{ message: 'Task deleted successfully' }",
    },
  ];

  const getMethodVariant = (method: string) => {
    switch (method) {
      case "GET":
        return "default" as const;
      case "POST":
        return "secondary" as const;
      case "PUT":
        return "outline" as const;
      case "DELETE":
        return "destructive" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task API Methods</CardTitle>
        <CardDescription>
          Available API endpoints for task management. Fields marked with * are
          required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {methods.map((method) => (
            <div
              className="border-b pb-4 last:border-b-0"
              key={`${method.method}-${method.endpoint}`}
            >
              <div className="flex items-start gap-3">
                <Badge
                  className="font-mono"
                  variant={getMethodVariant(method.method)}
                >
                  {method.method}
                </Badge>
                <div className="flex-1 space-y-2">
                  <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                    {method.endpoint}
                  </code>
                  <p className="text-muted-foreground text-sm">
                    {method.description}
                  </p>

                  {method.params && (
                    <div className="space-y-1">
                      <p className="font-medium text-muted-foreground text-xs">
                        PARAMETERS:
                      </p>
                      <p className="rounded bg-blue-50 px-2 py-1 font-mono text-blue-800 text-xs dark:bg-blue-950 dark:text-blue-200">
                        {method.params}
                      </p>
                    </div>
                  )}

                  {method.body && (
                    <div className="space-y-1">
                      <p className="font-medium text-muted-foreground text-xs">
                        REQUEST BODY:
                      </p>
                      <p className="rounded bg-green-50 px-2 py-1 font-mono text-green-800 text-xs dark:bg-green-950 dark:text-green-200">
                        {method.body}
                      </p>
                    </div>
                  )}

                  {method.response && (
                    <div className="space-y-1">
                      <p className="font-medium text-muted-foreground text-xs">
                        RESPONSE:
                      </p>
                      <p className="rounded bg-purple-50 px-2 py-1 font-mono text-purple-800 text-xs dark:bg-purple-950 dark:text-purple-200">
                        {method.response}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4 rounded-lg bg-muted p-4">
          <h4 className="font-semibold text-sm">Task Object Structure:</h4>
          <div className="space-y-2 font-mono text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-muted-foreground">
                  REQUIRED FIELDS:
                </p>
                <ul className="space-y-1 text-green-700 dark:text-green-300">
                  <li>• title: string</li>
                  <li>• status: "todo" | "in_progress" | "review" | "done"</li>
                  <li>• priority: "low" | "medium" | "high" | "urgent"</li>
                  <li>• projectId: number</li>
                  <li>• authorUserId: number</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">
                  OPTIONAL FIELDS:
                </p>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• description: string</li>
                  <li>• tags: string</li>
                  <li>• startDate: string (YYYY-MM-DD)</li>
                  <li>• dueDate: string (YYYY-MM-DD)</li>
                  <li>• points: number (1-100)</li>
                  <li>• assignedUserId: number</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
