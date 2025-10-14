import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectPageProps = {
  params: {
    id: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const projectId = params.id;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/projects">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
              type="button"
            >
              ←
            </button>
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🚀</span>
            <h2 className="font-bold text-3xl tracking-tight">Project Alpha</h2>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`/dashboard/projects/${projectId}/edit`}>
            <button
              className="h-10 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
              type="button"
            >
              Edit Project
            </button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Tasks</CardTitle>
            <span className="text-2xl">📋</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">24</div>
            <p className="text-muted-foreground text-xs">+3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Completed</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">18</div>
            <p className="text-muted-foreground text-xs">75% complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Team Members</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">8</div>
            <p className="text-muted-foreground text-xs">Active contributors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Progress</CardTitle>
            <span className="text-2xl">📈</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">87%</div>
            <p className="text-muted-foreground text-xs">On track</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Project information and timeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-sm">Description</p>
              <p className="text-muted-foreground">
                Frontend application development with modern React stack and
                TypeScript.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-sm">Start Date</p>
                <p className="text-muted-foreground">January 15, 2024</p>
              </div>
              <div>
                <p className="font-medium text-sm">Due Date</p>
                <p className="text-muted-foreground">June 30, 2024</p>
              </div>
              <div>
                <p className="font-medium text-sm">Status</p>
                <span className="rounded bg-green-100 px-2 py-1 text-green-800 text-sm">
                  Active
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">Priority</p>
                <span className="rounded bg-yellow-100 px-2 py-1 text-sm text-yellow-800">
                  High
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Teams</CardTitle>
            <CardDescription>Teams assigned to this project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/teams/1">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🚀</span>
                  <div>
                    <p className="font-medium">Team Alpha</p>
                    <p className="text-muted-foreground text-sm">
                      Frontend Development
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground text-sm">8 members</span>
              </div>
            </Link>

            <Link href="/dashboard/teams/2">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🎨</span>
                  <div>
                    <p className="font-medium">Team Beta</p>
                    <p className="text-muted-foreground text-sm">
                      UI/UX Design
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground text-sm">5 members</span>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
          <CardDescription>
            Latest task activity in this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Link href="/dashboard/tasks/1">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🔐</span>
                  <div>
                    <p className="font-medium">Implement user authentication</p>
                    <p className="text-muted-foreground text-sm">
                      Assigned to John Doe • High Priority
                    </p>
                  </div>
                </div>
                <span className="rounded bg-yellow-100 px-2 py-1 text-sm text-yellow-800">
                  In Progress
                </span>
              </div>
            </Link>

            <Link href="/dashboard/tasks/2">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🎨</span>
                  <div>
                    <p className="font-medium">Design landing page</p>
                    <p className="text-muted-foreground text-sm">
                      Assigned to Sarah Wilson • Medium Priority
                    </p>
                  </div>
                </div>
                <span className="rounded bg-green-100 px-2 py-1 text-green-800 text-sm">
                  Completed
                </span>
              </div>
            </Link>

            <Link href="/dashboard/tasks/3">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📝</span>
                  <div>
                    <p className="font-medium">Write API documentation</p>
                    <p className="text-muted-foreground text-sm">
                      Assigned to Mike Chen • Low Priority
                    </p>
                  </div>
                </div>
                <span className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-sm">
                  Todo
                </span>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
