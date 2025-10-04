# Product Requirements Document (PRD)

## 1. Goal

Build a local competition management system to be used over a LAN network.
The system allows:

* **Admin**: manages competitors, judges, and competition sessions.
* **Competitor**: selects questions and submits answers.
* **Judge**: evaluates competitors and provides scores.
* **Results**: updated live via `socket.io` for all participants.

## 2. Features

* Authentication (basic, local network).
* Admin dashboard to create/manage competitions.
* Competitors can join and see assigned questions.
* Judges can score answers.
* Live updates of results using WebSockets.
* Database stored in PostgreSQL (via Docker).

## 3. Tech Stack

* **Frontend:** Vite + React + Tailwind CSS
* **Backend:** Node.js + Express + Drizzle ORM
* **Database:** PostgreSQL 18
* **Realtime:** socket.io
* **Deployment:** Docker & Docker Compose (LAN usage)

## 4. Constraints

* Runs only on local network (LAN).
* Admin must initialize competition and manage judges.
* Minimal UI (functionality over design).
