"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

// API functions
async function searchData(query: string, type = "all", limit = 20, offset = 0) {
  const params = new URLSearchParams({
    q: query,
    type,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const response = await fetch(`${SERVER_URL}/search?${params}`);
  if (!response.ok) {
    throw new Error("Failed to search");
  }
  return response.json();
}

async function getSuggestions(query: string) {
  const response = await fetch(
    `${SERVER_URL}/search/suggestions?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to get suggestions");
  }
  return response.json();
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Search query
  const {
    data: searchResults,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["search", searchQuery, searchType],
    queryFn: () => searchData(searchQuery, searchType),
    enabled: searchQuery.length >= 2,
  });

  // Suggestions query
  const { data: suggestions, isLoading: suggestionsLoading } = useQuery({
    queryKey: ["suggestions", searchQuery],
    queryFn: () => getSuggestions(searchQuery),
    enabled: searchQuery.length >= 2 && showSuggestions,
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      refetch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">← Back</Button>
        </Link>
        <h1 className="font-bold text-2xl">Search API</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Search Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
                GET
              </span>
              /search
            </CardTitle>
            <CardDescription>
              Search across projects, tasks, users, and teams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="searchQuery">Search Query *</Label>
                <div className="relative">
                  <Input
                    id="searchQuery"
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 200)
                    }
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Enter search query..."
                    value={searchQuery}
                  />
                  {showSuggestions &&
                    suggestions &&
                    suggestions.suggestions.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg dark:bg-black">
                        {suggestions.suggestions.map(
                          (suggestion: string, index: number) => (
                            <button
                              className="w-full px-4 py-2 text-left hover:bg-gray-100"
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </button>
                          )
                        )}
                      </div>
                    )}
                </div>
              </div>

              <div>
                <Label htmlFor="searchType">Search Type</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="searchType"
                  onChange={(e) => setSearchType(e.target.value)}
                  value={searchType}
                >
                  <option value="all">All</option>
                  <option value="projects">Projects</option>
                  <option value="tasks">Tasks</option>
                  <option value="users">Users</option>
                  <option value="teams">Teams</option>
                </select>
              </div>

              <Button
                className="w-full"
                disabled={isLoading || searchQuery.length < 2}
                onClick={handleSearch}
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>

              {error && (
                <div className="rounded bg-red-50 p-3 text-red-800">
                  Error: {error.message}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              {searchResults && `Found ${searchResults.results.total} results`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {searchResults && (
              <div className="space-y-4">
                {/* Projects Results */}
                {searchResults.results.projects &&
                  searchResults.results.projects.length > 0 && (
                    <div>
                      <h4 className="font-medium text-lg">
                        Projects ({searchResults.results.projects.length})
                      </h4>
                      <div className="mt-2 space-y-2">
                        {searchResults.results.projects.map((project: any) => (
                          <div className="rounded border p-3" key={project.id}>
                            <h5 className="font-medium">{project.name}</h5>
                            {project.description && (
                              <p className="text-muted-foreground text-sm">
                                {project.description}
                              </p>
                            )}
                            <p className="text-muted-foreground text-xs">
                              Tasks: {project.tasks?.length || 0}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Tasks Results */}
                {searchResults.results.tasks &&
                  searchResults.results.tasks.length > 0 && (
                    <div>
                      <h4 className="font-medium text-lg">
                        Tasks ({searchResults.results.tasks.length})
                      </h4>
                      <div className="mt-2 space-y-2">
                        {searchResults.results.tasks.map((task: any) => (
                          <div className="rounded border p-3" key={task.id}>
                            <h5 className="font-medium">{task.title}</h5>
                            {task.description && (
                              <p className="text-muted-foreground text-sm">
                                {task.description}
                              </p>
                            )}
                            <div className="mt-1 flex gap-2 text-muted-foreground text-xs">
                              <span>Project: {task.project?.name}</span>
                              <span>Author: {task.author?.username}</span>
                              {task.assignee && (
                                <span>Assignee: {task.assignee.username}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Users Results */}
                {searchResults.results.users &&
                  searchResults.results.users.length > 0 && (
                    <div>
                      <h4 className="font-medium text-lg">
                        Users ({searchResults.results.users.length})
                      </h4>
                      <div className="mt-2 space-y-2">
                        {searchResults.results.users.map((user: any) => (
                          <div className="rounded border p-3" key={user.userId}>
                            <h5 className="font-medium">{user.username}</h5>
                            <p className="text-muted-foreground text-sm">
                              ID: {user.cognitoId}
                            </p>
                            {user.team && (
                              <p className="text-muted-foreground text-xs">
                                Team: {user.team.teamName}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Teams Results */}
                {searchResults.results.teams &&
                  searchResults.results.teams.length > 0 && (
                    <div>
                      <h4 className="font-medium text-lg">
                        Teams ({searchResults.results.teams.length})
                      </h4>
                      <div className="mt-2 space-y-2">
                        {searchResults.results.teams.map((team: any) => (
                          <div className="rounded border p-3" key={team.id}>
                            <h5 className="font-medium">{team.teamName}</h5>
                            <p className="text-muted-foreground text-xs">
                              Members: {team.user?.length || 0} | Projects:{" "}
                              {team.projectTeams?.length || 0}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {searchResults.results.total === 0 && (
                  <div className="text-center text-muted-foreground">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}

            {!(searchResults || isLoading) && (
              <div className="text-center text-muted-foreground">
                Enter a search query to get started
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Available Methods Info */}
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
              <span>/search</span>
              <span className="text-muted-foreground text-sm">
                - Search across all entities
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded bg-green-100 px-2 py-1 font-mono text-green-800 text-xs">
                GET
              </span>
              <span>/search/suggestions</span>
              <span className="text-muted-foreground text-sm">
                - Get search suggestions
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
