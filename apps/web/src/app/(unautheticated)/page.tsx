"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

const RETRY_COUNT = 3;

// Define all available endpoints
const ENDPOINTS = [
  { name: "Main", path: "/", displayName: "Server" },
  { name: "Users", path: "/users", displayName: "Users API" },
  { name: "Tasks", path: "/tasks", displayName: "Tasks API" },
  { name: "Projects", path: "/projects", displayName: "Projects API" },
  { name: "Search", path: "/search/health", displayName: "Search API" },
  { name: "Teams", path: "/teams", displayName: "Teams API" },
] as const;

async function checkEndpointStatus(endpoint: string) {
  const startTime = Date.now();
  try {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseTime = Date.now() - startTime;

    if (response.ok) {
      return {
        status: "online" as const,
        message: `Responding in ${responseTime}ms`,
        responseTime,
      };
    }
    return {
      status: "offline" as const,
      message: "Server returned error",
      responseTime,
    };
  } catch {
    const responseTime = Date.now() - startTime;
    return {
      status: "offline" as const,
      message: "Server is not reachable",
      responseTime,
    };
  }
}

function StatusDot({
  isLoading,
  isOnline,
}: {
  isLoading: boolean;
  isOnline: boolean;
}) {
  if (isLoading) {
    return <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />;
  }
  if (isOnline) {
    return <div className="h-2 w-2 rounded-full bg-green-500" />;
  }
  return <div className="h-2 w-2 rounded-full bg-red-500" />;
}

function StatusText({
  isLoading,
  isOnline,
}: {
  isLoading: boolean;
  isOnline: boolean;
}) {
  if (isLoading) {
    return "Checking...";
  }
  if (isOnline) {
    return "Online";
  }
  return "Offline";
}

function EndpointStatus({
  name,
  path,
  displayName,
}: {
  name: string;
  path: string;
  displayName: string;
}) {
  const {
    data: endpointStatus,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`${name.toLowerCase()}-status`],
    queryFn: () => checkEndpointStatus(path),
    retry: RETRY_COUNT,
  });

  const isOnline = endpointStatus?.status === "online";

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <StatusDot isLoading={isLoading} isOnline={isOnline} />
        <u className="font-medium hover:underline" href={path}>
          {displayName}
        </u>
        <a
          className="text-muted-foreground text-xs underline transition-colors hover:text-foreground"
          href={`${SERVER_URL}${path}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {path}
        </a>
      </div>
      <div className="text-right">
        <div className="text-sm">
          <StatusText isLoading={isLoading} isOnline={isOnline} />
        </div>
        {endpointStatus && (
          <div className="text-muted-foreground text-xs">
            {endpointStatus.message}
          </div>
        )}
        {error && <div className="text-red-500 text-xs">Failed to check</div>}
      </div>
    </div>
  );
}

export default function Home() {
  // Get overall system status based on main endpoint
  const { data: mainStatus, isLoading: isMainLoading } = useQuery({
    queryKey: ["main-status"],
    queryFn: () => checkEndpointStatus("/"),
    retry: RETRY_COUNT,
  });

  const isSystemOnline = mainStatus?.status === "online";

  return (
    <div className="container mx-auto flex max-w-4xl flex-col gap-4 px-4 py-2">
      <pre className="overflow-x-auto font-mono text-sm">
        Lira is a project management tool for teams.
      </pre>
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="font-medium">System Status</h2>
            <div className="flex items-center gap-2">
              <StatusDot isLoading={isMainLoading} isOnline={isSystemOnline} />
              <span className="text-muted-foreground text-sm">
                <StatusText
                  isLoading={isMainLoading}
                  isOnline={isSystemOnline}
                />
              </span>
            </div>
          </div>
          <div className="space-y-1">
            {ENDPOINTS.map((endpoint) => (
              <EndpointStatus
                displayName={endpoint.displayName}
                key={endpoint.name}
                name={endpoint.name}
                path={endpoint.path}
              />
            ))}
          </div>
        </section>
        <section className="rounded-lg border p-4">
          <h2 className="mb-4 font-medium">Navigation</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <Link href="/dashboard">
              <Button className="w-full" variant="outline">
                Dashboard
              </Button>
            </Link>
            <Link href="/users">
              <Button className="w-full" variant="outline">
                Users
              </Button>
            </Link>
            <Link href="/tasks">
              <Button className="w-full" variant="outline">
                Tasks
              </Button>
            </Link>
            <Link href="/projects">
              <Button className="w-full" variant="outline">
                Projects
              </Button>
            </Link>
            <Link href="/search">
              <Button className="w-full" variant="outline">
                Search
              </Button>
            </Link>
            <Link href="/teams">
              <Button className="w-full" variant="outline">
                Teams
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
