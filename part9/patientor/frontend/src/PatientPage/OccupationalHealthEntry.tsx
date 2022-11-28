import Box from '@mui/material/Box';
import WorkIcon from '@mui/icons-material/Work';

import { boxStyle } from './styles';

import { useStateValue } from '../state';
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from "../types";

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcareEntryType }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnosisDescription = (code: string) => {
     const description = Object.values(diagnoses)
       .reduce((accumulator, d) => {
         if (d.code === code) accumulator = d.name;
         return accumulator;
       }, '');
    
     return description;
  };

  return (
    <Box sx={boxStyle}>
      <p>
        {entry.date + ' '}
        <WorkIcon />
        <i> {entry.employerName}</i>
      </p>
      <p><i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes?.map(c => (
          <li key={c}>{c} {getDiagnosisDescription(c)}</li>
        ))}
      </ul>
      {entry.sickLeave && 
        <p>sick from {entry?.sickLeave?.startDate} to {entry?.sickLeave?.endDate}</p>
      }
      <p>diagnose by {entry.specialist}</p>
    </Box>
  );
};

export default OccupationalHealthcareEntry;