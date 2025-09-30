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
import { useTeam, useUpdateTeam } from "@/hooks/api/use-teams";
import { updateTeamSchema } from "@/lib/types/team";

const updateTeamWithIdSchema = z.object({
  id: z.string().min(1, "Team ID is required"),
  ...updateTeamSchema.shape,
});

type UpdateTeamWithIdForm = z.infer<typeof updateTeamWithIdSchema>;

export function UpdateTeamCard() {
  const [teamId, setTeamId] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const parsedTeamId = shouldFetch && teamId ? Number.parseInt(teamId, 10) : 0;

  const {
    data: team,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useTeam(parsedTeamId);

  const updateTeamMutation = useUpdateTeam();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateTeamWithIdForm>({
    resolver: zodResolver(updateTeamWithIdSchema),
  });

  const handleFetchTeam = () => {
    if (teamId.trim()) {
      setShouldFetch(true);
      setValue("id", teamId);
      refetch();
    }
  };

  const handleLoadTeam = () => {
    if (team) {
      setValue("teamName", team.teamName);
      setValue("productOwnerUserId", team.productOwnerUserId || undefined);
      setValue("projectManagerUserId", team.projectManagerUserId || undefined);
    }
  };

  const onSubmit = (data: UpdateTeamWithIdForm) => {
    const { id, ...updateData } = data;
    const parsedId = Number.parseInt(id, 10);

    if (Number.isNaN(parsedId)) {
      return;
    }

    updateTeamMutation.mutate({ id: parsedId, data: updateData });
  };

  const handleReset = () => {
    setTeamId("");
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
          /teams/:id
        </CardTitle>
        <CardDescription>Update an existing team</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Step 1: Fetch Team */}
        <div className="border-b pb-4">
          <h4 className="mb-2 font-medium">Step 1: Fetch Team</h4>
          <div className="flex gap-2">
            <Input
              className="flex-1"
              onChange={(e) => setTeamId(e.target.value)}
              placeholder="Enter team ID"
              type="number"
              value={teamId}
            />
            <Button
              disabled={isFetching || !teamId.trim()}
              onClick={handleFetchTeam}
            >
              {isFetching ? "Loading..." : "Fetch"}
            </Button>
          </div>

          {fetchError && (
            <div className="mt-2 rounded bg-red-50 p-3 text-red-800">
              Error: {fetchError.message}
            </div>
          )}

          {team && shouldFetch && (
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm">
                  Team found: {team.teamName}
                </p>
                <Button onClick={handleLoadTeam} size="sm" variant="outline">
                  Load into Form
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Update Form */}
        <div>
          <h4 className="mb-2 font-medium">Step 2: Update Team</h4>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="update-id">Team ID *</Label>
              <Input
                id="update-id"
                {...register("id")}
                placeholder="Team ID"
                readOnly
                type="number"
              />
              {errors.id && (
                <p className="text-red-500 text-sm">{errors.id.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="update-teamName">Team Name</Label>
              <Input
                id="update-teamName"
                {...register("teamName")}
                placeholder="Enter team name"
              />
              {errors.teamName && (
                <p className="text-red-500 text-sm">
                  {errors.teamName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="update-productOwnerUserId">
                Product Owner User ID
              </Label>
              <Input
                id="update-productOwnerUserId"
                type="number"
                {...register("productOwnerUserId", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" ? undefined : Number(value),
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
              <Label htmlFor="update-projectManagerUserId">
                Project Manager User ID
              </Label>
              <Input
                id="update-projectManagerUserId"
                type="number"
                {...register("projectManagerUserId", {
                  valueAsNumber: true,
                  setValueAs: (value) =>
                    value === "" ? undefined : Number(value),
                })}
                placeholder="Enter project manager user ID"
              />
              {errors.projectManagerUserId && (
                <p className="text-red-500 text-sm">
                  {errors.projectManagerUserId.message}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                disabled={updateTeamMutation.isPending}
                type="submit"
              >
                {updateTeamMutation.isPending ? "Updating..." : "Update Team"}
              </Button>
              <Button onClick={handleReset} type="button" variant="outline">
                Reset
              </Button>
            </div>

            {updateTeamMutation.error && (
              <div className="rounded bg-red-50 p-3 text-red-800">
                Error: {updateTeamMutation.error.message}
              </div>
            )}

            {updateTeamMutation.data && (
              <div className="rounded bg-green-50 p-3 text-green-800">
                <h4 className="font-medium">Team Updated Successfully!</h4>
                <pre className="mt-2 overflow-auto text-sm">
                  {JSON.stringify(updateTeamMutation.data, null, 2)}
                </pre>
              </div>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
