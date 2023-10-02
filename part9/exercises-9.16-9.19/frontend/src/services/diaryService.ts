import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types/diaryTypes";
const BASE_URL = "http://localhost:3001/api/diaries";
export const getAllDiary = async () => {
  try {
    const res = await axios.get<DiaryEntry[]>(BASE_URL);
    return res.data as DiaryEntry[];
  } catch (error) {
    let msg = "";
    if (error instanceof Error) {
      msg = error.message;
    }
    throw msg;
  }
};

export const postNewDiary = async (data: NewDiaryEntry) => {
  try {
    const res = await axios.post<DiaryEntry>(BASE_URL, {
      ...data,
    });
    return res.data ;
  } catch (error) {
    console.log('error', error);
    let msg = "";
    if (error instanceof Error) {
      msg = error.message;
    }
    throw msg;
  }
};
