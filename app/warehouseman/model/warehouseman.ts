import { z } from "zod";

export const Warehouseman = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  warehouse: z.string(),
});

export type Warehouseman = z.infer<typeof Warehouseman>;