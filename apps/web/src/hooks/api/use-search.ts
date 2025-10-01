import { useQuery } from "@tanstack/react-query";
import { searchApi } from "@/lib/api/search";
import { QUERY_KEYS } from "@/lib/constants/api";
import type { SearchQuery, SuggestionsQuery } from "@/lib/types/search";

export function useSearch(params: SearchQuery, enabled = true) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.SEARCH,
      params.q,
      params.type,
      params.limit,
      params.offset,
    ],
    queryFn: () => searchApi.search(params),
    enabled: enabled && params.q.length >= 2,
  });
}

export function useSuggestions(params: SuggestionsQuery, enabled = true) {
  return useQuery({
    queryKey: [...QUERY_KEYS.SUGGESTIONS, params.q],
    queryFn: () => searchApi.getSuggestions(params),
    enabled: enabled && params.q.length >= 2,
  });
}
