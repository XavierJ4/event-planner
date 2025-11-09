import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EventsList from "./pages/EventsList";
import EventForm from "./pages/EventForm";
import EventDetails from "./pages/EventDetails";
import CalendarPage from "./pages/CalendarPage"; // <-- add

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <Link to="/" className="navbar-brand">Event Planner</Link>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Events</Link>
          <Link to="/new" className="nav-link">Add Event</Link>
          <Link to="/calendar" className="nav-link">Calendar</Link> {/* <-- add */}
        </div>
      </nav>
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/new" element={<EventForm />} />
          <Route path="/edit/:id" element={<EventForm />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/calendar" element={<CalendarPage />} /> {/* <-- add */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
