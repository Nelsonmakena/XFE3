import { db } from "../prisma/db.ts";
import { Temporal } from "@js-temporal/polyfill";
import { patientsRecord } from "./services/patient.js";

// list of patients
export const patientList = async (req, res) => {
  try {
    const response = await db.orm.public.patient.all();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ success: false, message: " list cant be populated " });
  }
};

export const findPatient = async (req, res) => {
  const { first_name, last_name } = req.body;
  try {
    const response = await patientsRecord(first_name, last_name);
    if (response.length === 0) {
      return res.json({ success: false, message: "patient not found" });
    }
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: " patient not found " });
  }
};

export const newPatient = async (req, res) => {
  const { first_name, middle_name, last_name, dob, address } = req.body;
  const date_of_birth = `${req.body.dob}T00:00:00Z`;
  try {
    const patient = await db.orm.public.patient.create({
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      date_of_birth: Temporal.Instant.from(date_of_birth),
      address: address,
    });
    res
      .status(200)
      .json({ success: true, message: "patient data added", data: patient });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ success: false, message: "patient data cannot be added " });
  }
};
