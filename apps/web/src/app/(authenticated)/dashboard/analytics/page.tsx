import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">Analytics</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>📊 Project Performance</CardTitle>
            <CardDescription>Overall project metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Completed Projects</span>
                <span className="text-green-600 text-sm">8/12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">On Track</span>
                <span className="text-blue-600 text-sm">3/4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Delayed</span>
                <span className="text-red-600 text-sm">1/4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⏱️ Time Tracking</CardTitle>
            <CardDescription>Time spent this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Development</span>
                <span className="text-sm">32h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Meetings</span>
                <span className="text-sm">8h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Planning</span>
                <span className="text-sm">6h</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>👥 Team Productivity</CardTitle>
            <CardDescription>Team performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Tasks Completed</span>
                <span className="text-green-600 text-sm">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Average Velocity</span>
                <span className="text-sm">23 points</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Team Efficiency</span>
                <span className="text-green-600 text-sm">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>📈 Weekly Trends</CardTitle>
            <CardDescription>Task completion over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-muted-foreground text-sm">
                Chart placeholder - integrate with your preferred charting
                library
              </div>
              <div className="flex h-32 items-center justify-center rounded-md bg-muted">
                <span className="text-muted-foreground">
                  Task Completion Chart
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎯 Priority Distribution</CardTitle>
            <CardDescription>Tasks by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm">High Priority</span>
                </div>
                <span className="text-sm">12 tasks</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="text-sm">Medium Priority</span>
                </div>
                <span className="text-sm">18 tasks</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm">Low Priority</span>
                </div>
                <span className="text-sm">8 tasks</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
