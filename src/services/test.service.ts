import { apiClient } from "@/lib/api-client";
import { 
  ApiResponse, 
  PagedResult, 
  TestDto, 
  TestDetailDto, 
  CreateTestDto, 
  UpdateTestDto,
  TestSeriesDto, 
  TestSeriesDetailDto,
  CreateTestSeriesDto,
  UpdateTestSeriesDto
} from "@/types/api.types";

export const testService = {
  getTests: async (params?: { categoryId?: number; isPremium?: boolean; isPublished?: boolean; search?: string; pageNumber?: number; pageSize?: number }): Promise<ApiResponse<PagedResult<TestDto>>> => {
    const response = await apiClient.get<ApiResponse<PagedResult<TestDto>>>("/tests", { params });
    return response.data;
  },

  getTestDetails: async (id: number): Promise<ApiResponse<TestDetailDto>> => {
    const response = await apiClient.get<ApiResponse<TestDetailDto>>(`/tests/${id}`);
    return response.data;
  },

  createTest: async (data: CreateTestDto): Promise<ApiResponse<TestDto>> => {
    const response = await apiClient.post<ApiResponse<TestDto>>("/tests", data);
    return response.data;
  },

  updateTest: async (id: number, data: UpdateTestDto): Promise<ApiResponse<TestDto>> => {
    const response = await apiClient.put<ApiResponse<TestDto>>(`/tests/${id}`, data);
    return response.data;
  },

  togglePublish: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.put<ApiResponse<boolean>>(`/tests/${id}/publish`);
    return response.data;
  },

  deleteTest: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/tests/${id}`);
    return response.data;
  },

  // Test Series Service Methods
  getTestSeries: async (params?: { categoryId?: number; isPublished?: boolean }): Promise<ApiResponse<TestSeriesDto[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<TestSeriesDto[]>>("/testseries", { params });
      return response.data;
    } catch (err: any) {
      if (err.response?.status === 404) {
        const fallback = await apiClient.get<ApiResponse<TestSeriesDto[]>>("/tests/series", { params });
        return fallback.data;
      }
      throw err;
    }
  },

  getTestSeriesDetails: async (id: number): Promise<ApiResponse<TestSeriesDetailDto>> => {
    const response = await apiClient.get<ApiResponse<TestSeriesDetailDto>>(`/testseries/${id}`);
    return response.data;
  },

  createTestSeries: async (data: CreateTestSeriesDto): Promise<ApiResponse<TestSeriesDto>> => {
    try {
      const response = await apiClient.post<ApiResponse<TestSeriesDto>>("/testseries", data);
      return response.data;
    } catch (err: any) {
      if (err.response?.status === 404) {
        const fallback = await apiClient.post<ApiResponse<TestSeriesDto>>("/tests/series", data);
        return fallback.data;
      }
      throw err;
    }
  },

  updateTestSeries: async (id: number, data: UpdateTestSeriesDto): Promise<ApiResponse<TestSeriesDto>> => {
    const response = await apiClient.put<ApiResponse<TestSeriesDto>>(`/testseries/${id}`, data);
    return response.data;
  },

  togglePublishTestSeries: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.put<ApiResponse<boolean>>(`/testseries/${id}/publish`);
    return response.data;
  },

  deleteTestSeries: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/testseries/${id}`);
    return response.data;
  },
};
