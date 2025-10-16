import Link from "next/link";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col space-y-4">
      <nav className="flex flex-wrap gap-4 border-b pb-4">
        <Link
          className="font-medium text-sm transition-colors hover:text-primary"
          href="/dashboard"
        >
          Home
        </Link>
        <Link
          className="font-medium text-sm transition-colors hover:text-primary"
          href="/dashboard/overview"
        >
          Overview
        </Link>
        <Link
          className="font-medium text-sm transition-colors hover:text-primary"
          href="/dashboard/analytics"
        >
          Analytics
        </Link>
        <Link
          className="font-medium text-sm transition-colors hover:text-primary"
          href="/dashboard/reports"
        >
          Reports
        </Link>
        <Link
          className="font-medium text-sm transition-colors hover:text-primary"
          href="/dashboard/activity"
        >
          Activity
        </Link>
        <Link
          className="font-medium text-sm transition-colors hover:text-primary"
          href="/dashboard/users"
        >
          Users
        </Link>
        <Link
          className="font-medium text-sm transition-colors hover:text-primary"
          href="/dashboard/teams"
        >
          Teams
        </Link>
        <Link
          className="font-medium text-sm transition-colors hover:text-primary"
          href="/dashboard/projects"
        >
          Projects
        </Link>
        <Link
          className="font-medium text-sm transition-colors hover:text-primary"
          href="/dashboard/tasks"
        >
          Tasks
        </Link>
        <Link
          className="font-medium text-sm transition-colors hover:text-primary"
          href="/dashboard/favorites"
        >
          Favorites
        </Link>
      </nav>
      {children}
    </div>
  );
}
