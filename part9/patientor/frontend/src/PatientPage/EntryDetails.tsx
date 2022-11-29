import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from "./OccupationalHealthEntry";

const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  console.log(entry);
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case  "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
      break;
    default:
      return assertNever(entry);
  }

  return (
    <></>
  );
};

export default EntryDetails;