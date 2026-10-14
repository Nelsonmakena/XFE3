import express from "express";
import { findPatient, newPatient } from "../controllers/patient.js";

const Router = express.Router();

//searching for a patient
Router.get("/patient", findPatient);
Router.put("/patient", newPatient);

export default Router;
