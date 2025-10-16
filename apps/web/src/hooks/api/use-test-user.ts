import { useQuery } from "@tanstack/react-query";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

type User = {
  userId: number;
  cognitoId: string;
  username: string;
  emoji?: string;
  profilePictureUrl?: string;
  teamId?: number;
};

const userApi = {
  getTestUser: async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/test-user`);
    if (!response.ok) {
      throw new Error("Failed to fetch test user");
    }
    return response.json();
  },
};

export const useTestUser = () => {
  return useQuery({
    queryKey: ["test-user"],
    queryFn: userApi.getTestUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
