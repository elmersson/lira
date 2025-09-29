import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProject } from "@/hooks/api/use-projects";
import {
  type CreateProjectForm,
  createProjectSchema,
} from "@/lib/types/project";

type ProjectFormProps = {
  onSuccess?: () => void;
};

export function ProjectForm({ onSuccess }: ProjectFormProps) {
  const createProjectMutation = useCreateProject();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit = (data: CreateProjectForm) => {
    createProjectMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="name">Project Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter project name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter project description"
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input id="startDate" type="date" {...register("startDate")} />
        {errors.startDate && (
          <p className="text-red-500 text-sm">{errors.startDate.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="endDate">End Date</Label>
        <Input id="endDate" type="date" {...register("endDate")} />
        {errors.endDate && (
          <p className="text-red-500 text-sm">{errors.endDate.message}</p>
        )}
      </div>

      <Button
        className="w-full"
        disabled={createProjectMutation.isPending}
        type="submit"
      >
        {createProjectMutation.isPending ? "Creating..." : "Create Project"}
      </Button>

      {createProjectMutation.error && (
        <div className="rounded bg-red-50 p-3 text-red-800">
          Error: {createProjectMutation.error.message}
        </div>
      )}

      {createProjectMutation.data && (
        <div className="rounded bg-green-50 p-3 text-green-800">
          <h4 className="font-medium">Project Created Successfully!</h4>
          <pre className="mt-2 overflow-auto text-sm">
            {JSON.stringify(createProjectMutation.data, null, 2)}
          </pre>
        </div>
      )}
    </form>
  );
}
