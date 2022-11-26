import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);

  if (patient === null) {
    res.send({ error: 'patient not found'});
  } 

  res.send(patient);
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });

  res.send(newPatientEntry);
});

export default router;