/* eslint-disable array-callback-return */
import React from "react";
import { Diagnosis, Gender, Patient, Type } from "../../types";
import AddEntry from "../AddEntry/AddEntry";


interface Iprop {
  patient?: Patient;
  patientList: Patient[];
  diagnosisList: Diagnosis[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}
export default function PatientDetail({ patient, diagnosisList, setPatients, patientList }: Iprop) {
  if (!patient) {
    return <>no data</>;
  }
  const { name, ssn, gender, occupation, entries } = patient;
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

  // prevent n + 1 problems
  const renderDiagnosis = (diagnosisCodes: string[]) => {
    const diagnosisListFinal: Diagnosis[] = [];

    diagnosisList.forEach((e) => {
      if (diagnosisCodes.includes(e.code)) {
        diagnosisListFinal.push(e);
      }
    });
    return diagnosisListFinal.map((item, index) => {
      return (
        <p key={index}>
          * {item.code} {item.name}
        </p>
      );
    });
  };
  const renderType = (type: string) => {
    switch (type) {
      case Type.HealthCheck:
        return "🥼";
      case Type.Hospital:
        return "🏥";
      case Type.OccupationalHealthcare:
        return "🧑‍✈️";
      default:
        return "";
    }
  };
  const entriesRender = () => {
    return entries?.map((item, index) => {
      const { date, description, diagnosisCodes } = item;
      return (
        <div
          key={index}
          style={{
            border: "1px solid black",
            marginTop: "2rem",
          }}
        >
          <p>
            {date} {description} {renderType(item.type)}
          </p>
          {diagnosisCodes && renderDiagnosis(diagnosisCodes)}
          <p>Designed by {item.specialist}</p>
        </div>
      );
    });
  };
  
  return (
    <div>
      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <AddEntry diagnosisList={diagnosisList} patient={patient} setPatients={setPatients} patientList={patientList} />
      </div>
      <h2>
        {name} {genderRender()}
      </h2>
      <p>ssh :{ssn}</p>
      <p>occupation: {occupation}</p>
      <h4>Entries</h4>
      {entriesRender()}
    </div>
  );
}
