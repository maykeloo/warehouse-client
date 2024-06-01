import { Response, ResponseError } from "@/app/shared/model/response";

export const asResponseError: <T>(
  error: unknown,
) => asserts error is Response<T> = (error) => {
  if ((error as Response<any>).message !== "error") {
    throw new Error("Expected error to have errors property");
  }
};
