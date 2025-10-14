import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TeamsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">Teams Management</h2>
        <button className="h-10 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90">
          Create Team
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Teams</CardTitle>
            <span className="text-2xl">🏢</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">8</div>
            <p className="text-muted-foreground text-xs">Active teams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Average Team Size
            </CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">6</div>
            <p className="text-muted-foreground text-xs">Members per team</p>
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
            <div className="font-bold text-2xl">12</div>
            <p className="text-muted-foreground text-xs">Across all teams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Team Efficiency
            </CardTitle>
            <span className="text-2xl">📈</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">92%</div>
            <p className="text-muted-foreground text-xs">
              Average completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
            <CardDescription>Manage teams and assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <p className="font-medium">Team Alpha</p>
                    <p className="text-muted-foreground text-sm">
                      Frontend Development
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">8 members</p>
                  <p className="text-muted-foreground text-xs">
                    3 active projects
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="font-medium">Team Beta</p>
                    <p className="text-muted-foreground text-sm">
                      UI/UX Design
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">5 members</p>
                  <p className="text-muted-foreground text-xs">
                    2 active projects
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <p className="font-medium">Team Gamma</p>
                    <p className="text-muted-foreground text-sm">
                      Backend Engineering
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">7 members</p>
                  <p className="text-muted-foreground text-xs">
                    4 active projects
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Roles</CardTitle>
            <CardDescription>
              Product owners and project managers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">Product Owners</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded bg-muted p-2">
                    <span className="text-sm">John Doe</span>
                    <span className="text-muted-foreground text-xs">
                      Team Alpha
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-muted p-2">
                    <span className="text-sm">Sarah Wilson</span>
                    <span className="text-muted-foreground text-xs">
                      Team Beta
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Project Managers</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded bg-muted p-2">
                    <span className="text-sm">Mike Chen</span>
                    <span className="text-muted-foreground text-xs">
                      Team Gamma
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-muted p-2">
                    <span className="text-sm">Lisa Park</span>
                    <span className="text-muted-foreground text-xs">
                      Team Delta
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
