"use server";

import { FormState } from "@/app/shared/types/form";
import { z } from "zod";
import { AuthUser } from "@/app/shared/model/user";
import { handleZodFieldErrors } from "@/app/shared/hooks/handle-zod-field-errors";
import { UserApiService } from "@/app/shared/auth/data-access/user-api-service";
import { cookies } from "next/headers";
import { asResponseError } from "@/app/shared/assertions/asResponseError";

type Fields = z.infer<typeof AuthUser>;

export const loginUserAction = async (_: FormState<Fields>, data: FormData) => {
  const formData = Object.fromEntries(data.entries());
  const parsed = AuthUser.safeParse(formData);

  if (!parsed.success) {
    const { getErrors } = handleZodFieldErrors(parsed.error);
    return {
      message: "error",
      errors: getErrors,
      data: null,
    };
  }

  const userApiService = new UserApiService();
  try {
    const tokens = await userApiService.login(
      parsed.data.email,
      parsed.data.password,
    );

    if (tokens.data?.accessToken) {
      const cookieStore = cookies();
      cookieStore.set("token", tokens.data.accessToken);
    }

    return {
      message: "success",
      errors: [],
      data: parsed.data,
    };
  } catch (error) {
    asResponseError(error);
    return {
      message: "error",
      errors: error.errors,
      data: null,
    };
  }
};
