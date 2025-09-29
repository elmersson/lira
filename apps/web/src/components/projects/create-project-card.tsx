import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectForm } from "./project-form";

export function CreateProjectCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-800 text-xs">
            POST
          </span>
          /projects
        </CardTitle>
        <CardDescription>Create a new project</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectForm />
      </CardContent>
    </Card>
  );
}
