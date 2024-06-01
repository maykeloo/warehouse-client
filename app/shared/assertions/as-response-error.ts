import { ApiResponse, ResponseError } from "@/app/shared/model/response";

export const asResponseError: <T>(
  error: unknown,
) => asserts error is ApiResponse<T> = (error) => {
  if ((error as ApiResponse).message === "error") {
    throw new Error("Expected error to have errors property");
  }
};
