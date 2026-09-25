import { apiClient } from "@/lib/api-client";
import {
  ApiResponse,
  CouponValidationDto,
  PaymentResponseDto,
  PricingPlanDto,
  RazorpayOrderResponseDto,
  VerifyRazorpayPaymentDto,
  UserAccessStatusDto,
  AdminCreatePlanDto,
} from "@/types/api.types";

export const paymentService = {
  getPlans: async (): Promise<ApiResponse<PricingPlanDto[]>> => {
    const response = await apiClient.get<ApiResponse<PricingPlanDto[]>>("/payments/plans");
    return response.data;
  },

  validateCoupon: async (code: string, orderAmount: number): Promise<ApiResponse<CouponValidationDto>> => {
    const response = await apiClient.get<ApiResponse<CouponValidationDto>>("/payments/validate-coupon", {
      params: { code, orderAmount },
    });
    return response.data;
  },

  purchasePlan: async (pricingPlanId: number, couponCode?: string, paymentMethod = "CreditCard"): Promise<ApiResponse<PaymentResponseDto>> => {
    const response = await apiClient.post<ApiResponse<PaymentResponseDto>>("/payments/purchase", {
      pricingPlanId,
      couponCode,
      paymentMethod,
    });
    return response.data;
  },

  createRazorpayOrder: async (pricingPlanId: number, couponCode?: string): Promise<ApiResponse<RazorpayOrderResponseDto>> => {
    const response = await apiClient.post<ApiResponse<RazorpayOrderResponseDto>>("/payments/razorpay/create-order", {
      pricingPlanId,
      couponCode,
    });
    return response.data;
  },

  verifyRazorpayPayment: async (dto: VerifyRazorpayPaymentDto): Promise<ApiResponse<PaymentResponseDto>> => {
    const response = await apiClient.post<ApiResponse<PaymentResponseDto>>("/payments/razorpay/verify-payment", dto);
    return response.data;
  },

  getUserAccessStatus: async (): Promise<ApiResponse<UserAccessStatusDto>> => {
    const response = await apiClient.get<ApiResponse<UserAccessStatusDto>>("/payments/user-access-status");
    return response.data;
  },

  createAdminPlan: async (dto: AdminCreatePlanDto): Promise<ApiResponse<PricingPlanDto>> => {
    const response = await apiClient.post<ApiResponse<PricingPlanDto>>("/payments/admin/plans", dto);
    return response.data;
  },

  updateAdminPlan: async (id: number, dto: AdminCreatePlanDto): Promise<ApiResponse<PricingPlanDto>> => {
    const response = await apiClient.put<ApiResponse<PricingPlanDto>>(`/payments/admin/plans/${id}`, dto);
    return response.data;
  },

  deleteAdminPlan: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/payments/admin/plans/${id}`);
    return response.data;
  },
};
