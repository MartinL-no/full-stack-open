import Box from '@mui/material/Box';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

import {boxStyle} from './styles'; 
import { HealthCheckEntry as HealthCheckEntryType } from "../types";
import { useStateValue } from '../state';

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  const favoriteIconColour = entry.healthCheckRating === 1 ? 'yellow' : 'green';
  console.log(entry);
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
        {entry && <MedicalServicesIcon />}
      </p>
      <p><i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes?.map(c => (
          <li key={c}>{c} {getDiagnosisDescription(c)}</li>
          ))}
      </ul>
      <p><FavoriteIcon sx={{ color: favoriteIconColour }}/></p>
      <p>diagnose by {entry.specialist}</p>
    </Box>
  );
};

export default HealthCheckEntry;