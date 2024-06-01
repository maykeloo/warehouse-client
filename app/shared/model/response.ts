export type ResponseError = {
  path: string;
  message: string;
};

export type ApiResponse<T = any> = {
  message: "success" | "error";
  errors: ResponseError[];
  data: T;
  error?: string;
};
