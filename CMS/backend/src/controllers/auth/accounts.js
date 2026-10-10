import { db } from "../../prisma/db";

export const newAccountRole = async (req, res) => {
  const { role_name } = req.body;
  try {
    const role = await db.orm.public.account_role.create({
      role_name: role_name,
    });
    res.status(200).json({ success: true, message: "role added sucessfully" });
  } catch (error) {
    console.log(error.message);
  }
};
//general account creation
