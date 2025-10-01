import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SearchApiMethods() {
  return (
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
  );
}
