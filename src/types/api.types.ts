export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse extends User {
  token: string;
  refreshToken: string;
  refreshTokenExpiration: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  description?: string;
  parentCategoryId?: number;
  parentCategoryName?: string;
  createdDate: string;
}

export interface CategoryTreeDto extends CategoryDto {
  subCategories: CategoryTreeDto[];
}

export interface QuestionOptionDto {
  id: number;
  optionLabel: string;
  optionText: string;
  isCorrect: boolean;
  displayOrder: number;
}

export interface QuestionDto {
  id: number;
  questionText: string;
  explanation?: string;
  difficultyLevel?: number;
  options: QuestionOptionDto[];
  categoryIds: number[];
  createdDate: string;
}

export interface TestDto {
  id: number;
  title: string;
  description?: string;
  categoryId?: number;
  categoryName?: string;
  isPublished: boolean;
  isPremium: boolean;
  timeLimitMinutes?: number;
  totalQuestions: number;
  totalMarks: number;
  passingMarks: number;
  createdDate: string;
  seriesIds?: number[];
}

export interface TestDetailDto extends TestDto {
  questions: QuestionDto[];
}

export interface CreateTestDto {
  title: string;
  description?: string;
  categoryId?: number;
  isPremium?: boolean;
  isPublished?: boolean;
  timeLimitMinutes?: number;
  totalMarks?: number;
  passingMarks?: number;
  questionIds?: number[];
  seriesIds?: number[];
}

export interface UpdateTestDto extends CreateTestDto {
  id?: number;
}

export interface TestSeriesDto {
  id: number;
  name: string;
  description?: string;
  categoryId?: number;
  categoryName?: string;
  isPremium: boolean;
  isPublished: boolean;
  totalTests: number;
  createdDate: string;
}

export interface TestSeriesDetailDto extends TestSeriesDto {
  tests: TestDto[];
}

export interface CreateTestSeriesDto {
  name: string;
  description?: string;
  categoryId?: number;
  isPremium?: boolean;
  isPublished?: boolean;
  testIds?: number[];
}

export interface UpdateTestSeriesDto extends CreateTestSeriesDto {
  id?: number;
}

export interface SubmitUserAnswerDto {
  questionId: number;
  selectedOptionId?: number;
  timeSpentSeconds: number;
}

export interface SubmitTestAttemptDto {
  attemptId: number;
  answers: SubmitUserAnswerDto[];
}

export interface SavedUserAnswerDto {
  questionId: number;
  selectedOptionId?: number;
  timeSpentSeconds: number;
}

export interface AttemptResultDto {
  attemptId: number;
  testId: number;
  testTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  skipped: number;
  score: number;
  percentage: number;
  isCompleted: boolean;
  startTime: string;
  endTime?: string;
  timeLimitMinutes?: number;
  remainingSeconds?: number;
  savedAnswers?: SavedUserAnswerDto[];
}

export interface JobCategoryDto {
  id: number;
  name: string;
  description?: string;
  slug?: string;
  isActive: boolean;
  jobCount: number;
  createdDate: string;
}

export interface CreateJobCategoryDto {
  name: string;
  description?: string;
}

export interface UpdateJobCategoryDto {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface JobPostingDto {
  id: number;
  title: string;
  company: string;
  description: string;
  shortDescription?: string;
  contentHtml?: string;
  location?: string;
  postedDate: string;
  expiryDate?: string;
  sourceUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  slug?: string;
  jobCategoryId?: number;
  jobCategoryName?: string;
  vacancies?: number;
  organization?: string;
  qualification?: string;
  applicationDeadline?: string;
  officialNotificationUrl?: string;
  applyUrl?: string;
}

export interface CreateJobPostingDto {
  title: string;
  company: string;
  description: string;
  shortDescription?: string;
  contentHtml?: string;
  location?: string;
  expiryDate?: string;
  sourceUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  slug?: string;
  jobCategoryId?: number;
  vacancies?: number;
  organization?: string;
  qualification?: string;
  applicationDeadline?: string;
  officialNotificationUrl?: string;
  applyUrl?: string;
}

export interface PricingPlanDto {
  id: number;
  productId?: number;
  productName?: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  durationDays?: number;
  isActive?: boolean;
  displayOrder?: number;
  productType?: string;
}

export interface RazorpayOrderResponseDto {
  razorpayOrderId: string;
  keyId: string;
  amountInRupees: number;
  amountInPaise: number;
  currency: string;
  pricingPlanId: number;
  planName: string;
  paymentId: number;
}

export interface VerifyRazorpayPaymentDto {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  pricingPlanId: number;
  couponCode?: string;
}

export interface UserAccessStatusDto {
  hasActiveSubscription: boolean;
  planName?: string;
  expiryDate?: string;
  daysRemaining: number;
  accessibleCategoryIds?: number[];
}

export interface AdminCreatePlanDto {
  name: string;
  description?: string;
  price: number;
  currency?: string;
  durationDays?: number;
  isActive?: boolean;
  displayOrder?: number;
  productType?: string;
}

export interface CouponValidationDto {
  isValid: boolean;
  code: string;
  discountType: string;
  discountValue: number;
  calculatedDiscount: number;
  message?: string;
}

export interface PaymentResponseDto {
  paymentId: number;
  purchaseId: number;
  amount: number;
  transactionId: string;
  status: string;
  paymentDate: string;
}

export enum DifficultyLevel {
  Easy = 1,
  Medium = 2,
  Hard = 3,
}

export type Category = CategoryDto & { subCategories?: CategoryTreeDto[] };
export type Question = QuestionDto;
export type Test = TestDto;
export type TestSeries = TestSeriesDto;
export type JobPosting = JobPostingDto;
