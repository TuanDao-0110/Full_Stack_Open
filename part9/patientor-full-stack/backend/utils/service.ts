import { dataDianosis, dataPatient } from "../types/data";
import { isString, parseDataString, parseDate, parseGender } from "../types/typeGuard";
import { Diagnosis, Patient } from "../types/types";
import { v1 as uuid } from "uuid";
export const getDianoses = (): Diagnosis[] => {
  return dataDianosis;
};

export const getPatients = (id?: string): Patient[] => {
  if (!id) {
    return dataPatient;
  }
  if (!isString(id)) throw new Error("id must be a string");
  return dataPatient.filter((p) => p.id === id);
};

export const addPatient = (object: unknown): Patient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
    const id = uuid();
    const data: Patient = {
      id: id,
      dateOfBirth: parseDate(object["dateOfBirth"]),
      gender: parseGender(object["gender"]),
      name: parseDataString(object["name"]),
      occupation: parseDataString(object["occupation"]),
      ssn: parseDataString(object["ssn"]),
    };
    return data;
  }
  throw new Error("Invalid Patient");
};
