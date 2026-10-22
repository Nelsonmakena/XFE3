import express from "express";
import { findPatient, newPatient } from "../controllers/patient.js";
import { authenticate, checkEmployee } from "../middlewares/auth.js";
const Router = express.Router();

Router.use(authenticate, checkEmployee);

//searching for a patient
Router.get("/patient", findPatient);
//add new patient data
Router.put("/patient", newPatient);

export default Router;
