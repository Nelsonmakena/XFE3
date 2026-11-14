import express from "express";
import {
  employeeLogin,
  adminLogin,
  newAdmin,
} from "../controllers/auth/authentication.js";
import { authenticate } from "../middlewares/auth.js";
const Router = express.Router();

Router.put("/admin", newAdmin);
Router.post("/login", employeeLogin);
Router.post("/admin-login", adminLogin);

Router.get("/check-auth", authenticate, (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "authenticated", data: req.userInfo });
});

export default Router;
