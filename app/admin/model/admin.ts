import { z } from "zod";
import { Warehouse } from "@/app/warehouse/model/warehouse";

const BaseAdminSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  password: z.string(),
});

export const Admin: z.ZodType<Admin> = BaseAdminSchema.extend({
  warehouse: z.lazy(() => Warehouse.array()),
});

export type Admin = z.infer<typeof BaseAdminSchema> & {
  warehouse: Warehouse[];
};
