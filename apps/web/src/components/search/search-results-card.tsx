import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SearchResults } from "@/lib/types/search";
import { SearchResultsDisplay } from "./search-results-display";

type SearchResultsCardProps = {
  results: SearchResults | null;
  query: string;
  isLoading: boolean;
};

export function SearchResultsCard({
  results,
  query,
  isLoading,
}: SearchResultsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Results</CardTitle>
        <CardDescription>
          {results && `Found ${results.total} results`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {results && <SearchResultsDisplay query={query} results={results} />}

        {!(results || isLoading) && (
          <div className="text-center text-muted-foreground">
            Enter a search query to get started
          </div>
        )}

        {isLoading && (
          <div className="text-center text-muted-foreground">Searching...</div>
        )}
      </CardContent>
    </Card>
  );
}
