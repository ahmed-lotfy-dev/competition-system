# Docker Setup

## Overview

المشروع يشتغل عبر **Docker Compose** بحيث كل مكون يبقى في خدمة مستقلة:

* **backend**: Express.js + Socket.io API.
* **frontend**: Next.js (أو React build مع nginx).
* **database**: SQLite (ملف `.sqlite` يتخزن في volume مش في container نفسه).

---

## docker-compose.yml (مبدئي)

```yaml
version: "3.9"

services:
  backend:
    build: ./backend
    container_name: competition-backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/usr/src/app
      - ./data:/usr/src/app/data   # مكان ملف SQLite
    depends_on:
      - frontend

  frontend:
    build: ./frontend
    container_name: competition-frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/usr/src/app

  # SQLite مش محتاج سيرفس منفصل، مجرد ملف متخزن في ./data
```

---

## Backend Dockerfile

ضعه في `backend/Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "run", "dev"]
```

---

## Frontend Dockerfile

ضعه في `frontend/Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# build لو Next.js
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

---

## Volumes & Data

* مجلد `./data` بيحتوي ملف `database.sqlite` (ده بيتعمل أوتوماتيك أول تشغيل).
* ده يخلي قاعدة البيانات محفوظة حتى بعد إعادة تشغيل الـ containers.

---

## Usage

```bash
# تشغيل الكل
docker compose up --build

# وقف كل الخدمات
docker compose down
```

بعد التشغيل:

* **Frontend** على: `http://localhost:3000`
* **Backend API** على: `http://localhost:5000/api`
* **Socket.io** على: `http://localhost:5000`
