import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Female, Male } from "@mui/icons-material";

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
            `${apiBaseUrl}/patients/${id as string}`
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

  return (
    <>
      <h2>{fullPatientDetails?.name} {genderIcon}</h2>
      <p>ssn: {fullPatientDetails?.ssn}</p>
      <p>occupation: {fullPatientDetails?.occupation}</p>
    </>
  );
};

export default PatientPage;