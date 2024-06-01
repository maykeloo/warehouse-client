"use server";

import { ClientApiService } from "@/app/client/data-access/client-api-service";
import { FormState } from "@/app/shared/types/form";
import { z } from "zod";
import { AuthUser } from "@/app/shared/model/user";
import { handleZodFieldErrors } from "@/app/shared/hooks/handle-zod-field-errors";
import { asResponseError } from "@/app/shared/assertions/as-response-error";

type Fields = z.infer<typeof AuthUser>;

export const registerClientAction = async (
  _: FormState<Fields>,
  data: FormData,
) => {
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

  const clientService = new ClientApiService();
  try {
    await clientService.registerClient(parsed.data.email, parsed.data.password);
    return {
      message: "success",
      errors: [],
      data: parsed.data,
    };
  } catch (error) {
    asResponseError(error);
    console.log({ error: error });
    return {
      message: "error",
      errors: error.errors,
      data: null,
    };
  }
};
