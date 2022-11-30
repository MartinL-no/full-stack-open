import express from "express";
import patientService from "../services/patientService";
import { toNewPatient, toNewPatientEntry } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);

  if (patient === null) res.send({ error: 'patient not found'});

  res.send(patient);
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = toNewPatient(req.body);
  const newPatientWithId = patientService.addPatient(newPatient);

  res.send(newPatientWithId);
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewPatientEntry(req.body);
    const newEntryWithId = patientService.addPatientEntry(req.params.id, newEntry);

    res.send(newEntryWithId);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;