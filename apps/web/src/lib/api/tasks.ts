import { API_CONFIG } from "@/lib/constants/api";
import type { CreateTaskForm, Task, UpdateTaskForm } from "@/lib/types/task";

export type TasksResponse = {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
};

class TaskApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "TaskApiError";
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

  throw new TaskApiError(errorMessage, response.status);
};

export const taskApi = {
  async getAll(page = 1, limit = 10): Promise<TasksResponse> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS}?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async create(task: CreateTaskForm): Promise<Task> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async getById(id: number): Promise<Task> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS}/${id}`
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async update(id: number, task: UpdateTaskForm): Promise<Task> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async delete(id: number): Promise<{ message: string }> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS}/${id}`,
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
