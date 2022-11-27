import { v1 as uuid } from 'uuid';

import patients from "../data/patient";
import { NonSensitivePatientEntry, NewPatientEntry, Patient } from "../types";

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>{
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

const getPatient = (id: string): Patient | null => {
  const patient = patients.find(p => p.id === id);

  if (patient === undefined) return null;

  return {
    id: patient.id,
    name: patient.name,
    ssn: patient.ssn,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries
  };
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = { id: uuid(), ...entry };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  getPatient,
  addPatient
};
