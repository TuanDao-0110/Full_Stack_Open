import React, { Fragment} from "react";
import { DiaryEntry } from "../types/diaryTypes";
import Diary from "../components/Diary";
interface Iprop {
  allDiary: DiaryEntry[];
}
export default function AllDiary({ allDiary }: Iprop) {
  console.log(allDiary)
  // if (allDiary.length > 0) {
    return (
      <div>
        <h1>Diary Entries: {allDiary.length}</h1>
        {allDiary.map((item, index) => {
          return (
            <Fragment key={index}>
              <h4>number: {index}</h4>
              <Diary {...item} />
            </Fragment>
          );
        })}
      </div>
    );
  // }
  // return <></>;
}
