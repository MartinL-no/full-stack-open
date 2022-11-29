// ---------------------------------------------------------------------------------------------------------------------------------------
// By: Andrii Dieiev
// From: https://github.com/microsoft/TypeScript/issues/39556#issuecomment-656925230
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// ---------------------------------------------------------------------------------------------------------------------------------------

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum EntryTypes {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

type SickLeave = {
  startDate: string
  endDate: string
};

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

type Discharge = {
  date: string
  criteria: string
};

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry = UnionOmit<Entry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;