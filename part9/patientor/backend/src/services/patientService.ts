import patients from "../data/patient";
import { NonSensitivePatientEntry } from "../types";

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

export default {
  getNonSensitiveEntries
};
