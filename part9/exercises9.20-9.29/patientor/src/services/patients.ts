import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";


const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};
const createEntry = async (object :EntryWithoutId,userId : string )=> { 
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${userId}/entries`,object);
  return data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  createEntry
};
