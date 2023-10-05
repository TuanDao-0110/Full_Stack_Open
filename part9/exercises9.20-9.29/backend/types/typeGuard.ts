import { Gender } from "./data";
import { BaseEntryWithoutId, Diagnosis, Discharge, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "./types";

// type guards
export const isString = (text: unknown): text is string => {
  if (typeof text === "string" || text instanceof String) {
    if (text.length > 0) {
      return true;
    }
    return false;
  }
  return false;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
export const isGender = (data: string): data is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(data);
};
export const parseDataString = (data: unknown): string => {
  if (!isString(data)) {
    throw new Error("Incorrect or missing with string error");
  }
  return data;
};
export const parseDate = (data: unknown): string => {
  if (!isString(data) || !isDate(data)) {
    throw new Error("Incorrect or missing with Date string error");
  }
  return data;
};
export const parseGender = (data: unknown): Gender => {
  if (!isString(data) || !isGender(data)) {
    throw new Error("Incorrect or missing data with gender error");
  }
  return data;
};

// type guard add new entry
// 1. check BaseEntry and return BaseEntry
// 2. check Eachentry and return Eachentry

//  check BaseEntry and return values

export const checkBaseEntry = (object: any): BaseEntryWithoutId => {
  if (object && typeof object === "object" && "description" in object && "date" in object && "specialist" in object) {
    if (!isDate(object["date"]) || !isString(object["specialist"]) || !isString(object["description"])) {
      throw new Error("date , specialist, date, description is wrong type");
    }
    const { description, specialist, date } = object;
    let data: BaseEntryWithoutId = {
      description,
      specialist,
      date,
      diagnosisCodes: parseDiagnosticCodes(object),
    };
    return data;
  }
  throw new Error("object is wrong or missing entry, description, date, type");
};
// check diagnosisCodes vs return values
const parseDiagnosticCodes = (object: any): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};
// Type guard functions to validate properties for each specific Entry type
export const checkEachEntry = (
  object: any
):
  | { type: "HealthCheck"; healthCheckRating: HealthCheckRating }
  | {
      type: "OccupationalHealthcare";
      employerName: string;
      sickLeave?: {
        startDate: string;
        endDate: string;
      };
    }
  | {
      type: "Hospital";
      discharge: Discharge;
    } => {
  if (!("type" in object)) {
    throw new Error("type is incorrect");
  }
  // Use type guards to check the properties based on the type discriminator
  switch (object.type) {
    case "HealthCheck":
      return { type: "HealthCheck", ...validateHealthCheck(object) };
    case "OccupationalHealthcare":
      return { type: "OccupationalHealthcare", ...validateOccupationalHealthcare(object) };
    case "Hospital":
      return { type: "Hospital", ...validateHospital(object) };
    default:
      throw new Error("type is incorrect");
  }
};

const validateHealthCheck = (entry: any): { healthCheckRating: HealthCheckRating } => {
  if ("healthCheckRating" in entry) {
    if (entry["healthCheckRating"] in HealthCheckRating) {
      return { healthCheckRating: entry["healthCheckRating"] };
    }
    throw new Error("healthCheckRating is wrong");
  }
  throw new Error("health checking Rating is missing");
};

const validateOccupationalHealthcare = (
  entry: OccupationalHealthcareEntry
): { employerName: string; sickLeave?: { startDate: string; endDate: string } } => {
  if ("employerName" in entry) {
    if ("sickLeave" in entry) {
      const sickLeave = entry["sickLeave"] as { startDate: string; endDate: string };
      const startDate = sickLeave.startDate;
      const endDate = sickLeave.endDate;
      if (!endDate || !startDate) {
        throw new Error("end date or start data in sickLeave is missing");
      }
      if (isDate(startDate) && isDate(endDate)) {
        return {
          sickLeave: entry["sickLeave"],
          employerName: entry["employerName"],
        };
      }
      throw new Error("sickleave value is wrong type or missing value");
    }
    return {
      employerName: entry["employerName"],
    };
  }
  throw new Error("entry for occupationHealthe care is wrong");
};

const validateHospital = (entry: HospitalEntry): { discharge: Discharge } => {
  if ("discharge" in entry) {
    const discharge = entry["discharge"];
    if ("date" in discharge && "criteria" in discharge && isString(discharge["criteria"]) && isDate(discharge["date"])) {
      return {
        discharge,
      };
    }
    throw new Error("discharge value is wrong type");
  }
  throw new Error("discharge_ is missing");
};
