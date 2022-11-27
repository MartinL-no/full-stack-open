import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Female, Male } from "@mui/icons-material";

import Entries from "./Entries";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, addPatientDetails } from "../state";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const fullPatientDetails = Object.values(patients).find(p => p.id === id && p.ssn);

  React.useEffect(() => {
    const fetchPatient = async () => {
      if (fullPatientDetails === undefined) {
        try {
          const { data: patientDetailsFromApi } = await axios.get<Patient>(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(addPatientDetails(patientDetailsFromApi));
        } catch (e) {
        console.error(e);
        }
      }
    };
    void fetchPatient();
  }, []);

  const genderIcon = fullPatientDetails?.gender === "female" ? <Female /> : <Male />;
  const hasEntries = Boolean(fullPatientDetails?.entries && fullPatientDetails.entries.length > 0);

  return (
    <>
      <h2>{fullPatientDetails?.name} {genderIcon}</h2>
      <p>ssn: {fullPatientDetails?.ssn}</p>
      <p>occupation: {fullPatientDetails?.occupation}</p>
      {hasEntries && <Entries />}
    </>
  );
};

export default PatientPage;