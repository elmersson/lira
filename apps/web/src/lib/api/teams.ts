import { API_CONFIG } from "@/lib/constants/api";
import type { CreateTeamForm, Team, UpdateTeamForm } from "@/lib/types/team";

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

export const teamApi = {
  async getAll(): Promise<Team[]> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEAMS}`
    );
    const data = await handleResponse<{ data: Team[] }>(response);
    return data.data;
  },

  async create(data: CreateTeamForm): Promise<Team> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEAMS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await handleResponse<{ data: Team }>(response);
    return result.data;
  },

  async getById(id: number): Promise<Team> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEAMS}/${id}`
    );
    const data = await handleResponse<{ data: Team }>(response);
    return data.data;
  },

  async update(id: number, data: UpdateTeamForm): Promise<Team> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEAMS}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await handleResponse<{ data: Team }>(response);
    return result.data;
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEAMS}/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `Failed to delete team: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }
  },
};
