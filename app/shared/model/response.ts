export type ResponseError = {
  path: string;
  message: string;
};

export type Response<T> = {
  message: "success" | "error";
  errors: ResponseError[];
  data: T;
};
