import { AuthForm } from "@/app/shared/auth/feature/auth-form";
import { loginUserAction } from "@/app/shared/auth/feature/login-user-feature/actions/login-user";

export const LoginUserForm = () => {
  return <AuthForm action={loginUserAction} />;
};
