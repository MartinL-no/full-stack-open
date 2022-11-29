import { v1 as uuid } from 'uuid';

import patients from "../data/patient";
import { NonSensitivePatientEntry, NewPatient, Patient, Entry, NewEntry } from "../types";

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) =>{
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
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

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...entry };

  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (patientId: Patient['id'], newEntry: NewEntry): Patient | null => {
  const patient = patients.find(p => p.id === patientId);
  
  if (patient === undefined) return null;

  const entry: Entry = { id: uuid(), ...newEntry };
  patient.entries =[...patient.entries, entry];

 return patient;
};

export default {
  getNonSensitiveEntries,
  getPatient,
  addPatient,
  addPatientEntry
};