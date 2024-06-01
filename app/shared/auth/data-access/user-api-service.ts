import { TokensSchema } from "@/app/shared/model/user";
import { handleZodFieldErrors } from "@/app/shared/hooks/handle-zod-field-errors";

export class UserApiService {
  async login(email: string, password: string) {
    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());


    if (response.error) {
      throw response.error;
    }

    const parsed = TokensSchema.safeParse(response);

    if (!parsed.success) {
      const { getErrors } = handleZodFieldErrors(parsed.error);
      return {
        message: "error",
        errors: getErrors,
        data: null,
      };
    }

    console.log({
      message: "success",
      errors: [],
      data: parsed.data,
    });

    return {
      message: "success",
      errors: [],
      data: parsed.data,
    };
  }

  async getUserData(token: string) {
    const response = await fetch("http://localhost:3000/api/user/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if (response.error) {
      throw response.error;
    }

    return response.json();
  }
}
