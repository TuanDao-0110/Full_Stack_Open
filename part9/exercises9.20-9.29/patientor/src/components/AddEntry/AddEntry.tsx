import React, { useState } from "react";
import { TextField, Button, Grid, Container, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Autocomplete } from "@mui/material";
import { BaseEntryWithoutId, Diagnosis, Entry, EntryWithoutId, HealthCheckRating, MsgType, Patient, Type } from "../../types";
import patientService from "../../services/patients";
import Msg from "../Msg/Msg";

interface Iprop {
  diagnosisList: Diagnosis[];
  patient: Patient;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patientList: Patient[];
}
export default function AddEntry({ diagnosisList, patient, patientList, setPatients }: Iprop) {
  const [formData, setFormData] = useState<BaseEntryWithoutId>({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  });
  const [type, setType] = useState<Type>(Type.HealthCheck);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.CriticalRisk);
  const [occupationalHealthcare, setOccupationalHealthcare] = useState<{ employerName: string; sickLeave?: { startLeave: string; endDate: string } }>(
    {
      employerName: "",
    }
  );
  const [hospital, setHospital] = useState<{ date: string; criteria: string }>({
    date: "",
    criteria: "",
  });
  const [msg, setMsg] = useState<{ msgType: MsgType; show: boolean; value: string }>({
    msgType: MsgType.error,
    show: false,
    value: "",
  });
  const handleChangeBasic = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const resetForm = () => {
    setFormData({
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
    });
    setType(Type.HealthCheck);
    setHealthCheckRating(HealthCheckRating.CriticalRisk);
    setOccupationalHealthcare({ employerName: "" });
    setHospital({ criteria: "", date: "" });
  };
  const addNewEntry = (userId: string, object: Entry) => {
    let temp = [...patientList];
    let findIndex = temp.findIndex((e) => e.id === patient.id);
    if (typeof temp[findIndex]?.entries === "undefined") {
      temp[findIndex].entries = [];
      temp[findIndex].entries?.push(object);
      setPatients(temp);
    } else {
      temp[findIndex].entries?.push(object);
      setPatients(temp);
    }
  };
  const showMsg = (msg: MsgType, value: string) => {
    setMsg({
      msgType: msg,
      show: true,
      value,
    });
    setTimeout(() => {
      setMsg({
        msgType: msg,
        show: false,
        value,
      });
    }, 4000);
  };
  const handleSubmit = () => {
    let returnValue: any = {};
    let temp: BaseEntryWithoutId = {
      ...formData,
    };
    if (type === "HealthCheck") {
      let data: EntryWithoutId = {
        ...temp,
        type: "HealthCheck",
        healthCheckRating: healthCheckRating,
      };
      returnValue = { ...data };
    }
    if (type === Type.OccupationalHealthcare) {
      if (!occupationalHealthcare.sickLeave) {
        let data: EntryWithoutId = {
          ...temp,
          type: Type.OccupationalHealthcare,
          employerName: occupationalHealthcare.employerName,
        };
        returnValue = { ...data };
      } else {
        let data: EntryWithoutId = {
          ...temp,
          type: Type.OccupationalHealthcare,
          employerName: occupationalHealthcare.employerName,
          sickLeave: {
            endDate: occupationalHealthcare.sickLeave.endDate,
            startDate: occupationalHealthcare.sickLeave.startLeave,
          },
        };
        returnValue = { ...data };
      }
    }
    if (type === Type.Hospital) {
      let data: EntryWithoutId = {
        ...temp,
        type: Type.Hospital,
        discharge: {
          ...hospital,
        },
      };
      returnValue = { ...data };
    }
    patientService
      .createEntry(returnValue, patient.id)
      .then((res) => {
        resetForm();
        showMsg(MsgType.success, "data addd success");
        addNewEntry(patient.id, returnValue);
      })
      .catch((err) => {
        let msg: string = err.response.data.msg;
        if (err instanceof Error) {
          msg += err.message;
        }
        showMsg(MsgType.error, msg);
      });
    // return returnValue;
  };

  return (
    <Container>
      {msg.show && <Msg {...msg} key={"msg"} />}
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select label="Type" name="type" value={type} onChange={(e) => setType(e.target.value as Type)}>
                <MenuItem value={Type.HealthCheck}>HealthCheck</MenuItem>
                <MenuItem value={Type.OccupationalHealthcare}>OccupationalHealthcare</MenuItem>
                <MenuItem value={Type.Hospital}>Hospital</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Description</InputLabel>
            <TextField name="description" value={formData.description} onChange={handleChangeBasic} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Date</InputLabel>
            <TextField type="date" name="date" value={formData.date} onChange={handleChangeBasic} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Specialist</InputLabel>
            <TextField name="specialist" value={formData.specialist} onChange={handleChangeBasic} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Diagnosis Codes</InputLabel>
            <Autocomplete
              multiple
              id="tags-standard"
              options={diagnosisList}
              getOptionLabel={(option) => option.code}
              onChange={(e, newvalue) =>
                {
                  let listString: string[] = [];
                  newvalue.forEach((e) => {
                    listString.push(e.code);
                  });
                  setFormData({ ...formData, diagnosisCodes: listString });
                }
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          {type === Type.HealthCheck && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Heath check rating</InputLabel>
                <Select
                  label="healthCheckRating"
                  name="healthCheckRating"
                  value={healthCheckRating}
                  onChange={(e) => setHealthCheckRating(e.target.value as HealthCheckRating)}
                >
                  <MenuItem value={HealthCheckRating.CriticalRisk}>{HealthCheckRating.CriticalRisk}</MenuItem>
                  <MenuItem value={HealthCheckRating.Healthy}>{HealthCheckRating.Healthy}</MenuItem>
                  <MenuItem value={HealthCheckRating.HighRisk}>{HealthCheckRating.HighRisk}</MenuItem>
                  <MenuItem value={HealthCheckRating.LowRisk}>{HealthCheckRating.LowRisk}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          {type === Type.OccupationalHealthcare && (
            <>
              <Grid item xs={12}>
                <InputLabel>Employee</InputLabel>
                <TextField
                  label="Employee"
                  name="employe"
                  value={occupationalHealthcare.employerName}
                  onChange={(e) => setOccupationalHealthcare({ employerName: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Start date</InputLabel>
                <TextField
                  type="date"
                  value={occupationalHealthcare.sickLeave?.startLeave}
                  onChange={(e) =>
                    setOccupationalHealthcare({
                      ...occupationalHealthcare,
                      sickLeave: {
                        startLeave: e.target.value,
                        endDate: !occupationalHealthcare.sickLeave ? " " : occupationalHealthcare.sickLeave.endDate,
                      },
                    })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>End date</InputLabel>
                <TextField
                  type="date"
                  value={occupationalHealthcare.sickLeave?.endDate}
                  onChange={(e) =>
                    setOccupationalHealthcare({
                      ...occupationalHealthcare,
                      sickLeave: {
                        endDate: e.target.value,
                        startLeave: !occupationalHealthcare.sickLeave ? " " : occupationalHealthcare.sickLeave.startLeave,
                      },
                    })
                  }
                  fullWidth
                />
              </Grid>
            </>
          )}
          {type === Type.Hospital && (
            <>
              <Grid item xs={12}>
                <InputLabel>Discharge date</InputLabel>
                <TextField type="date" value={hospital.date} onChange={(e) => setHospital({ ...hospital, date: e.target.value })} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Discharge Criteria</InputLabel>
                <TextField
                  type="text"
                  label="Criteria"
                  value={hospital.criteria}
                  onChange={(e) => setHospital({ ...hospital, criteria: e.target.value })}
                  fullWidth
                />
              </Grid>
            </>
          )}
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Cancel
        </Button>
      </form>
    </Container>
  );
}
