# Database Schema

This project uses **PostgreSQL** as the main database, managed via **Drizzle ORM**.
The schema is designed to support a real-time competition system with roles (Admin, Judge, Contestant), questions, answers, and scoring.

---

## 🗄️ Tables

### 1. `users`

Stores all users in the system.

| Column       | Type      | Constraints                                    | Description             |
| ------------ | --------- | ---------------------------------------------- | ----------------------- |
| `id`         | UUID      | PK, default `gen_random_uuid()`                | Unique user identifier  |
| `name`       | VARCHAR   | NOT NULL                                       | Full name               |
| `role`       | VARCHAR   | CHECK (role IN ('admin','judge','contestant')) | User role in the system |
| `created_at` | TIMESTAMP | DEFAULT now()                                  | When user was added     |

---

### 2. `committees`

Committees that manage questions.

| Column       | Type      | Constraints   | Description          |
| ------------ | --------- | ------------- | -------------------- |
| `id`         | UUID      | PK            | Committee identifier |
| `name`       | VARCHAR   | NOT NULL      | Committee name       |
| `created_at` | TIMESTAMP | DEFAULT now() | Creation timestamp   |

---

### 3. `questions`

Questions created by committees.

| Column         | Type      | Constraints         | Description            |
| -------------- | --------- | ------------------- | ---------------------- |
| `id`           | UUID      | PK                  | Question ID            |
| `committee_id` | UUID      | FK → committees(id) | Belongs to a committee |
| `text`         | TEXT      | NOT NULL            | Question text          |
| `created_at`   | TIMESTAMP | DEFAULT now()       | Created time           |

---

### 4. `answers`

Contestants’ answers to questions.

| Column        | Type      | Constraints        | Description                |
| ------------- | --------- | ------------------ | -------------------------- |
| `id`          | UUID      | PK                 | Answer ID                  |
| `question_id` | UUID      | FK → questions(id) | Related question           |
| `user_id`     | UUID      | FK → users(id)     | Contestant who answered    |
| `text`        | TEXT      | NOT NULL           | The actual answer          |
| `created_at`  | TIMESTAMP | DEFAULT now()      | Answer submitted timestamp |

---

### 5. `judgements`

Judges’ evaluations of answers.

| Column       | Type      | Constraints                                  | Description          |
| ------------ | --------- | -------------------------------------------- | -------------------- |
| `id`         | UUID      | PK                                           | Judgement ID         |
| `answer_id`  | UUID      | FK → answers(id)                             | Answer being judged  |
| `judge_id`   | UUID      | FK → users(id)                               | Judge user ID        |
| `score`      | INT       | NOT NULL, CHECK (score >= 0 AND score <= 10) | Numeric score        |
| `comment`    | TEXT      |                                              | Optional feedback    |
| `created_at` | TIMESTAMP | DEFAULT now()                                | Evaluation timestamp |

---

## 🔌 Relations

* **One `committee` → many `questions`**
* **One `question` → many `answers`**
* **One `answer` → many `judgements`**
* **One `judge` (user with role=judge) → many `judgements`**

---

## ⚡ Notes

* All `UUID` fields use PostgreSQL’s `gen_random_uuid()` (from `pgcrypto`) for primary keys.
* `timestamps` are handled with `DEFAULT now()`.
* Drizzle ORM migrations are used to sync schema changes.
