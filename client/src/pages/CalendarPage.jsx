import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// FullCalendar styles (v5+)

const API = "http://localhost:4000/api/events";

function normalize(dateLike) {
  // Accepts MySQL DATETIME (e.g., "2025-03-01 10:00:00") or ISO string.
  if (!dateLike) return null;
  const d = new Date(dateLike);
  if (isNaN(d)) return null;
  return d.toISOString(); // FullCalendar accepts ISO strings
}

export default function CalendarPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API);
        const json = await res.json();
        setRows(json);
      } catch (e) {
        console.error("Failed to load events", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const events = useMemo(
    () =>
      rows.map((e) => ({
        id: String(e.id),
        title: e.title,
        start: normalize(e.starts_at),
        end: normalize(e.ends_at),
        allDay: false,
        extendedProps: {
          location: e.location ?? "",
          description: e.description ?? "",
        },
      })),
    [rows]
  );

  function renderEventContent(arg) {
    const { title } = arg.event;
    const loc = arg.event.extendedProps.location;
    return (
      <div className="fc-event-custom">
        <div className="fw-semibold">{title}</div>
        {loc ? <div className="small text-muted">{loc}</div> : null}
      </div>
    );
  }

  function onEventClick(info) {
    // Navigate to your existing details page
    window.location.href = `/events/${info.event.id}`;
  }

  return (
    <div className="card p-3">
      <h3 className="mb-3">Public Calendar</h3>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="500px" // let it size to content
          contentHeight="100px" // or a pixel value, e.g. "900px"
          expandRows={true} // evenly stretch rows to fill height
          events={events}
          eventContent={renderEventContent}
          eventClick={onEventClick}
          nowIndicator={true}
        />
      )}
    </div>
  );
}
