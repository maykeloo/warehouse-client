import { AuthForm } from "@/app/shared/auth/components/auth-form";
import { registerClientAction } from "@/app/client/feature/register-client/actions/register-client-action";

export const RegisterClientFeature = () => {
  return <AuthForm action={registerClientAction} />;
};
