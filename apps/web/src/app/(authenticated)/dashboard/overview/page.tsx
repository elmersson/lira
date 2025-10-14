import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OverviewPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">Overview</h2>
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
            <p className="text-muted-foreground text-xs">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Active Tasks</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">24</div>
            <p className="text-muted-foreground text-xs">+5 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Team Members</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">8</div>
            <p className="text-muted-foreground text-xs">+1 new member</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Completion Rate
            </CardTitle>
            <span className="text-2xl">📈</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">87%</div>
            <p className="text-muted-foreground text-xs">+3% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-2 w-2 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="font-medium text-sm leading-none">
                    New task assigned in Project Alpha
                  </p>
                  <p className="text-muted-foreground text-sm">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex h-2 w-2 rounded-full bg-green-500" />
                <div className="space-y-1">
                  <p className="font-medium text-sm leading-none">
                    Task completed in Project Beta
                  </p>
                  <p className="text-muted-foreground text-sm">
                    15 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex h-2 w-2 rounded-full bg-orange-500" />
                <div className="space-y-1">
                  <p className="font-medium text-sm leading-none">
                    New comment added
                  </p>
                  <p className="text-muted-foreground text-sm">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-sm">Design Review</p>
                  <p className="text-muted-foreground text-sm">Due tomorrow</p>
                </div>
                <span className="text-red-500 text-sm">High</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-sm">API Integration</p>
                  <p className="text-muted-foreground text-sm">Due in 3 days</p>
                </div>
                <span className="text-sm text-yellow-500">Medium</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-sm">Documentation Update</p>
                  <p className="text-muted-foreground text-sm">Due next week</p>
                </div>
                <span className="text-blue-500 text-sm">Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
