"use client";

import Link from "next/link";
import { CreateTeamCard } from "@/components/teams/create-team-card";
import { DeleteTeamCard } from "@/components/teams/delete-team-card";
import { TeamsList } from "@/components/teams/teams-list";
import { UpdateTeamCard } from "@/components/teams/update-team-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TeamsPage() {
  return (
    <div className="container mx-auto space-y-8 p-8">
      <div>
        <Link className="mb-4 inline-block" href="/">
          <button
            className="rounded border px-3 py-1 hover:bg-gray-50"
            type="button"
          >
            ← Back
          </button>
        </Link>
        <h1 className="mb-2 font-bold text-2xl">Teams API</h1>
        <p className="text-gray-600">
          Test and explore the teams API endpoints with full CRUD operations.
        </p>
      </div>

      {/* Get All Teams */}
      <TeamsList />

      {/* Create Team */}
      <CreateTeamCard />

      {/* Update Team */}
      <UpdateTeamCard />

      {/* Delete Team */}
      <DeleteTeamCard />

      {/* API Methods Info */}
      <Card>
        <CardHeader>
          <CardTitle>Available HTTP Methods</CardTitle>
          <CardDescription>
            This endpoint supports the following operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
                GET
              </span>
              <span>/teams</span>
              <span className="text-muted-foreground text-sm">
                - Retrieve all teams
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-800 text-xs">
                POST
              </span>
              <span>/teams</span>
              <span className="text-muted-foreground text-sm">
                - Create a new team
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-xs text-yellow-800">
                PUT
              </span>
              <span>/teams/:id</span>
              <span className="text-muted-foreground text-sm">
                - Update an existing team
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-red-100 px-2 py-1 font-mono text-red-800 text-xs">
                DELETE
              </span>
              <span>/teams/:id</span>
              <span className="text-muted-foreground text-sm">
                - Delete a team
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
