import Box from '@mui/material/Box';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { boxStyle } from './styles'; 
import { useStateValue } from '../state';
import { HospitalEntry as HospitalEntryType } from "../types";

const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
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
      <p>{entry.date} </p>
      <p><i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes?.map(c => (
          <li key={c}>{c} {getDiagnosisDescription(c)}</li>
          ))}
      </ul>
      <p>
        <ExitToAppIcon sx={{ color: 'green' }}/>
        {' ' + entry.discharge.date}
        <i> {entry.discharge.criteria}</i>
      </p>
      <p>diagnose by {entry.specialist}</p>
    </Box>
  );
};

export default HospitalEntry;