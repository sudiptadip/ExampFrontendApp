import { apiClient } from "@/lib/api-client";
import { ApiResponse, JobCategoryDto, CreateJobCategoryDto, UpdateJobCategoryDto } from "@/types/api.types";

export const jobCategoryService = {
  getCategories: async (): Promise<ApiResponse<JobCategoryDto[]>> => {
    const response = await apiClient.get<ApiResponse<JobCategoryDto[]>>("/jobcategories");
    return response.data;
  },

  getCategoryById: async (id: number): Promise<ApiResponse<JobCategoryDto>> => {
    const response = await apiClient.get<ApiResponse<JobCategoryDto>>(`/jobcategories/${id}`);
    return response.data;
  },

  createCategory: async (data: CreateJobCategoryDto): Promise<ApiResponse<JobCategoryDto>> => {
    const response = await apiClient.post<ApiResponse<JobCategoryDto>>("/jobcategories", data);
    return response.data;
  },

  updateCategory: async (id: number, data: UpdateJobCategoryDto): Promise<ApiResponse<JobCategoryDto>> => {
    const response = await apiClient.put<ApiResponse<JobCategoryDto>>(`/jobcategories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/jobcategories/${id}`);
    return response.data;
  },
};
