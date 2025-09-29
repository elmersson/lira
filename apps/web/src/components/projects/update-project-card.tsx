import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useProject, useUpdateProject } from "@/hooks/api/use-projects";

const updateProjectSchema = z.object({
  id: z.string().min(1, "Project ID is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().or(z.literal("")),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
});

type UpdateProjectForm = z.infer<typeof updateProjectSchema>;

export function UpdateProjectCard() {
  const [projectId, setProjectId] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data: project,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useProject(shouldFetch ? projectId : "");

  const updateProjectMutation = useUpdateProject();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateProjectForm>({
    resolver: zodResolver(updateProjectSchema),
  });

  const handleFetchProject = () => {
    if (projectId.trim()) {
      setShouldFetch(true);
      setValue("id", projectId);
      refetch();
    }
  };

  const handleLoadProject = () => {
    if (project) {
      setValue("name", project.name);
      setValue("description", project.description || "");
      setValue("startDate", project.startDate || "");
      setValue("endDate", project.endDate || "");
    }
  };

  const onSubmit = (data: UpdateProjectForm) => {
    const { id, ...updateData } = data;
    updateProjectMutation.mutate({ id, data: updateData });
  };

  const handleReset = () => {
    setProjectId("");
    setShouldFetch(false);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-xs text-yellow-800">
            PUT
          </span>
          /projects/:id
        </CardTitle>
        <CardDescription>Update an existing project</CardDescription>
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
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm">
                  Project found: {project.name}
                </p>
                <Button onClick={handleLoadProject} size="sm" variant="outline">
                  Load into Form
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Update Form */}
        <div>
          <h4 className="mb-2 font-medium">Step 2: Update Project</h4>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="update-id">Project ID *</Label>
              <Input
                id="update-id"
                {...register("id")}
                placeholder="Project ID"
                readOnly
              />
              {errors.id && (
                <p className="text-red-500 text-sm">{errors.id.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="update-name">Project Name *</Label>
              <Input
                id="update-name"
                {...register("name")}
                placeholder="Enter project name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="update-description">Description</Label>
              <Input
                id="update-description"
                {...register("description")}
                placeholder="Enter project description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="update-startDate">Start Date</Label>
              <Input
                id="update-startDate"
                type="date"
                {...register("startDate")}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="update-endDate">End Date</Label>
              <Input id="update-endDate" type="date" {...register("endDate")} />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                disabled={updateProjectMutation.isPending}
                type="submit"
              >
                {updateProjectMutation.isPending
                  ? "Updating..."
                  : "Update Project"}
              </Button>
              <Button onClick={handleReset} type="button" variant="outline">
                Reset
              </Button>
            </div>

            {updateProjectMutation.error && (
              <div className="rounded bg-red-50 p-3 text-red-800">
                Error: {updateProjectMutation.error.message}
              </div>
            )}

            {updateProjectMutation.data && (
              <div className="rounded bg-green-50 p-3 text-green-800">
                <h4 className="font-medium">Project Updated Successfully!</h4>
                <pre className="mt-2 overflow-auto text-sm">
                  {JSON.stringify(updateProjectMutation.data, null, 2)}
                </pre>
              </div>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
