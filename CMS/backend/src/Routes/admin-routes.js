import express from "express";
import {
  newAccountRole,
  accountRoleList,
  removeAccountRole,
} from "../controllers/auth/accounts.js";
import { patientList } from "../controllers/patient.js";
const Router = express.Router();

//new account role
Router.put("/account-role", newAccountRole);
//list of account roles
Router.get("/account-role", accountRoleList);
//remove account role
Router.delete("/account-role:account_role_id", removeAccountRole);

Router.get("/patient", patientList);

export default Router;
