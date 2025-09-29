"use client";

import Link from "next/link";
import { ApiMethodsInfo } from "@/components/projects/api-methods-info";
import { CreateProjectCard } from "@/components/projects/create-project-card";
import { DeleteProjectCard } from "@/components/projects/delete-project-card";
import { GetProjectCard } from "@/components/projects/get-project-card";
import { ProjectsList } from "@/components/projects/projects-list";
import { UpdateProjectCard } from "@/components/projects/update-project-card";
import { Button } from "@/components/ui/button";

export default function ProjectEndpoint() {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">← Back</Button>
        </Link>
        <h1 className="font-bold text-2xl">Projects API</h1>
      </div>

      {/* Main CRUD Operations */}
      <div className="grid gap-6 md:grid-cols-2">
        <ProjectsList />
        <CreateProjectCard />
      </div>

      {/* Additional Operations */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <GetProjectCard />
        <UpdateProjectCard />
        <DeleteProjectCard />
      </div>

      <ApiMethodsInfo />
    </div>
  );
}
