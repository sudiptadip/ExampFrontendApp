import { apiClient } from "@/lib/api-client";
import { ApiResponse, PagedResult, QuestionDto } from "@/types/api.types";

export const questionService = {
  getQuestions: async (params?: { categoryId?: number; difficultyLevel?: number; page?: number; pageNumber?: number; pageSize?: number }): Promise<ApiResponse<PagedResult<QuestionDto>>> => {
    const response = await apiClient.get<ApiResponse<PagedResult<QuestionDto>>>("/questions", { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<QuestionDto>> => {
    const response = await apiClient.get<ApiResponse<QuestionDto>>(`/questions/${id}`);
    return response.data;
  },

  createQuestion: async (data: any): Promise<ApiResponse<QuestionDto>> => {
    const response = await apiClient.post<ApiResponse<QuestionDto>>("/questions", data);
    return response.data;
  },

  bulkImportQuestions: async (data: any[]): Promise<ApiResponse<number>> => {
    const response = await apiClient.post<ApiResponse<number>>("/questions/bulk-import", data);
    return response.data;
  },

  deleteQuestion: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/questions/${id}`);
    return response.data;
  },

  updateQuestion: async (id: number, data: any): Promise<ApiResponse<QuestionDto>> => {
    const response = await apiClient.put<ApiResponse<QuestionDto>>(`/questions/${id}`, data);
    return response.data;
  },
};
