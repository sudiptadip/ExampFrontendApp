import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5252/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized & Refresh Token Rotation
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        if (token && refreshToken) {
          try {
            const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
              token,
              refreshToken,
            });

            if (data.success && data.data) {
              localStorage.setItem("token", data.data.token);
              localStorage.setItem("refreshToken", data.data.refreshToken);

              originalRequest.headers.Authorization = `Bearer ${data.data.token}`;
              return apiClient(originalRequest);
            }
          } catch (refreshErr) {
            console.error("Token refresh failed:", refreshErr);
          }
        }

        // Clear tokens and redirect to login if refresh fails
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
