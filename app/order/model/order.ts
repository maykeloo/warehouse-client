import { z } from "zod";

export const Order = z.object({
  id: z.string(),
  client: z.string(),
  clientId: z.string(),
  userId: z.number(),
  products: z.array(z.string()),
  quantity: z.number(),
  total: z.number(),
  createdAt: z.string(),
});

export type Order = z.infer<typeof Order>;
