import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:4000/api/events";

export default function EventsList() {
  const [events, setEvents] = useState([]);

  async function load() {
    const res = await fetch(API);
    setEvents(await res.json());
  }
  async function remove(id) {
    if (!confirm("Delete this event?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    load();
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <h2 className="mb-3 text-center">All Events</h2>
      <div
        className="list-group"
        style={{
          maxWidth: "800px", // makes the list narrower
          margin: "0 auto", // centers it
        }}
      >
        {events.map((e) => (
          <div key={e.id} className="list-group-item d-flex justify-content-between align-items-center mb-3 shadow-sm rounded">
            <div>
              <h5 className="mb-1">{e.title}</h5>
              <small>
                {new Date(e.starts_at).toLocaleString()}{" "}
                {e.location ? "• " + e.location : ""}
              </small>
            </div>
            <div>
              <Link to={`/events/${e.id}`} className="btn btn-sm btn-outline-primary me-2">
                View
              </Link>
              <Link to={`/edit/${e.id}`} className="btn btn-sm btn-outline-secondary me-2">
                Edit
              </Link>
              <button onClick={() => remove(e.id)} className="btn btn-sm btn-outline-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
