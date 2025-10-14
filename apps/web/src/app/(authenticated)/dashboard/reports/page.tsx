import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">Reports</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Project Summary
            </CardTitle>
            <CardDescription>
              Comprehensive overview of all projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Generate detailed reports on project status, timelines, and
              deliverables.
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              👤 Team Performance
            </CardTitle>
            <CardDescription>
              Individual and team productivity metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Analyze team efficiency, task completion rates, and workload
              distribution.
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⏰ Time Tracking
            </CardTitle>
            <CardDescription>
              Time allocation and productivity analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Track time spent on tasks, projects, and identify bottlenecks.
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📈 Burndown Charts
            </CardTitle>
            <CardDescription>
              Sprint and project progress visualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Visualize work remaining over time and track sprint progress.
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Goal Tracking
            </CardTitle>
            <CardDescription>
              Objective completion and milestone reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Monitor progress towards goals and key performance indicators.
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📋 Custom Reports
            </CardTitle>
            <CardDescription>
              Build your own reports with filters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Create custom reports with specific filters and date ranges.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📄 Recent Reports</CardTitle>
          <CardDescription>Your recently generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <h4 className="font-medium">Q4 Project Summary</h4>
                <p className="text-muted-foreground text-sm">
                  Generated on Oct 10, 2025
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-sm">✓ Ready</span>
                <button className="text-blue-600 text-sm hover:underline">
                  Download
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <h4 className="font-medium">Team Performance - September</h4>
                <p className="text-muted-foreground text-sm">
                  Generated on Oct 1, 2025
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-sm">✓ Ready</span>
                <button className="text-blue-600 text-sm hover:underline">
                  Download
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <h4 className="font-medium">Time Tracking Report</h4>
                <p className="text-muted-foreground text-sm">
                  Generated on Sep 25, 2025
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-sm">✓ Ready</span>
                <button className="text-blue-600 text-sm hover:underline">
                  Download
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
