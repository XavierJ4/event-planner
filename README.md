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

#### 1. Database
Log into MySQL (Workbench or CLI) and run:
```sql
CREATE DATABASE IF NOT EXISTS event_planner CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE event_planner;

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT,
  location VARCHAR(120),
  starts_at DATETIME NOT NULL,
  ends_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

2. Backend (server)

From the server/ folder:

cd server
npm install

Create a .env file (in server/) with:

DB_HOST=127.0.0.1
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=event_planner
DB_PORT=3306
PORT=4000

Then start the server:

npm run dev

You should see: API running on http://localhost:4000
3. Frontend (client)

From the client/ folder:

cd ../client
npm install
npm install react-router-dom   # if not already installed
npm run dev

Then open http://localhost:5173

in your browser.
API Endpoints

Base URL: http://localhost:4000/api/events
Method	Endpoint	Description
GET	/	List all events
GET	/:id	Get details for one event
POST	/	Create a new event
PUT	/:id	Update an existing event
DELETE	/:id	Delete an event

Example POST body:

{
  "title": "Team Meeting",
  "description": "Monthly sync-up",
  "location": "Conference Room A",
  "starts_at": "2025-11-15T14:00:00.000Z",
  "ends_at": "2025-11-15T15:00:00.000Z"
}

    The server converts the ISO timestamps into MySQL DATETIME format (YYYY-MM-DD HH:MM:SS) before saving.

Environment Variables (server/.env)
Key	Example	Description
DB_HOST	127.0.0.1	MySQL host
DB_USER	root	MySQL user
DB_PASSWORD	YourStrongPassword	MySQL user password
DB_NAME	event_planner	Database name
DB_PORT	3306	MySQL port
PORT	4000	Express server port