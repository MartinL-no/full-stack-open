import { useParams } from "react-router-dom";

import { Patient, Entry } from "../types";
import { useStateValue } from "../state";
import EntryDetails from "./EntryDetails";

const Entries = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();
  const { entries } = Object.values(patients).find(p => p.id === id) as Patient;

  return (
    <>
      <h2>entries</h2>

      {entries?.map((e: Entry) => (
        <EntryDetails key={e.id} entry={e} />
      ))}
    </>
  );
};

export default Entries;