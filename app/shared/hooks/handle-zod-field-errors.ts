import { ZodError } from "zod";

export const handleZodFieldErrors = (errors: ZodError) => {
  const keys = Object.keys(errors.flatten().fieldErrors);

  const getErrors = keys.map((key) => {
    return {
      path: key,
      message: errors.errors[0].message,
    };
  });

  return {
    getErrors,
  };
};
