import { z } from "zod";
import { Order } from "@/app/order/model/order";

export const Product = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  warehouses: z.array(z.string()),
  orders: z.array(Order),
});

export type Product = z.infer<typeof Product>;
