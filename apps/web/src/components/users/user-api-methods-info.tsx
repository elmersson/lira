"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UserApiMethodsInfo() {
  return (
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
            <span>/users</span>
            <span className="text-muted-foreground text-sm">
              - Retrieve all users
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
              GET
            </span>
            <span>/users/:id</span>
            <span className="text-muted-foreground text-sm">
              - Retrieve a specific user
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-800 text-xs">
              POST
            </span>
            <span>/users</span>
            <span className="text-muted-foreground text-sm">
              - Create a new user
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-xs text-yellow-800">
              PUT
            </span>
            <span>/users/:id</span>
            <span className="text-muted-foreground text-sm">
              - Update an existing user
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-red-100 px-2 py-1 font-mono text-red-800 text-xs">
              DELETE
            </span>
            <span>/users/:id</span>
            <span className="text-muted-foreground text-sm">
              - Delete a user
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
