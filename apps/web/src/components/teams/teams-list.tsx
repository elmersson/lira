import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTeams } from "@/hooks/api/use-teams";
import { QUERY_KEYS } from "@/lib/constants/api";

export function TeamsList() {
  const queryClient = useQueryClient();
  const { data: teams, isLoading, error } = useTeams();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TEAMS });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
            GET
          </span>
          /teams
        </CardTitle>
        <CardDescription>Retrieve all teams from the database</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" disabled={isLoading} onClick={handleRefresh}>
          {isLoading ? "Loading..." : "Fetch Teams"}
        </Button>

        {error && (
          <div className="mt-4 rounded bg-red-50 p-3 text-red-800">
            Error: {error.message}
          </div>
        )}

        {teams && (
          <div className="mt-4">
            <h4 className="font-medium">Response:</h4>
            <pre className="mt-2 max-h-60 overflow-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
              {JSON.stringify(teams, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
