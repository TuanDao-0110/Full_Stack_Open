export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}
export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

// export const getNonSensitiveEntries = (): Pick<DiaryEntry, "id" | "date" | "weather" | "visibility">[] => {
//   // ...
//   return [
//     {
//       id: 13023,
//       date: "42343",
//       visibility: "good",
//       weather: "cloudy",
//     },
//   ];
// };
// or we can use Omit:
export const getNonSensitiveEntries = (): // Omit<DiaryEntry, "comment">
NonSensitiveDiaryEntry[] => {
  return [
    {
      id: 13023,
      date: "42343",
      visibility: Visibility.Good,
      weather: Weather.Stormy,
    },
  ];
};

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
