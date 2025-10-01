import type {
  SearchProject,
  SearchResults,
  SearchTask,
  SearchTeam,
  SearchUser,
} from "@/lib/types/search";

type SearchResultsDisplayProps = {
  results: SearchResults;
  query: string;
};

export function SearchResultsDisplay({
  results,
  query,
}: SearchResultsDisplayProps) {
  if (results.total === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No results found for "{query}"
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Projects Results */}
      {results.projects && results.projects.length > 0 && (
        <div>
          <h4 className="font-medium text-lg">
            Projects ({results.projects.length})
          </h4>
          <div className="mt-2 space-y-2">
            {results.projects.map((project: SearchProject) => (
              <div className="rounded border p-3" key={project.id}>
                <h5 className="font-medium">{project.name}</h5>
                {project.description && (
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                )}
                <p className="text-muted-foreground text-xs">
                  Tasks: {project.tasks?.length || 0}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tasks Results */}
      {results.tasks && results.tasks.length > 0 && (
        <div>
          <h4 className="font-medium text-lg">
            Tasks ({results.tasks.length})
          </h4>
          <div className="mt-2 space-y-2">
            {results.tasks.map((task: SearchTask) => (
              <div className="rounded border p-3" key={task.id}>
                <h5 className="font-medium">{task.title}</h5>
                {task.description && (
                  <p className="text-muted-foreground text-sm">
                    {task.description}
                  </p>
                )}
                <div className="mt-1 flex gap-2 text-muted-foreground text-xs">
                  <span>Project: {task.project?.name}</span>
                  <span>Author: {task.author?.username}</span>
                  {task.assignee && (
                    <span>Assignee: {task.assignee.username}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Results */}
      {results.users && results.users.length > 0 && (
        <div>
          <h4 className="font-medium text-lg">
            Users ({results.users.length})
          </h4>
          <div className="mt-2 space-y-2">
            {results.users.map((user: SearchUser) => (
              <div className="rounded border p-3" key={user.userId}>
                <h5 className="font-medium">{user.username}</h5>
                <p className="text-muted-foreground text-sm">
                  ID: {user.cognitoId}
                </p>
                {user.team && (
                  <p className="text-muted-foreground text-xs">
                    Team: {user.team.teamName}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teams Results */}
      {results.teams && results.teams.length > 0 && (
        <div>
          <h4 className="font-medium text-lg">
            Teams ({results.teams.length})
          </h4>
          <div className="mt-2 space-y-2">
            {results.teams.map((team: SearchTeam) => (
              <div className="rounded border p-3" key={team.id}>
                <h5 className="font-medium">{team.teamName}</h5>
                <p className="text-muted-foreground text-xs">
                  Members: {team.user?.length || 0} | Projects:{" "}
                  {team.projectTeams?.length || 0}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
