"use client";

import { CreateTaskCard } from "@/components/tasks/create-task-card";
import { DeleteTaskCard } from "@/components/tasks/delete-task-card";
import { GetTaskCard } from "@/components/tasks/get-task-card";
import { TaskApiMethodsInfo } from "@/components/tasks/task-api-methods-info";
import { TasksList } from "@/components/tasks/tasks-list";
import { UpdateTaskCard } from "@/components/tasks/update-task-card";

export default function TasksPage() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="font-bold text-3xl">Task Management</h1>
        <p className="text-muted-foreground">
          Manage your tasks with full CRUD operations
        </p>
      </div>

      {/* Task List */}
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">All Tasks</h2>
        <TasksList />
      </section>

      {/* CRUD Operations */}
      <section className="space-y-6">
        <h2 className="font-semibold text-2xl">Task Operations</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <CreateTaskCard />
          <GetTaskCard />
          <UpdateTaskCard />
          <DeleteTaskCard />
        </div>
      </section>

      {/* API Documentation */}
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">API Reference</h2>
        <TaskApiMethodsInfo />
      </section>
    </div>
  );
}
