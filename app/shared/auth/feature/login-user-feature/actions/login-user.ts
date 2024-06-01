"use server";

import { FormState } from "@/app/shared/types/form";
import { z } from "zod";
import { AuthUser, User, UserRole } from "@/app/shared/model/user";
import { handleZodFieldErrors } from "@/app/shared/hooks/handle-zod-field-errors";
import { UserApiService } from "@/app/shared/auth/data-access/user-api-service";
import { cookies } from "next/headers";
import { asResponseError } from "@/app/shared/assertions/as-response-error";
import { redirect } from "next/navigation";

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

  let role: UserRole | null = null;
  try {
    const userApiService = new UserApiService();
    const { email, password } = parsed.data;
    const tokens = await userApiService.login(email, password);

    if (tokens.data?.accessToken) {
      setCookies(tokens.data.accessToken);
      const userData = await getUserData(tokens.data.accessToken);
      role = userData.data.role;
    }
  } catch (error) {
    asResponseError(error);
    return {
      message: "error",
      errors: error.errors,
      data: null,
    };
  } finally {
    if (role) {
      redirectLoggedUser(role);
    }
  }
};

const setCookies = (accessToken: string) => {
  const cookieStore = cookies();
  cookieStore.set("token", accessToken);
};

const getUserData = async (accessToken: string) => {
  const userApiService = new UserApiService();
  return await userApiService.getUserData(accessToken);
};

const redirectLoggedUser = (role: UserRole) => {
  const routes = {
    ADMIN: "/admin",
    CLIENT: "/client",
  };

  const path = routes[role];
  console.log({ path });
  return redirect(path);
};
