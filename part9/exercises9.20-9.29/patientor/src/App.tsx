import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import diagnosis from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientDetail from "./components/PatientDetail/PatientDetail";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);
  const [patientId, setPatientId] = useState<string>("");
  const getPersonDetail = (): Patient => {
    return patients.filter((e) => e.id === patientId)[0];
  };
  const fetchPatientList = async () => {
    const patients = await patientService.getAll();
    setPatients(patients);
  };
  const fetchDiagnosticList = async () => {
    try {
      const diagnosticList = await diagnosis.getAllDiagnosis();
      setDiagnosisList(diagnosticList);
    } catch (error) {
      setDiagnosisList([]);
    }
  };
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    void fetchPatientList();
    fetchDiagnosticList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} setPatientId={setPatientId} />} />
            {/* {patients.length > 0 && ( */}
              <Route
                path="/:id"
                element={<PatientDetail patient={getPersonDetail()} diagnosisList={diagnosisList} setPatients={setPatients} patientList={patients} />}
              />
            {/* )} */}
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
