import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../prisma/db.ts";
import { ENV } from "./../../../env.js";

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const findAdmin = await db.orm.public.admin
      .where({ username: username })
      .first();
    if (findAdmin && bcrypt.compareSync(password, findAdmin.password_hash)) {
      const user = {
        id: findAdmin.id,
        user_name: findAdmin.username,
      };
      const token = jwt.sign(user, ENV.JWT_SECRET_KEY, {
        expiresIn: "1hr",
      });
      res.cookie("token", token, { httpOnly: true, secure: false });
      res.status(200).json({
        success: true,
        message: "successfully logged in ",
        data: user,
      });
    } else {
      res.status(401).json({ success: false, message: "wrong info" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: "cannot be authenticated " });
  }
};
export const employeeLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findEmployee = await db.orm.public.account
      .where({ email: email })
      .first();
    if (
      findEmployee &&
      bcrypt.compareSync(password, findEmployee.password_hash)
    ) {
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

      const token = jwt.sign(employee, ENV.JWT_SECRET_KEY, {
        expiresIn: "1hr",
      });
      res.cookie("token", token, { httpOnly: true, secure: false });
      res.status(200).json({
        success: true,
        message: "successfully logged in ",
        data: employee,
      });
    } else {
      res.status(401).json({ success: false, message: "wrong info" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "cannot be authenticated " });
  }
};
