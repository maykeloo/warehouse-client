"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterClientFeature } from "@/app/client/feature/register-client/register-client-feature";
import { LoginUserFeature } from "@/app/shared/auth/feature/login-user-feature/login-user-feature";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Link from "next/link";

export const LoginOrRegisterUserFeature = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const view = searchParams.get("view") ?? "login";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <Tabs defaultValue={view} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <Link href={pathname + "?" + createQueryString("view", "login")}>
          <TabsTrigger className="w-full" value="login">
            Link
          </TabsTrigger>
        </Link>
        <Link href={pathname + "?" + createQueryString("view", "register")}>
          <TabsTrigger className="w-full" value="register">
            Register
          </TabsTrigger>
        </Link>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <LoginUserFeature />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <RegisterClientFeature />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
