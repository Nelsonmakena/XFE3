import express from "express";
import {
  newAccountRole,
  accountRoleList,
  removeAccountRole,
  newEmployee,
  accountList,
} from "../controllers/auth/accounts.js";
import { patientList } from "../controllers/patient.js";
import { authenticate, checkAdmin } from "../middlewares/auth.js";
const Router = express.Router();

Router.use(authenticate, checkAdmin);

//new account role
Router.put("/account-role", newAccountRole);
//list of account roles
Router.get("/account-role", accountRoleList);
//remove account role
Router.delete("/account-role:account_role_id", removeAccountRole);

Router.get("/patient", patientList);

Router.get("/accounts", accountList);
//new employee
Router.put("/employee", newEmployee);
export default Router;
