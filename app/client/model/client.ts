import { z } from "zod";
import { Order } from "@/app/order/model/order";

const Client = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  orders: z.array(Order),
});

export type Client = z.infer<typeof Client>;
