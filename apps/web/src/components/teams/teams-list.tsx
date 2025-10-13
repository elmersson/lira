import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTeams } from "@/hooks/api/use-teams";
import type { Team } from "@/lib/types/team";

type TeamsListProps = {
  className?: string;
};

export function TeamsList({ className }: TeamsListProps) {
  const { data: teamsResponse, isLoading, error } = useTeams();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-destructive">Failed to load teams</p>
        <p className="text-muted-foreground text-sm">{error.message}</p>
      </div>
    );
  }

  const teams = teamsResponse || [];

  if (teams.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No teams found</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Teams ({teams.length})</h2>
        <Badge variant="outline">{teams.length} total</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team: Team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}

function TeamCard({ team }: { team: Team }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {team.emoji && <span className="text-lg">{team.emoji}</span>}
          {team.teamName}
        </CardTitle>
        <CardDescription className="text-sm">ID: {team.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        {team.productOwnerUserId && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Product Owner:</span>
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              #{team.productOwnerUserId}
            </code>
          </div>
        )}

        {team.projectManagerUserId && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Project Manager:</span>
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              #{team.projectManagerUserId}
            </code>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Created:</span>
          <span className="text-xs">
            {new Date(team.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
