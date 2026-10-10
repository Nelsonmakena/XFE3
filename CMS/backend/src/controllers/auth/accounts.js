import { db } from "../../prisma/db.ts";

export const newAccountRole = async (req, res) => {
  const { role_name } = req.body;
  try {
    const role = await db.orm.public.account_role.create({
      role_name: role_name,
    });

    res
      .status(200)
      .json({ success: true, message: "role added successfully", data: role });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: " error" });
  }
};

export const accountRoleList = async (req, res) => {
  try {
    const response = await db.orm.public.account_role.all();
    res.status(200).json({
      success: true,
      message: "list of account roles",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: " error" });
  }
};
export const removeAccountRole = async (req, res) => {
  const { account_role_id } = req.params;
  try {
    const deletedRole = await db.orm.public.account_role
      .where({ account_role_id: account_role_id })
      .delete();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: " error" });
  }
};
//general account creation
