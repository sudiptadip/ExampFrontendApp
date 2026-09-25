import { apiClient } from "@/lib/api-client";
import { ApiResponse, CategoryDto, CategoryTreeDto } from "@/types/api.types";

export const categoryService = {
  getAll: async (): Promise<ApiResponse<CategoryDto[]>> => {
    const response = await apiClient.get<ApiResponse<CategoryDto[]>>("/categories");
    return response.data;
  },

  getCategories: async (): Promise<ApiResponse<CategoryDto[]>> => {
    const response = await apiClient.get<ApiResponse<CategoryDto[]>>("/categories");
    return response.data;
  },

  getTree: async (): Promise<ApiResponse<CategoryTreeDto[]>> => {
    const response = await apiClient.get<ApiResponse<CategoryTreeDto[]>>("/categories/tree");
    return response.data;
  },

  getCategoryTree: async (): Promise<ApiResponse<CategoryTreeDto[]>> => {
    const response = await apiClient.get<ApiResponse<CategoryTreeDto[]>>("/categories/tree");
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<CategoryDto>> => {
    const response = await apiClient.get<ApiResponse<CategoryDto>>(`/categories/${id}`);
    return response.data;
  },

  create: async (data: { name: string; description?: string; parentCategoryId?: number }): Promise<ApiResponse<CategoryDto>> => {
    const response = await apiClient.post<ApiResponse<CategoryDto>>("/categories", data);
    return response.data;
  },

  createCategory: async (data: { name: string; description?: string; parentCategoryId?: number }): Promise<ApiResponse<CategoryDto>> => {
    const response = await apiClient.post<ApiResponse<CategoryDto>>("/categories", data);
    return response.data;
  },

  updateCategory: async (id: number, data: { name: string; description?: string; parentCategoryId?: number }): Promise<ApiResponse<CategoryDto>> => {
    const response = await apiClient.put<ApiResponse<CategoryDto>>(`/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/categories/${id}`);
    return response.data;
  },
};
