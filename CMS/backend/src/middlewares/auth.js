import jwt from "jsonwebtoken";
import { ENV } from "../../env.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);
    req.userInfo = decoded;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export const checkEmployee = async (req, res, next) => {
  const { employee_id } = req.userInfo;
  try {
    if (!employee_id) {
      return res.status(401).json({ success: false, message: "unauthorized" });
    }
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

///role based access
