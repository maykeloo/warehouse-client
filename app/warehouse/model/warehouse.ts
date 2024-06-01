import { z } from "zod";
import { Warehouseman } from "@/app/warehouseman/model/warehouseman";
import { Product } from "@/app/product/model/product";
import { Admin } from "@/app/admin/model/admin";

const BaseWarehouseSchema = z.object({
  id: z.string(),
  name: z.string(),
  warehousemen: z.array(Warehouseman),
  products: z.array(Product),
});

export const Warehouse: z.ZodType<Warehouse> = BaseWarehouseSchema.extend({
  admins: z.lazy(() => Admin.array()),
});

export type Warehouse = z.infer<typeof BaseWarehouseSchema> & {
  admins: Admin[];
};
