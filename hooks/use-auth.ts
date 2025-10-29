"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, type APIError } from "@/lib/api-client";

interface User {
  id: string;
  email: string;
  fullName: string;
  userType: "patient" | "doctor" | "pharmacist";
}

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  location: string;
  gender: string;
  userType?: "patient" | "doctor" | "pharmacist";
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const response = await apiClient("/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
      });
      return response;
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
      }
      queryClient.setQueryData(["user"], data.data);
    },
    onError: (error: APIError) => {
      console.error("[v0] Login error:", error.message);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const response = await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify(input),
      });
      return response;
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
      }
      queryClient.setQueryData(["user"], data.data);
    },
    onError: (error: APIError) => {
      console.error("[v0] Register error:", error.message);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return async () => {
    try {
      // Invalidate server cookie
      await apiClient("/auth/logout", { method: "POST" });
    } catch (e) {
      // ignore network errors on logout
    }
    // Clear client state regardless
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    queryClient.clear();
  };
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}
