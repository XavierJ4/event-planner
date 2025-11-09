# Event Planner

A lightweight full‐stack application to create, list, update and delete events.  
Built with React (Vite) on the front end, Node.js + Express on the backend, and MySQL for the database.

---

## Features
- Create new events with title, description, location and start/end times  
- View all events (most recent first)  
- Edit existing events  
- Delete events  
- Proper date/time handling so MySQL `DATETIME` fields work with browser ISO timestamps  

---

## Tech Stack
- **Frontend**: React (via Vite), React Router for navigation, Bootstrap for UI styling  
- **Backend**: Node.js, Express, `mysql2` promise pool, dotenv for environment variables, CORS for API access  
- **Database**: MySQL (you’ll create database & table manually)  

---

## Project Structure

event-planner/
- ├── client/ # React frontend (Vite)
- │ ├── node_modules/
    - │     ├── package.json
    - │     ├── vite.config.js
- │ └── src/
    - │     ├── main.jsx
    - │     ├── App.jsx
- │ └── pages/
    - │     ├── EventsList.jsx
    - │     ├── EventForm.jsx
    - │     └── EventDetails.jsx
- └── server/ # Express backend
    -   ├── node_modules/
    -   ├── package.json
- ├── app.js
- ├── db.js
- └── routes/
    -   └── events.js



---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)  
- MySQL installed & running  
- MySQL user & password with access to create a database  

### Setup

1. Database

Log into MySQL (Workbench or CLI) and run: http://localhost:5173