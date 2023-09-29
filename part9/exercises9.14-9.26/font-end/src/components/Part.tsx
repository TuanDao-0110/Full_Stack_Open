import React from "react";
import { CoursePart, Kind, courseParts } from "../types/course";
import { assertNever } from "../utils/exhaustiveCheck";

export default function Part(courseParts: CoursePart) {
  const { exerciseCount, kind, name } = courseParts;
  const renderCoursePart = () => {
    switch (courseParts.kind) {
      case Kind["background"]:
        return courseParts.description;
      case Kind["basic"]:
        return courseParts.description;
      case Kind["group"]:
        return `groupProjectCount: ${courseParts.groupProjectCount}`;
      case Kind["special"]:
        return `required skills: ${courseParts.requirements.map((item) => ` ${item}`)}`;
      default:
        return assertNever(courseParts);
    }
  };

  return (
    <div>
      <h3>
        {name}
        {"  "}
        {exerciseCount}
      </h3>
      <p>{renderCoursePart()}</p>
    </div>
  );
}
