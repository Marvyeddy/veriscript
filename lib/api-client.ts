const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export class APIError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
    this.name = "APIError";
  }
}

export async function apiClient(
  endpoint: string,
  options: RequestOptions = {}
) {
  const { params, ...fetchOptions } = options;

  // Build URL with query parameters
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  // Set default headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  // Add auth token if available
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url.toString(), {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: `HTTP ${response.status}` };
    }

    throw new APIError(
      response.status,
      errorData.code || "UNKNOWN_ERROR",
      // Prefer "message" but fall back to "error" to support our API shape
      errorData.message || errorData.error || `API Error: ${response.status}`
    );
  }

  return response.json();
}
