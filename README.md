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
```sql

event-planner/
├── client/ # React frontend (Vite)
│ ├── node_modules/
│     ├── package.json
│     ├── vite.config.js
│ └── src/
│     ├── main.jsx
│     ├── App.jsx
│ └── pages/
│     ├── EventsList.jsx
│     ├── EventForm.jsx
│     └── EventDetails.jsx
└── server/ # Express backend
├── node_modules/
    ├── package.json
    |── app.js
    ├── db.js
└── routes/
    └── events.js
|── requirements.txt
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)  
- MySQL installed & running  
- MySQL user & password with access to create a database  

## Setup

### 1. Database

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
```
---

### 2. Backend (server)

From the server/ folder:
```sql

cd server
npm install

```
Create a .env file (inside server/) with:
```sql

DB_HOST=127.0.0.1
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=event_planner
DB_PORT=3306
PORT=4000

```
Then start the server:
```sql

npm run dev

```
You should see:

API running on http://localhost:4000

---

### 3. Frontend (client)

From the client/ folder:
```sql

cd ../client
npm install
npm run dev

```
Then open:
👉 http://localhost:5173

---

### Requirements

This project uses both frontend (React) and backend (Node.js + MySQL) dependencies.
All dependencies are listed in the requirements.txt file at the project root.

You can use this file to review or reinstall all versions consistently.

## Dependencies included:

```sql
@fullcalendar/core==6.1.19
@fullcalendar/daygrid==6.1.19
@fullcalendar/interaction==6.1.19
@fullcalendar/react==6.1.19
@fullcalendar/timegrid==6.1.19
bootstrap==5.3.8
react==19.1.1
react-dom==19.1.1
react-router-dom==7.9.5
express==4.19.2
mysql2==3.11.3
cors==2.8.5
dotenv==16.4.5
nodemon==3.1.3
```