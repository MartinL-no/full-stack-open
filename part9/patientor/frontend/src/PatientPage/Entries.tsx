import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient } from "../types";

const Entries = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();
  const { entries } = Object.values(patients).find(p => p.id === id) as Patient;
  console.log(entries);

  return (
    <>
      <h2>entries</h2>

      {entries?.map(e => (
        <div key={e.id}>
          <p>{e.date} <em>{e.description}</em></p>
          <ul>
            {e.diagnosisCodes?.map(d => <li key={d}>{d}</li>)}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Entries;