import { Gender } from "./data";

// type guards
export const isString = (text: unknown): text is string => typeof text === "string" || text instanceof String;

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
  return data
};
