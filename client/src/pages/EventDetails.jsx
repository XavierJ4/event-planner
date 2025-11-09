import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const API = "http://localhost:4000/api/events";

export default function EventDetails() {
  const { id } = useParams();
  const [e, setE] = useState(null);
  useEffect(() => { fetch(`${API}/${id}`).then(r => r.json()).then(setE); }, [id]);
  if (!e) return <p>Loading…</p>;
  return (
    <div className="card p-3">
      <h3>{e.title}</h3>
      <p className="text-muted">{new Date(e.starts_at).toLocaleString()} {e.location ? "• " + e.location : ""}</p>
      {e.description && <p>{e.description}</p>}
      {e.ends_at && <p>Ends: {new Date(e.ends_at).toLocaleString()}</p>}
      <Link to={`/edit/${e.id}`} className="btn btn-outline-secondary">Edit</Link>
    </div>
  );
}
