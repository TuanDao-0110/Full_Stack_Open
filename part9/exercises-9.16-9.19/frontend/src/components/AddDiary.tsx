/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { getAllDiary, postNewDiary } from "../services/diaryService";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types/diaryTypes";
import { MsgType, NofiticationType } from "../types/systemTypes";
import Message from "../components/Message";

interface Iprop {
  setAllDiary: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  allDiary: DiaryEntry[];
}
export default function AddDiary({ setAllDiary, allDiary }: Iprop) {
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: "",
  });
  const [message, setMessage] = useState<NofiticationType | null>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewEntry({
      ...newEntry,
      [name]: value,
    });
  };
  const openMsg = ({ message, type }: NofiticationType) => {
    setMessage({
      message,
      type,
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postNewDiary(newEntry)
      .then((res) => {
        const temp = res as DiaryEntry;
        openMsg({ message: `date ${temp.date} added`, type: MsgType.success });
        getAllDiary().then((res) => setAllDiary(res as DiaryEntry[]));
        setNewEntry({
          date: "",
          weather: Weather.Sunny,
          visibility: Visibility.Great,
          comment: "",
        });
      })
      .catch((err) => {
        openMsg({ message: err, type: MsgType.fail });
      });
  };

  return (
    <div>
      <h1>Diary Entry Form</h1>
      {message !== null ? <Message message={message?.message} type={message?.type} /> : <></>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={newEntry.date} onChange={handleInputChange}  />
        <br />
        <br />

        <label htmlFor="weather">Weather:</label>
        <select id="weather" name="weather" value={newEntry.weather} onChange={handleInputChange} >
          {Object.values(Weather).map((weatherOption) => (
            <option key={weatherOption} value={weatherOption}>
              {weatherOption}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor="visibility">Visibility:</label>
        <select id="visibility" name="visibility" value={newEntry.visibility} onChange={handleInputChange} >
          {Object.values(Visibility).map((visibilityOption) => (
            <option key={visibilityOption} value={visibilityOption}>
              {visibilityOption}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor="comment">Comment:</label>
        <input id="comment" name="comment" value={newEntry.comment} onChange={handleInputChange} />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
