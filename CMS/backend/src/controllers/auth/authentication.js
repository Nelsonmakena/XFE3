import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../prisma/db.ts";
import { ENV } from "./../../../env.js";
import { log } from "console";

export const newAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    //hashed password
    const hashedPassword = bcrypt.hashSync(password, 10);
    const response = await db.orm.public.admin.create({
      username: username,
      password_hash: hashedPassword,
    });
    res
      .status(200)
      .json({ success: true, message: " new admin added successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "cannot be added " });
  }
};

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "fill all fields",
    });
  }
  try {
    const findAdmin = await db.orm.public.admin
      .where({ username: username })
      .first();
    if (!findAdmin || !bcrypt.compareSync(password, findAdmin.password_hash)) {
      res.status(401).json({ success: false, message: "wrong info" });
    }
    const user = {
      id: findAdmin.id,
      user_name: findAdmin.username,
      role: "admin",
    };
    const token = jwt.sign(user, ENV.JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "successfully logged in ",
      data: user,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: "cannot be authenticated " });
  }
};
export const employeeLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "fill all fields",
    });
  }

  try {
    const findEmployee = await db.orm.public.account
      .where({ email: email })
      .first();
    if (
      !findEmployee ||
      !bcrypt.compareSync(password, findEmployee.password_hash)
    ) {
      return res.status(401).json({ success: false, message: "wrong info" });
    }
    const employee = await db.orm.public.employee
      .where({
        account_id: findEmployee.account_id,
      })
      .include("account", (a) =>
        a
          .select("email", "created_at")
          .include("account_type", (u) => u.select("role_name")),
      )
      .first();

    const response = {
      employee_id: employee.employee_id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.account.email,
      role: employee.account.account_type.role_name,
    };
    const token = jwt.sign(response, ENV.JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "successfully logged in ",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "cannot be authenticated " });
  }
};
