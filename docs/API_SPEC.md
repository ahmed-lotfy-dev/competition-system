# API Specification

## Users

* `POST /api/users` → إنشاء مستخدم (admin/judge/contestant).
* `GET /api/users` → استرجاع كل المستخدمين.

## Questions

* `POST /api/questions` → إضافة سؤال.
* `GET /api/questions` → كل الأسئلة.

## Answers

* `POST /api/answers` → متسابق يرسل إجابة.
* `GET /api/answers?questionId=...` → استرجاع إجابات سؤال.

## Scores

* `POST /api/scores` → محكم يسجل حكم/درجة.
* `GET /api/scores?answerId=...` → استرجاع أحكام الإجابة.
