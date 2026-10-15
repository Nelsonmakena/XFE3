import { db } from "../prisma/db.ts";
import { categories } from "./services/stock.js";

//list of categories

export const getCategories = async (req, res) => {
  try {
    const response = await categories();
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ success: true, message: "list cant be displayed" });
  }
};

// one category item info

export const category = async (req, res) => {
  const { category_id } = req.param;
  try {
    const response = await db.orm.public.category
      .where({
        category_id: category_id,
      })
      .all();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: true, message: "item cant be displayed" });
  }
};

//new medicine item

export const newMedicineItem = async (req, res) => {
  const { medicine_name, form, base_unit, category_id } = req.body;
  try {
    const medicine = db.orm.public.medicine.create({
      medicine_name: medicine_name,
      form: form,
      base_unit: base_unit,
      category_id: category_id,
    });

    res
      .status(200)
      .json({ success: true, message: "medicine added", data: medicine });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ success: true, message: "new medicine item cant be added" });
  }
};

// adding a stock

export const newStock = async (req, res) => {
  const { medicine_id, supplier_name, boxes, units } = req.body;
  try {
    const stock = db.orm.public.receiving_stock.create({
      med,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: true, message: "stock cant be added" });
  }
};
