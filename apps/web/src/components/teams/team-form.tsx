import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateTeam } from "@/hooks/api/use-teams";
import { type CreateTeamForm, createTeamSchema } from "@/lib/types/team";

type TeamFormProps = {
  onSuccess?: () => void;
};

export function TeamForm({ onSuccess }: TeamFormProps) {
  const createTeamMutation = useCreateTeam();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTeamForm>({
    resolver: zodResolver(createTeamSchema),
  });

  const onSubmit = (data: CreateTeamForm) => {
    createTeamMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="teamName">Team Name *</Label>
        <Input
          id="teamName"
          {...register("teamName")}
          placeholder="Enter team name"
        />
        {errors.teamName && (
          <p className="text-red-500 text-sm">{errors.teamName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="emoji">Team Emoji</Label>
        <Input
          id="emoji"
          {...register("emoji")}
          maxLength={10}
          placeholder="🚀"
        />
        {errors.emoji && (
          <p className="text-red-500 text-sm">{errors.emoji.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="productOwnerUserId">Product Owner User ID</Label>
        <Input
          id="productOwnerUserId"
          type="number"
          {...register("productOwnerUserId", {
            valueAsNumber: true,
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          placeholder="Enter product owner user ID"
        />
        {errors.productOwnerUserId && (
          <p className="text-red-500 text-sm">
            {errors.productOwnerUserId.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="projectManagerUserId">Project Manager User ID</Label>
        <Input
          id="projectManagerUserId"
          type="number"
          {...register("projectManagerUserId", {
            valueAsNumber: true,
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          placeholder="Enter project manager user ID"
        />
        {errors.projectManagerUserId && (
          <p className="text-red-500 text-sm">
            {errors.projectManagerUserId.message}
          </p>
        )}
      </div>

      <Button
        className="w-full"
        disabled={createTeamMutation.isPending}
        type="submit"
      >
        {createTeamMutation.isPending ? "Creating..." : "Create Team"}
      </Button>

      {createTeamMutation.error && (
        <div className="rounded bg-red-50 p-3 text-red-800">
          Error: {createTeamMutation.error.message}
        </div>
      )}

      {createTeamMutation.data && (
        <div className="rounded bg-green-50 p-3 text-green-800">
          <h4 className="font-medium">Team Created Successfully!</h4>
          <pre className="mt-2 overflow-auto text-sm">
            {JSON.stringify(createTeamMutation.data, null, 2)}
          </pre>
        </div>
      )}
    </form>
  );
}
