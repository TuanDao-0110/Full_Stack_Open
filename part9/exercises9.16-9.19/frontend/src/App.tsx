import React, { useEffect, useState } from "react";
import "./App.css";
import AllDiary from "./items/AllDiary";
import AddDiary from "./components/AddDiary";
import { DiaryEntry } from "./types/diaryTypes";
import { getAllDiary } from "./services/diaryService";

function App() {
  const [allDiary, setAllDiary] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getAllDiary().then((res) => setAllDiary(res as DiaryEntry[]));
  }, []);
  return (
    <div>
      <AddDiary setAllDiary={setAllDiary} allDiary={allDiary} key={"allDiary"} />
      <AllDiary allDiary={allDiary} />
    </div>
  );
}

export default App;
