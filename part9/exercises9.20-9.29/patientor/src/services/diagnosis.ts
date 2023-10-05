import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getAllDiagnosis = async () => {
  try {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return data;
  } catch (error) {
    let msg = "";
    if (error instanceof Error) {
      msg = error.message;
    }
    throw msg;
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllDiagnosis };
