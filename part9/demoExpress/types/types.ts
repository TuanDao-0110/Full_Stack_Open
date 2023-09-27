export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
export type Visibility = "great" | "good" | "ok" | "poor";
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
const getNonSensitiveEntries = (): // Omit<DiaryEntry, "comment">
NonSensitiveDiaryEntry[] => {
  return [
    {
      id: 13023,
      date: "42343",
      visibility: "good",
      weather: "cloudy",
    },
  ];
};

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
