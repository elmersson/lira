import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type ApiMethod = {
  method: HttpMethod;
  endpoint: string;
  description: string;
};

const API_METHODS: ApiMethod[] = [
  {
    method: "GET",
    endpoint: "/projects",
    description: "Retrieve all projects",
  },
  {
    method: "POST",
    endpoint: "/projects",
    description: "Create a new project",
  },
  {
    method: "GET",
    endpoint: "/projects/:id",
    description: "Retrieve a specific project",
  },
  {
    method: "PUT",
    endpoint: "/projects/:id",
    description: "Update a specific project",
  },
  {
    method: "DELETE",
    endpoint: "/projects/:id",
    description: "Delete a specific project",
  },
];

const METHOD_STYLES: Record<HttpMethod, string> = {
  GET: "bg-green-100 text-green-800",
  POST: "bg-blue-100 text-blue-800",
  PUT: "bg-yellow-100 text-yellow-800",
  DELETE: "bg-red-100 text-red-800",
  PATCH: "bg-purple-100 text-purple-800",
};

export function ApiMethodsInfo() {
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
          {API_METHODS.map((apiMethod) => (
            <div
              className="flex items-center gap-3"
              key={`${apiMethod.method}-${apiMethod.endpoint}`}
            >
              <span
                className={`rounded px-2 py-1 font-mono text-xs ${
                  METHOD_STYLES[apiMethod.method]
                }`}
              >
                {apiMethod.method}
              </span>
              <span className="font-mono">{apiMethod.endpoint}</span>
              <span className="text-muted-foreground text-sm">
                - {apiMethod.description}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
