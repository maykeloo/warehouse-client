import { z } from "zod";

export const AuthUser = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const TokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type Tokens = z.infer<typeof TokensSchema>;
