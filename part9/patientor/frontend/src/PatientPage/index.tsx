import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Female, Male } from "@mui/icons-material";
import { Button } from "@material-ui/core";

import { Entry, Patient } from "../types";
import { useStateValue, addPatientDetails, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import Entries from "./Entries";

import AddPatientModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";


const PatientPage = () => {
  const [error, setError] = React.useState<string>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const fullPatientDetails = Object.values(patients).find(p => p.id === id && p.ssn);
  const genderIcon = fullPatientDetails?.gender === "female" ? <Female /> : <Male />;
  const hasEntries = Boolean(fullPatientDetails?.entries && fullPatientDetails.entries.length > 0);
  
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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id as Patient['id'], newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };


  return (
    <>
      <h2>{fullPatientDetails?.name} {genderIcon}</h2>
      <p>ssn: {fullPatientDetails?.ssn}</p>
      <p>occupation: {fullPatientDetails?.occupation}</p>
      {hasEntries && <Entries />}

      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        setError={setError}
      />

      <Button variant="contained" onClick={() => openModal()}>
        Add Entry
      </Button>
    </>
  );
};

export default PatientPage;