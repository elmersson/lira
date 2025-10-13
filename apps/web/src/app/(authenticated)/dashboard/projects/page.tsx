import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProjectsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">
          Projects Management
        </h2>
        <Link href="/dashboard/projects/new">
          <button
            className="h-10 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
            type="button"
          >
            New Project
          </button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Total Projects
            </CardTitle>
            <span className="text-2xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">12</div>
            <p className="text-muted-foreground text-xs">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Active Projects
            </CardTitle>
            <span className="text-2xl">🚀</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">8</div>
            <p className="text-muted-foreground text-xs">67% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Completed</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">4</div>
            <p className="text-muted-foreground text-xs">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Tasks</CardTitle>
            <span className="text-2xl">📋</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">124</div>
            <p className="text-muted-foreground text-xs">Across all projects</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projects Overview</CardTitle>
          <CardDescription>
            Manage your projects and track progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Link href="/dashboard/projects/1">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <p className="font-medium">Project Alpha</p>
                    <p className="text-muted-foreground text-sm">
                      Frontend application development
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Started: Jan 15, 2024
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="rounded bg-green-100 px-2 py-1 text-green-800 text-sm">
                    Active
                  </span>
                  <p className="mt-1 text-muted-foreground text-xs">
                    24 tasks • 8 members
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/projects/2">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="font-medium">Project Beta</p>
                    <p className="text-muted-foreground text-sm">
                      Design system overhaul
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Started: Feb 10, 2024
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="rounded bg-yellow-100 px-2 py-1 text-sm text-yellow-800">
                    In Progress
                  </span>
                  <p className="mt-1 text-muted-foreground text-xs">
                    16 tasks • 5 members
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/projects/3">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <p className="font-medium">Project Gamma</p>
                    <p className="text-muted-foreground text-sm">
                      Backend API development
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Started: Mar 5, 2024
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-sm">
                    Completed
                  </span>
                  <p className="mt-1 text-muted-foreground text-xs">
                    32 tasks • 7 members
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/projects/4">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="font-medium">Mobile App</p>
                    <p className="text-muted-foreground text-sm">
                      Cross-platform mobile development
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Started: Apr 1, 2024
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="rounded bg-red-100 px-2 py-1 text-red-800 text-sm">
                    Critical
                  </span>
                  <p className="mt-1 text-muted-foreground text-xs">
                    18 tasks • 6 members
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
