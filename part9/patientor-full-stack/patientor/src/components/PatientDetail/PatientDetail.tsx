import React from "react";
import { Gender, Patient } from "../../types";

export default function PatientDetail({ name, ssn, gender, occupation }: Patient) {
  const genderRender = () => {
    switch (gender) {
      case Gender.Female:
        return "👧";
      case Gender.Male:
        return "👦";
      default:
        return "";
    }
  };
  return (
    <div>
      <h2>
        {name} {genderRender()}
      </h2>
      <p>ssh :{ssn}</p>
      <p>occupation: {occupation}</p>
    </div>
  );
}
