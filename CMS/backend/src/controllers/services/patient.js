import { db } from "../../prisma/db.ts";

// check if patient

export async function patientsRecord(first_name, last_name) {
  try {
    const result = await db.orm.public.patient
      .where({ first_name: first_name })
      .where({ last_name: last_name })
      .all();

    return result;
  } catch (error) {
    console.log(error.message);
  }
}

// inserting
