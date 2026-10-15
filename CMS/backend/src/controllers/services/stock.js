import { db } from "../../prisma/db.ts";

// list
export async function categories() {
  try {
    const response = await db.orm.public.category.all();
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

//view stock

export async function stock(inventory_id) {
  try {
    const results = await db.orm.public.inventory
      .include("receiving_stock")
      .where({ inventory_id: inventory_id });
    return results;
  } catch (error) {
    console.log(error.message);
  }
}
