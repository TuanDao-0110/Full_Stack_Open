import diaryEntries from "../data/diaries";
import { DiaryEntry, NonSensitiveDiaryEntry } from "../types/types";

const getEntries = (): DiaryEntry[] => {
  return diaryEntries;
};
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryEntries.map(({ date, id, visibility, weather }) => ({ date, id, visibility, weather }));
};
const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
};
