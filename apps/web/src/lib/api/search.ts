import { API_CONFIG } from "@/lib/constants/api";
import type {
  SearchQuery,
  SearchResponse,
  SuggestionsQuery,
  SuggestionsResponse,
} from "@/lib/types/search";

class ApiError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || `API Error: ${response.statusText}`,
      response.status,
      response.statusText
    );
  }
  return await response.json();
}

export const searchApi = {
  async search(params: SearchQuery): Promise<SearchResponse> {
    const searchParams = new URLSearchParams({
      q: params.q,
      type: params.type,
      limit: params.limit.toString(),
      offset: params.offset.toString(),
    });

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEARCH}?${searchParams}`
    );
    return await handleResponse<SearchResponse>(response);
  },

  async getSuggestions(params: SuggestionsQuery): Promise<SuggestionsResponse> {
    const searchParams = new URLSearchParams({
      q: params.q,
    });

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEARCH}/suggestions?${searchParams}`
    );
    return await handleResponse<SuggestionsResponse>(response);
  },
};
