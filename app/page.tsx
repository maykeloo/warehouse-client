import { LoginOrRegisterUserFeature } from "@/app/shared/auth/feature/login-or-register-user/login-or-register-user-feature";
import { useUser } from "@/app/shared/auth/hooks/useUser";

export default async function Home() {
  const user = await useUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginOrRegisterUserFeature />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
