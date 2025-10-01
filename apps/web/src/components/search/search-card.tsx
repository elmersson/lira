import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SEARCH_TYPES, type SearchType } from "@/lib/types/search";
import { SearchWithSuggestions } from "./search-with-suggestions";

type SearchCardProps = {
  onSearch: (query: string, type: SearchType) => void;
  isLoading?: boolean;
  error?: Error | null;
};

export function SearchCard({
  onSearch,
  isLoading = false,
  error,
}: SearchCardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("all");

  const handleSearch = () => {
    if (searchQuery.trim() && searchQuery.length >= 2) {
      onSearch(searchQuery, searchType);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const isDisabled = isLoading || searchQuery.length < 2;

  return (
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
          <SearchWithSuggestions
            label="Search Query *"
            onChange={setSearchQuery}
            onSuggestionSelect={handleSuggestionSelect}
            placeholder="Enter search query..."
            value={searchQuery}
          />

          <div>
            <Label htmlFor="searchType">Search Type</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="searchType"
              onChange={(e) => setSearchType(e.target.value as SearchType)}
              value={searchType}
            >
              {SEARCH_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            className="w-full"
            disabled={isDisabled}
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
  );
}
