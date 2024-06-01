import { z } from "zod";

export enum UserRole {
  Admin = "ADMIN",
  CLIENT = "CLIENT",
}

export const AuthUser = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
});

export type User = z.infer<typeof UserSchema>;
