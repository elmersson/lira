import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjects } from "@/hooks/api/use-projects";
import { QUERY_KEYS } from "@/lib/constants/api";

export function ProjectsList() {
  const queryClient = useQueryClient();
  const { data: projects, isLoading, error } = useProjects();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
            GET
          </span>
          /projects
        </CardTitle>
        <CardDescription>
          Retrieve all projects from the database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" disabled={isLoading} onClick={handleRefresh}>
          {isLoading ? "Loading..." : "Fetch Projects"}
        </Button>

        {error && (
          <div className="mt-4 rounded bg-red-50 p-3 text-red-800">
            Error: {error.message}
          </div>
        )}

        {projects && (
          <div className="mt-4">
            <h4 className="font-medium">Response:</h4>
            <pre className="mt-2 overflow-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
              {JSON.stringify(projects, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
