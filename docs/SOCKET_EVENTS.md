# Socket.io Events

## Events

### `question:new`

* Triggered: عند إضافة سؤال جديد من الأدمن.
* Payload:

```json
{ "id": 1, "text": "سؤال جديد" }
```

### `answer:new`

* Triggered: عند إرسال إجابة من متسابق.
* Payload:

```json
{ "contestantId": 3, "questionId": 1, "answer": "النص" }
```

### `judge:score`

* Triggered: عند تقييم محكم لإجابة.
* Payload:

```json
{ "judgeId": 2, "answerId": 5, "score": 1, "comment": "إجابة صحيحة" }
```

### `results:update`

* Triggered: عند تغيير النتائج.
* Payload:

```json
{ "contestantId": 3, "totalScore": 10 }
```
