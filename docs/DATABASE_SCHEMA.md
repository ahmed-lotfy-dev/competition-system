# Database Schema

## Tables

### users

| Column     | Type      | Notes                      |
| ---------- | --------- | -------------------------- |
| id         | INTEGER   | Primary Key                |
| name       | TEXT      | اسم المستخدم               |
| role       | TEXT      | admin / judge / contestant |
| created_at | TIMESTAMP |                            |

### questions

| Column     | Type      | Notes       |
| ---------- | --------- | ----------- |
| id         | INTEGER   | Primary Key |
| text       | TEXT      | نص السؤال   |
| created_by | INTEGER   | FK → users  |
| created_at | TIMESTAMP |             |

### contestant_answers

| Column        | Type      | Notes          |
| ------------- | --------- | -------------- |
| id            | INTEGER   | Primary Key    |
| contestant_id | INTEGER   | FK → users     |
| question_id   | INTEGER   | FK → questions |
| answer_text   | TEXT      | إجابة المتسابق |
| created_at    | TIMESTAMP |                |

### judge_scores

| Column               | Type      | Notes                   |
| -------------------- | --------- | ----------------------- |
| id                   | INTEGER   | Primary Key             |
| judge_id             | INTEGER   | FK → users              |
| contestant_answer_id | INTEGER   | FK → contestant_answers |
| score                | INTEGER   | 0/1 أو درجات            |
| comment              | TEXT      | تعليق المحكم            |
| created_at           | TIMESTAMP |                         |
