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
  const {
    first_name,
    middle_name,
    last_name,
    dob,
    address,
    encounter_type,
    complaints,
  } = req.body;
  const date_of_birth = `${req.body.dob}T00:00:00Z`;
  try {
    const results = await db.transaction(async (tx) => {
      const patient = await tx.orm.public.patient.create({
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        date_of_birth: Temporal.Instant.from(date_of_birth),
        address: address,
      });
      const newEncounter = await tx.orm.public.encounter.create({
        patient_id: patient.patient_id,
        encounter_type: encounter_type,
        complaints: complaints,
      });
    });

    res
      .status(200)
      .json({ success: true, message: "patient data added", data: results });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ success: false, message: "patient data cannot be added " });
  }
};

//new patient encounter

export const newPatientEncounter = async (req, res) => {
  const { patient_id, encounter_type, complaints } = req.body;
  const { employee_id } = req.userInfo;
  try {
    const response = await db.orm.public.encounter.create({
      patient_id: patient_id,
      encounter_type: encounter_type,
      complaints: complaints,
      created_by: employee_id,
    });
    res
      .status(200)
      .json({ success: true, message: "encounter recorded", data: response });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ success: false, message: "patient data cannot be added " });
  }
};

export const newClinicalAssessment = async (req, res) => {
  const { employee_id } = req.userInfo;
  const { assessment, encounter_id } = req.body;
  try {
    const response = await db.orm.public.clinical_assessment.create({
      assessment: assessment,
      assessed_by: employee_id,
      encounter_id: encounter_id,
    });
    res.status(200).json({ success: true, message: "assessment recorded" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "error in adding clinical assessment ",
    });
  }
};

export const newDifferentialDiagnosis = async (req, res) => {
  const { encounter_id, description, notes } = req.body;
  try {
    const response = await db.orm.public.differential_diagnosis.create({
      encounter_id: encounter_id,
      description: description,
      notes: notes,
    });
    res.status(200).json({ success: true, message: "differential added" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "differential diagnosis cant be recorded ",
    });
  }
};
