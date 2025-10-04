# 🏆 Competition System

منصة لإدارة مسابقات (متسابقين – محكمين – أدمن) تعمل عبر الشبكة المحلية **LAN** باستخدام **Docker**.
المنصة فيها واجهة أمامية (Next.js) + واجهة خلفية (Express.js + SQLite) مع تواصل حي عبر **Socket.IO**.

---

## 🚀 Features

* 👤 **الأدوار**: أدمن، محكم، متسابق.
* 📝 **إدارة الأسئلة** من الأدمن/اللجنة.
* 🎯 **اختيار الأسئلة** من قِبل المتسابقين.
* ⚖️ **التحكيم والتقييم** من المحكمين.
* 📡 **تحديثات لحظية** عبر Socket.IO (الأسئلة + النتائج).
* 🐳 **تشغيل كامل عبر Docker Compose**.
* 🗄️ **قاعدة بيانات SQLite** سهلة النسخ الاحتياطي (ملف SQL واحد).

---

## 📂 Project Structure

``` 
competition-system/
├── backend/          # Express.js + Socket.IO API
├── frontend/         # Vite app
├── docs/             # Documentation (API, PRD, Schema...)
├── docker-compose.yml
└── README.md
```

📄 الوثائق الكاملة موجودة في فولدر [`docs/`](./docs).

---

## ⚙️ Tech Stack

* **Frontend:** Next.js + TailwindCSS
* **Backend:** Express.js + Socket.IO
* **Database:** Postgres
* **Containerization:** Docker & Docker Compose

---

## 🛠️ Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/competition-system.git
cd competition-system
```

### 2. Build & Run with Docker Compose

```bash
docker-compose up --build
```

### 3. Access the system

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:5000](http://localhost:5000)

---

## 🗂️ Documentation

* [Product Requirements (PRD)](./docs/PRD.md)
* [System Architecture](./docs/ARCHITECTURE.md)
* [API Specification](./docs/API_SPEC.md)
* [Database Schema](./docs/DATABASE_SCHEMA.md)
* [Socket Events](./docs/SOCKET_EVENTS.md)
* [Docker Setup](./docs/DOCKER_SETUP.md)

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/new-idea`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📜 License

MIT License – feel free to use it for your own projects.
