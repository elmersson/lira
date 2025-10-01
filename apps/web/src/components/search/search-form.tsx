import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEARCH_TYPES, type SearchType } from "@/lib/types/search";

const searchFormSchema = z.object({
  query: z.string().min(2, "Search query must be at least 2 characters"),
  type: z.enum(["all", "projects", "tasks", "users", "teams"]),
});

type SearchFormData = z.infer<typeof searchFormSchema>;

type SearchFormProps = {
  onSearch: (query: string, type: SearchType) => void;
  isLoading?: boolean;
  initialValues?: {
    query?: string;
    type?: SearchType;
  };
};

export function SearchForm({
  onSearch,
  isLoading = false,
  initialValues,
}: SearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: initialValues?.query || "",
      type: initialValues?.type || "all",
    },
  });

  const watchedQuery = watch("query");

  const onSubmit = (data: SearchFormData) => {
    onSearch(data.query, data.type);
  };

  const isDisabled = isLoading || watchedQuery.length < 2;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="query">Search Query *</Label>
        <Input
          id="query"
          placeholder="Enter search query..."
          {...register("query")}
        />
        {errors.query && (
          <p className="mt-1 text-red-600 text-sm">{errors.query.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="type">Search Type</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="type"
          {...register("type")}
        >
          {SEARCH_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="mt-1 text-red-600 text-sm">{errors.type.message}</p>
        )}
      </div>

      <Button className="w-full" disabled={isDisabled} type="submit">
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}
