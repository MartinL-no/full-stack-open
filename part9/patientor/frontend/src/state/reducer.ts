import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_DETAILS";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        patientId: Patient['id'],
        newEntry: Entry
      };
  };
  
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_DETAILS":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const patient = Object.values(state.patients).find(p => p.id === action.payload.patientId);
      patient?.entries?.push(action.payload.newEntry);

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: patient as Patient
          }
        };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const setDiagnosesList = (diagnosesListFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosesListFromApi
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const addPatientDetails = (patientDetailsFromApi: Patient): Action => {
  return {
    type: "ADD_PATIENT_DETAILS",
    payload: patientDetailsFromApi
  };
};

export const addEntry = (patientId: Patient['id'], newEntry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { patientId, newEntry }
  };
};