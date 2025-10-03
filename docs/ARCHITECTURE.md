# System Architecture

## Components

* **Frontend**: واجهة ويب (React/Next.js أو HTML بسيط).
* **Backend**: Express.js + Socket.io.
* **Database**: SQLite (ملف واحد).
* **Docker**: لتشغيل الكل على LAN.

## Flow

1. Admin يضيف سؤال → Socket event `question:new` يروح للمتسابقين والمحكمين.
2. Contestant يرسل إجابة → `answer:new` → يظهر عند الأدمن والمحكمين.
3. Judge يقيّم إجابة → `judge:score` → يتبعت للأدمن والمتسابق.
4. Admin عنده لوحة Dashboard للمتابعة الكاملة.

## Socket.io Events

* `question:new`
* `answer:new`
* `judge:score`
* `results:update`
