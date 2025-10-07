import { API_CONFIG } from "@/lib/constants/api";
import type { CreateUserForm, UpdateUserForm, User } from "@/lib/types/user";

export type UsersResponse = {
  users: User[];
  total: number;
  page: number;
  limit: number;
};

class UserApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "UserApiError";
    this.status = status;
  }
}

const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = `Request failed with status ${response.status}`;

  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
  } catch {
    // If JSON parsing fails, use the default error message
  }

  throw new UserApiError(errorMessage, response.status);
};

export const userApi = {
  async getAll(page = 1, limit = 10): Promise<UsersResponse> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async create(user: CreateUserForm): Promise<User> {
    // Clean data by removing empty strings and undefined values
    const cleanData = Object.fromEntries(
      Object.entries(user).filter(
        ([_, value]) => value !== "" && value !== undefined && value !== null
      )
    );

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanData),
      }
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async getById(id: number): Promise<User> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${id}`
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async update(id: number, user: UpdateUserForm): Promise<User> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async delete(id: number): Promise<{ message: string }> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },
};
