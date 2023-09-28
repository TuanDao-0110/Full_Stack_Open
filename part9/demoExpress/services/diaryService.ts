import diaryEntries from "../data/diaries";
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry, Weather, Visibility } from "../types/types";

const getEntries = (): DiaryEntry[] => {
  return diaryEntries;
};
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryEntries.map(({ date, id, visibility, weather }) => ({ date, id, visibility, weather }));
};
const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaryEntries.find((d) => d.id === id);
  return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaryEntries.map((d) => d.id)) + 1,
    ...entry,
  };
  diaryEntries.push(newDiaryEntry);
  return newDiaryEntry;
};
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("comment" in object && "date" in object && "weather" in object && "visibility" in object) {
    const newEntry: NewDiaryEntry = {
      comment: parseComment(object.comment),
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

// type guards check is that string

const parseComment = (commnet: unknown): string => {
  if (!isString(commnet)) {
    throw new Error("Incorrect or misisng comment ");
  }
  return commnet;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
// check is that date

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
// check weather:

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather: " + weather);
  }
  return weather;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};

// check visibility:
const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect or missing visibility: " + visibility);
  }
  return visibility;
};
export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
  toNewDiaryEntry,
};
