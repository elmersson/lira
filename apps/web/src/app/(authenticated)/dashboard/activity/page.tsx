import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ActivityPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">Activity Feed</h2>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-sm">👤</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">
                    John Doe assigned a new task
                  </p>
                  <p className="text-muted-foreground text-sm">
                    "Implement user authentication" in Project Alpha
                  </p>
                  <p className="text-muted-foreground text-xs">2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <span className="text-sm">✅</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">
                    Task completed by Sarah Wilson
                  </p>
                  <p className="text-muted-foreground text-sm">
                    "Design landing page wireframes" marked as done
                  </p>
                  <p className="text-muted-foreground text-xs">
                    15 minutes ago
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-sm">💬</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">New comment added</p>
                  <p className="text-muted-foreground text-sm">
                    Mike Chen commented on "API Integration" task
                  </p>
                  <p className="text-muted-foreground text-xs">1 hour ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                  <span className="text-sm">📎</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">
                    File attachment uploaded
                  </p>
                  <p className="text-muted-foreground text-sm">
                    "requirements.pdf" added to Project Beta
                  </p>
                  <p className="text-muted-foreground text-xs">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <span className="text-sm">⚠️</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">Deadline approaching</p>
                  <p className="text-muted-foreground text-sm">
                    "Design Review" is due tomorrow
                  </p>
                  <p className="text-muted-foreground text-xs">3 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                  <span className="text-sm">🎯</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">
                    Project milestone reached
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Project Alpha completed 50% of planned tasks
                  </p>
                  <p className="text-muted-foreground text-xs">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Activity</CardTitle>
            <CardDescription>
              What your team has been working on
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-medium text-sm text-white">
                    JD
                  </div>
                  <div>
                    <p className="font-medium text-sm">John Doe</p>
                    <p className="text-muted-foreground text-xs">
                      Created 3 new tasks
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground text-xs">Today</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-medium text-sm text-white">
                    SW
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sarah Wilson</p>
                    <p className="text-muted-foreground text-xs">
                      Completed 2 tasks
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground text-xs">Today</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 font-medium text-sm text-white">
                    MC
                  </div>
                  <div>
                    <p className="font-medium text-sm">Mike Chen</p>
                    <p className="text-muted-foreground text-xs">
                      Added 5 comments
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground text-xs">Yesterday</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
