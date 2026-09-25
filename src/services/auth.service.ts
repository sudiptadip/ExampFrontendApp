import { apiClient } from "@/lib/api-client";
import { ApiResponse, AuthResponse, LoginDto, RegisterDto } from "@/types/api.types";

export const authService = {
  login: async (dto: LoginDto): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", dto);
    return response.data;
  },

  register: async (dto: RegisterDto): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>("/auth/register", dto);
    return response.data;
  },

  refreshToken: async (token: string, refreshToken: string): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>("/auth/refresh-token", {
      token,
      refreshToken,
    });
    return response.data;
  },
};
