"use client";
import Link from "next/link";
import { Bar, BarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/overview">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">Overview</CardTitle>
              <span className="text-2xl">📊</span>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Get a quick overview of your projects and tasks
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/analytics">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">Analytics</CardTitle>
              <span className="text-2xl">📈</span>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                View detailed analytics and performance metrics
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/reports">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">Reports</CardTitle>
              <span className="text-2xl">📋</span>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Generate and download various reports
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/activity">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">
                Activity Feed
              </CardTitle>
              <span className="text-2xl">🔔</span>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Stay updated with recent activity and notifications
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/users">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">Users</CardTitle>
              <span className="text-2xl">👥</span>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Manage user accounts and permissions
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/teams">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">Teams</CardTitle>
              <span className="text-2xl">🏢</span>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Organize teams and assign projects
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">Projects</CardTitle>
              <span className="text-2xl">🚀</span>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Create and manage project portfolios
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/tasks">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">Tasks</CardTitle>
              <span className="text-2xl">📋</span>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Track tasks and monitor progress
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your workspace at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Active Projects</span>
                <span className="font-bold text-2xl">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Pending Tasks</span>
                <span className="font-bold text-2xl">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Team Members</span>
                <span className="font-bold text-2xl">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Completed Today</span>
                <span className="font-bold text-2xl text-green-600">7</span>
              </div>
            </div> */}
            <ChartContainer
              className="min-h-[200px] w-full"
              config={chartConfig}
            >
              <BarChart accessibilityLayer data={chartData}>
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted"
                href="/tasks?action=create"
              >
                <span className="text-sm">Create Task</span>
                <span>➕</span>
              </Link>
              <Link
                className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted"
                href="/projects?action=create"
              >
                <span className="text-sm">New Project</span>
                <span>🚀</span>
              </Link>
              <Link
                className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted"
                href="/teams"
              >
                <span className="text-sm">Manage Teams</span>
                <span>👥</span>
              </Link>
              <Link
                className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted"
                href="/settings"
              >
                <span className="text-sm">Settings</span>
                <span>⚙️</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
