# System Architecture

## Overview

The system is built as a **monorepo** with separate `frontend` and `backend` services.
Postgres database is containerized. All services are orchestrated with `docker-compose`.

## Components

1. **Frontend**

   * Built with Vite + React.
   * Connects to backend REST API + socket.io.
   * Provides UI for Admin, Competitors, and Judges.

2. **Backend**

   * Express.js REST API.
   * Drizzle ORM for PostgreSQL queries.
   * Socket.io for real-time updates.
   * API exposed on port `5000`.

3. **Database**

   * PostgreSQL 18 running in a container.
   * Holds users, competitions, results.

## Data Flow

* Admin creates competitions/questions.
* Competitor selects a question → event sent to backend.
* Judges evaluate competitor → backend stores result.
* Socket.io pushes updated results to Admin & Competitors.
