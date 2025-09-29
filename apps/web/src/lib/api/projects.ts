import { API_CONFIG } from "@/lib/constants/api";
import type { CreateProjectForm, Project } from "@/lib/types/project";

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
    throw new ApiError(
      `API Error: ${response.statusText}`,
      response.status,
      response.statusText
    );
  }
  return await response.json();
}

export const projectApi = {
  async getAll(): Promise<Project[]> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS}`
    );
    const result = await handleResponse<{ data: Project[] }>(response);
    return result.data;
  },

  async create(data: CreateProjectForm): Promise<Project> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await handleResponse<{ data: Project }>(response);
    return result.data;
  },

  async getById(id: string): Promise<Project> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS}/${id}`
    );
    const result = await handleResponse<{ data: Project }>(response);
    return result.data;
  },

  async update(id: string, data: Partial<CreateProjectForm>): Promise<Project> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await handleResponse<{ data: Project }>(response);
    return result.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS}/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new ApiError(
        `Failed to delete project: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }
  },
};
