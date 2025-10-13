import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TasksPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">Tasks Management</h2>
        <Link href="/dashboard/tasks/new">
          <button
            className="h-10 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
            type="button"
          >
            Create Task
          </button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Tasks</CardTitle>
            <span className="text-2xl">📋</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">124</div>
            <p className="text-muted-foreground text-xs">+8 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">In Progress</CardTitle>
            <span className="text-2xl">⚡</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">42</div>
            <p className="text-muted-foreground text-xs">34% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Completed</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">68</div>
            <p className="text-muted-foreground text-xs">55% completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">High Priority</CardTitle>
            <span className="text-2xl">🔥</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">14</div>
            <p className="text-muted-foreground text-xs">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📝</span>
              <span>To Do</span>
            </CardTitle>
            <CardDescription>Tasks waiting to be started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/tasks/1">
              <div className="cursor-pointer rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-start space-x-2">
                  <span className="text-sm">🔐</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      Implement user authentication
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Project Alpha
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="rounded bg-red-100 px-1.5 py-0.5 text-red-800 text-xs">
                        High
                      </span>
                      <span className="text-muted-foreground text-xs">
                        5 points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/tasks/4">
              <div className="cursor-pointer rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-start space-x-2">
                  <span className="text-sm">📝</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      Write API documentation
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Project Alpha
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-blue-800 text-xs">
                        Low
                      </span>
                      <span className="text-muted-foreground text-xs">
                        2 points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>⚡</span>
              <span>In Progress</span>
            </CardTitle>
            <CardDescription>Currently active tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/tasks/2">
              <div className="cursor-pointer rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-start space-x-2">
                  <span className="text-sm">🎨</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Design landing page</p>
                    <p className="text-muted-foreground text-xs">
                      Project Beta
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-sm text-yellow-800">
                        Medium
                      </span>
                      <span className="text-muted-foreground text-xs">
                        3 points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/tasks/5">
              <div className="cursor-pointer rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-start space-x-2">
                  <span className="text-sm">⚙️</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Setup CI/CD pipeline</p>
                    <p className="text-muted-foreground text-xs">
                      Project Gamma
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="rounded bg-red-100 px-1.5 py-0.5 text-red-800 text-xs">
                        High
                      </span>
                      <span className="text-muted-foreground text-xs">
                        8 points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>✅</span>
              <span>Done</span>
            </CardTitle>
            <CardDescription>Completed tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/tasks/3">
              <div className="cursor-pointer rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-start space-x-2">
                  <span className="text-sm">🎯</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      Setup project structure
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Project Alpha
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="rounded bg-green-100 px-1.5 py-0.5 text-green-800 text-xs">
                        Completed
                      </span>
                      <span className="text-muted-foreground text-xs">
                        5 points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/tasks/6">
              <div className="cursor-pointer rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-start space-x-2">
                  <span className="text-sm">📊</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      Database schema design
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Project Gamma
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="rounded bg-green-100 px-1.5 py-0.5 text-green-800 text-xs">
                        Completed
                      </span>
                      <span className="text-muted-foreground text-xs">
                        3 points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
