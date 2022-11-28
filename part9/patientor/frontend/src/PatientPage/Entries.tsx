import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient, Entry } from "../types";

const Entries = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }] = useStateValue();
  const { entries } = Object.values(patients).find(p => p.id === id) as Patient;

  const getDiagnosisDescription = (code: string) => {
    const description = Object.values(diagnoses)
      .reduce((accumulator, d) => {
        if (d.code === code) accumulator = d.name;
        return accumulator;
      }, '');
    
    return description;
  };
  console.log(entries);

  return (
    <>
      <h2>entries</h2>

      {entries?.map((e: Entry) => (
        <div key={e.id}>
          <p>{e.date} <em>{e.description}</em></p>
          <ul>
            {e.diagnosisCodes?.map(d => {
              return <li key={d}>{d} {getDiagnosisDescription(d)}</li>;
          })}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Entries;