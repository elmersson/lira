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
import { useDeleteProject, useProject } from "@/hooks/api/use-projects";

export function DeleteProjectCard() {
  const [projectId, setProjectId] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    data: project,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useProject(shouldFetch ? projectId : "");

  const deleteProjectMutation = useDeleteProject();

  const handleFetchProject = () => {
    if (projectId.trim()) {
      setShouldFetch(true);
      setConfirmDelete(false);
      refetch();
    }
  };

  const handleDeleteProject = () => {
    if (projectId.trim()) {
      deleteProjectMutation.mutate(projectId, {
        onSuccess: () => {
          setProjectId("");
          setShouldFetch(false);
          setConfirmDelete(false);
        },
      });
    }
  };

  const handleReset = () => {
    setProjectId("");
    setShouldFetch(false);
    setConfirmDelete(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="rounded bg-red-100 px-2 py-1 font-mono text-red-800 text-xs">
            DELETE
          </span>
          /projects/:id
        </CardTitle>
        <CardDescription>Delete a specific project by ID</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Step 1: Fetch Project */}
        <div className="border-b pb-4">
          <h4 className="mb-2 font-medium">Step 1: Fetch Project</h4>
          <div className="flex gap-2">
            <Input
              className="flex-1"
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="Enter project ID"
              value={projectId}
            />
            <Button
              disabled={isFetching || !projectId.trim()}
              onClick={handleFetchProject}
            >
              {isFetching ? "Loading..." : "Fetch"}
            </Button>
          </div>

          {fetchError && (
            <div className="mt-2 rounded bg-red-50 p-3 text-red-800">
              Error: {fetchError.message}
            </div>
          )}

          {project && shouldFetch && (
            <div className="mt-2 rounded bg-blue-50 p-3 text-blue-800">
              <p className="text-gray-600 text-sm">
                Project found: <strong>{project.name}</strong>
              </p>
              <p className="text-gray-500 text-xs">
                ID: {project.id} | Created:{" "}
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Step 2: Confirm and Delete */}
        {project && shouldFetch && (
          <div>
            <h4 className="mb-2 font-medium">Step 2: Confirm Deletion</h4>
            <div className="space-y-3">
              <div className="rounded bg-yellow-50 p-3 text-yellow-800">
                <p className="font-medium">⚠️ Warning</p>
                <p className="text-sm">
                  This action cannot be undone. This will permanently delete the
                  project "{project.name}" and all associated data.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  checked={confirmDelete}
                  className="rounded"
                  id="confirmDelete"
                  onChange={(e) => setConfirmDelete(e.target.checked)}
                  type="checkbox"
                />
                <Label className="text-sm" htmlFor="confirmDelete">
                  I understand that this action cannot be undone
                </Label>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  disabled={!confirmDelete || deleteProjectMutation.isPending}
                  onClick={handleDeleteProject}
                  variant="destructive"
                >
                  {deleteProjectMutation.isPending
                    ? "Deleting..."
                    : "Delete Project"}
                </Button>
                <Button onClick={handleReset} type="button" variant="outline">
                  Cancel
                </Button>
              </div>

              {deleteProjectMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {deleteProjectMutation.error.message}
                </div>
              )}

              {deleteProjectMutation.isSuccess && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <p className="font-medium">Project deleted successfully!</p>
                  <p className="text-sm">
                    The project has been permanently removed.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
