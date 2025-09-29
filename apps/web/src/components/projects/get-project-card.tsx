import { useState } from "react";
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
import { useProject } from "@/hooks/api/use-projects";

export function GetProjectCard() {
  const [projectId, setProjectId] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data: project,
    isLoading,
    error,
    refetch,
  } = useProject(shouldFetch ? projectId : "");

  const handleFetch = () => {
    if (projectId.trim()) {
      setShouldFetch(true);
      refetch();
    }
  };

  const handleReset = () => {
    setProjectId("");
    setShouldFetch(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
            GET
          </span>
          /projects/:id
        </CardTitle>
        <CardDescription>Retrieve a specific project by ID</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="projectId">Project ID *</Label>
          <Input
            id="projectId"
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="Enter project ID"
            value={projectId}
          />
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1"
            disabled={isLoading || !projectId.trim()}
            onClick={handleFetch}
          >
            {isLoading ? "Loading..." : "Fetch Project"}
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {error && (
          <div className="rounded bg-red-50 p-3 text-red-800">
            Error: {error.message}
          </div>
        )}

        {project && shouldFetch && (
          <div>
            <h4 className="font-medium">Response:</h4>
            <pre className="mt-2 overflow-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
              {JSON.stringify(project, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
