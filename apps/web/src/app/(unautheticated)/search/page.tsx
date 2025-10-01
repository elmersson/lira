"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchApiMethods } from "@/components/search/search-api-methods";
import { SearchCard } from "@/components/search/search-card";
import { SearchResultsCard } from "@/components/search/search-results-card";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/api/use-search";
import type { SearchType } from "@/lib/types/search";

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("all");
  const [shouldSearch, setShouldSearch] = useState(false);

  const {
    data: searchResults,
    isLoading,
    error,
    refetch,
  } = useSearch(
    {
      q: searchQuery,
      type: searchType,
      limit: DEFAULT_LIMIT,
      offset: DEFAULT_OFFSET,
    },
    shouldSearch && searchQuery.length >= 2
  );

  const handleSearch = (query: string, type: SearchType) => {
    setSearchQuery(query);
    setSearchType(type);
    setShouldSearch(true);

    // Trigger refetch if query is already set
    if (shouldSearch) {
      refetch();
    }
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
        <SearchCard
          error={error}
          isLoading={isLoading}
          onSearch={handleSearch}
        />

        {/* Search Results */}
        <SearchResultsCard
          isLoading={isLoading}
          query={searchQuery}
          results={searchResults?.results || null}
        />
      </div>

      {/* Available Methods Info */}
      <SearchApiMethods />
    </div>
  );
}
