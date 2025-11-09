import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const API = "http://localhost:4000/api/events";

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const [form, setForm] = useState({ title: "", description: "", location: "", starts_at: "", ends_at: "" });

  useEffect(() => {
    if (editing) {
      fetch(`${API}/${id}`).then(r => r.json()).then(data => {
        setForm({
          title: data.title ?? "",
          description: data.description ?? "",
          location: data.location ?? "",
          starts_at: data.starts_at?.slice(0,16) ?? "",
          ends_at: data.ends_at ? data.ends_at.slice(0,16) : ""
        });
      });
    }
  }, [editing, id]);

  async function onSubmit(e) {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `${API}/${id}` : API;
    const body = {
      ...form,
      starts_at: form.starts_at ? new Date(form.starts_at) : null,
      ends_at: form.ends_at ? new Date(form.ends_at) : null
    };
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    navigate("/");
  }

  return (
    <form onSubmit={onSubmit} className="card p-3">
      <h4 className="mb-3">{editing ? "Edit Event" : "Add Event"}</h4>
      <div className="mb-2">
        <label className="form-label">Title</label>
        <input className="form-control" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required/>
      </div>
      <div className="mb-2">
        <label className="form-label">Description</label>
        <textarea className="form-control" rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}/>
      </div>
      <div className="mb-2">
        <label className="form-label">Location</label>
        <input className="form-control" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}/>
      </div>
      <div className="mb-2">
        <label className="form-label">Starts at</label>
        <input type="datetime-local" className="form-control" value={form.starts_at} onChange={e => setForm({ ...form, starts_at: e.target.value })} required/>
      </div>
      <div className="mb-3">
        <label className="form-label">Ends at</label>
        <input type="datetime-local" className="form-control" value={form.ends_at} onChange={e => setForm({ ...form, ends_at: e.target.value })}/>
      </div>
      <button className="btn btn-primary">{editing ? "Save" : "Create"}</button>
    </form>
  );
}
