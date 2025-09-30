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
import { useDeleteTeam, useTeam } from "@/hooks/api/use-teams";

export function DeleteTeamCard() {
  const [teamId, setTeamId] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const parsedTeamId = shouldFetch && teamId ? Number.parseInt(teamId, 10) : 0;

  const {
    data: team,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useTeam(parsedTeamId);

  const deleteTeamMutation = useDeleteTeam();

  const handleFetchTeam = () => {
    if (teamId.trim()) {
      setShouldFetch(true);
      setConfirmDelete(false);
      refetch();
    }
  };

  const handleDeleteTeam = () => {
    const parsedId = Number.parseInt(teamId, 10);
    if (!Number.isNaN(parsedId)) {
      deleteTeamMutation.mutate(parsedId, {
        onSuccess: () => {
          setTeamId("");
          setShouldFetch(false);
          setConfirmDelete(false);
        },
      });
    }
  };

  const handleReset = () => {
    setTeamId("");
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
          /teams/:id
        </CardTitle>
        <CardDescription>Delete a specific team by ID</CardDescription>
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
            <div className="mt-2 rounded bg-blue-50 p-3 text-blue-800">
              <p className="text-gray-600 text-sm">
                Team found: <strong>{team.teamName}</strong>
              </p>
              <p className="text-gray-500 text-xs">
                ID: {team.id} | Product Owner:{" "}
                {team.productOwnerUserId || "None"} | Project Manager:{" "}
                {team.projectManagerUserId || "None"}
              </p>
            </div>
          )}
        </div>

        {/* Step 2: Confirm and Delete */}
        {team && shouldFetch && (
          <div>
            <h4 className="mb-2 font-medium">Step 2: Confirm Deletion</h4>
            <div className="space-y-3">
              <div className="rounded bg-yellow-50 p-3 text-yellow-800">
                <p className="font-medium">⚠️ Warning</p>
                <p className="text-sm">
                  This action cannot be undone. This will permanently delete the
                  team "{team.teamName}" and all associated data.
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
                  disabled={!confirmDelete || deleteTeamMutation.isPending}
                  onClick={handleDeleteTeam}
                  variant="destructive"
                >
                  {deleteTeamMutation.isPending ? "Deleting..." : "Delete Team"}
                </Button>
                <Button onClick={handleReset} type="button" variant="outline">
                  Cancel
                </Button>
              </div>

              {deleteTeamMutation.error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {deleteTeamMutation.error.message}
                </div>
              )}

              {deleteTeamMutation.isSuccess && (
                <div className="rounded bg-green-50 p-3 text-green-800">
                  <p className="font-medium">Team deleted successfully!</p>
                  <p className="text-sm">
                    The team has been permanently removed.
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
