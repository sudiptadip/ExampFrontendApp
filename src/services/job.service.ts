import { apiClient } from "@/lib/api-client";
import { ApiResponse, JobPostingDto, CreateJobPostingDto, PagedResult } from "@/types/api.types";

export const jobService = {
  getJobs: async (params?: { searchTerm?: string; page?: number; pageNumber?: number; pageSize?: number; jobCategoryId?: number }): Promise<ApiResponse<PagedResult<JobPostingDto>>> => {
    const response = await apiClient.get<ApiResponse<PagedResult<JobPostingDto>>>("/jobpostings", { params });
    return response.data;
  },

  getJobById: async (id: number): Promise<ApiResponse<JobPostingDto>> => {
    const response = await apiClient.get<ApiResponse<JobPostingDto>>(`/jobpostings/${id}`);
    return response.data;
  },

  createJob: async (data: CreateJobPostingDto): Promise<ApiResponse<JobPostingDto>> => {
    const response = await apiClient.post<ApiResponse<JobPostingDto>>("/jobpostings", data);
    return response.data;
  },

  deleteJob: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/jobpostings/${id}`);
    return response.data;
  },
};
