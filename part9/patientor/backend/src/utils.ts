import { Gender, NewPatient, Entry, NewEntry, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error ('Incorrect or missing date ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender:' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const isEntry = (entry: unknown): entry is Entry => {
  if (!entry) {return false;}
  return true;
};

const parseEntry = (entry: unknown): Entry => {
  if (!isEntry(entry)) {
    throw new Error('Error with entry');
  }
  return entry; 
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating:' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing employer name');
  }
  return criteria;
};

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries?: unknown };

const toNewPatient = (object: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };

  return newPatient;
};

type EntryFields = {
  type: unknown,
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes?: unknown
  employerName?: unknown,
  healthCheckRating?: unknown,
  discharge?: {
    date: unknown,
    criteria: unknown
  },
  sickLeave?: {
    startDate: unknown,
    endDate: unknown
  }
};

const toNewPatientEntry = (object: EntryFields): NewEntry => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const assertNever = (value: any): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const BaseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: object.diagnosisCodes ? [] : object.diagnosisCodes as string[],
  };

  switch (object.type) {
    case 'OccupationalHealthcare':
      const OccupationalHealthcareEntry: NewEntry = {
        ... BaseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(object.employerName),
      };
      if (object.sickLeave) {
        OccupationalHealthcareEntry.sickLeave = {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate)
        };
      }
      return OccupationalHealthcareEntry;
    case 'HealthCheck':
      const healthCheckEntry: NewEntry = {
        ... BaseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
      return healthCheckEntry;
    case 'Hospital':
      const hospitalEntry: NewEntry = {
        ... BaseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.discharge?.date),
          criteria: parseCriteria(object.discharge?.criteria)
        }
      };
      return hospitalEntry;
    default:
      return assertNever(object);
    }
};

export { toNewPatient, toNewPatientEntry, parseEntry };