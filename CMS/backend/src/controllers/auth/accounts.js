import { db } from "../../prisma/db.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const newAccountRole = async (req, res) => {
  const { role_name  } = req.body;
  if (!role_name) {
    return res.status(400).json({
      success: false,
      message: "all filleds must be filled",
    });
  }
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
    res
      .status(400)
      .json({ success: false, message: " error list cant be displayed" });
  }
};
export const removeAccountRole = async (req, res) => {
  const { account_role_id } = req.params;
  if (!account_role_id) {
    return res.status(400).json({
      success: false,
      message: "account id not found",
    });
  }
  try {
    const deletedRole = await db.orm.public.account_role
      .where({ account_role_id: account_role_id })
      .delete();
    res.status(200).json({
      success: true,
      message: "account role removed",
      data: deletedRole,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ success: false, message: " account role cant be removed" });
  }
};

//general account creation
export const newEmployee = async (req, res) => {
  const { email, account_role_id, role_id } = req.body;

  if (!email || !account_role_id || !role_id) {
    return res.status(400).json({
      success: false,
      message: "all filleds must be filled",
    });
  }
  const password = "1234";
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const response = await db.transaction(async (tx) => {
      const account = await tx.orm.public.account.create({
        email: email,
        password_hash: hashedPassword,
        account_role_id: account_role_id,
      });
      const employee = await tx.orm.public.employee.create({
        account_id: account.account_id,
        empolyee_role: role_id,
      });
      return { email: account.email, employee_id: employee.employee_id };
    });

    res.status(201).json({
      success: true,
      message: "employee added ",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ success: false, message: " error employee cannot be created" });
  }
};

//list of accounts

export const accountList = async (req, res) => {
  try {
    const response = await db.orm.public.employee
      .include("account", (account) =>
        account.select("account_role_id", "email"),
      )
      .all();
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ success: false, message: " list cant be displayed" });
  }
};
