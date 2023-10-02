import React from "react";
import { courseParts } from "../types/course";
import Part from "./Part";

export default function Content() {
  const courseName = "Half Stack application development";

  return (
    <div>
      <h1>{courseName}</h1>
      {courseParts.map((item, index) => {
        return <Part {...item} key={index} />;
      })}
      <p>Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
    </div>
  );
}
