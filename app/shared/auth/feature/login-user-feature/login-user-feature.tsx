import { AuthForm } from "@/app/shared/auth/components/auth-form";
import { loginUserAction } from "@/app/shared/auth/feature/login-user-feature/actions/login-user";

export const LoginUserFeature = () => {
  return <AuthForm action={loginUserAction} />;
};
