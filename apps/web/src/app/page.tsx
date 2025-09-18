"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ██║       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

async function checkServerStatus() {
  try {
    const response = await fetch(`${SERVER_URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return { status: "online", message: "Server is running" };
    }
    return { status: "offline", message: "Server returned error" };
  } catch {
    return { status: "offline", message: "Server is not reachable" };
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

export default function Home() {
  const {
    data: serverStatus,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["server-status"],
    queryFn: checkServerStatus,
    refetchInterval: 5000, // Refetch every 5 seconds
    retry: 1,
  });

  const isOnline = serverStatus?.status === "online";

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <h2 className="font-medium">API Status</h2>
            <div className="flex items-center gap-2">
              <StatusDot isLoading={isLoading} isOnline={isOnline} />
              <span className="text-muted-foreground text-sm">
                <StatusText isLoading={isLoading} isOnline={isOnline} />
              </span>
            </div>
          </div>
          {serverStatus && (
            <p className="mt-1 text-muted-foreground text-xs">
              {serverStatus.message}
            </p>
          )}
          {error && (
            <p className="mt-1 text-red-500 text-xs">
              Failed to check server status
            </p>
          )}
        </section>
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
