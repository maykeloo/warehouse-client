import { AuthForm } from "@/app/shared/auth/feature/auth-form";
import { registerClientAction } from "@/app/client/feature/register-client/actions/register-client-action";

export const RegisterClientFeature = () => {
  return <AuthForm action={registerClientAction} />;
};
