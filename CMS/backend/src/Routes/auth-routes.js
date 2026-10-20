import express from "express";
import { employeeLogin } from "../controllers/auth/authentication.js";
const Router = express.Router();

Router.post("/login", employeeLogin);

export default Router;
