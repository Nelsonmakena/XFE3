import { db } from "../../prisma/db.ts";

//view of employee roles

export const employeeRolesList = async (req, res) => {
  try {
    const response = await db.orm.public.employee_role
      .include("employees", (e) => e.count())
      .all();

    res.status(201).json({
      success: true,
      message: "employee role list",
      data: response,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "list cant be displayed" });
  }
};

//adding a new employee role

export const newEmployeeRole = async (req, res) => {
  const { role_name, role_description } = req.body;
  if (!role_name || !role_description) {
    return res.status(400).json({
      success: false,
      message: "all filleds must be filled",
    });
  }
  try {
    const response = await db.orm.public.employee_role.create({
      role_name: role_name,
      role_description: role_description,
    });

    res.status(201).json({
      success: true,
      message: "new employee role added",
      data: response,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "list cant be displayed" });
  }
};
