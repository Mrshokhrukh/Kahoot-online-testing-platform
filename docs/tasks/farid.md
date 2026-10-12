# Student Test Xonasi — Farid

**Branch:** `feature/test-session`
**To'rtinchi merge qilinadi — Jasur bilan parallel.**

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest platformasida barcha o'quvchilar belgilangan vaqtda bir vaqtda test ishlaydi. Bu tajriba — **sizning vazifangiz**. Siz 3 sahifa yaratasiz: kutish → test ishlash → yakunlash.

Siz platformaning **o'quvchi uchun eng muhim sahifalarini** yaratasiz — bu yerda haqiqiy test ishlash sodir bo'ladi. Vaqt bosimi, savol navigatsiyasi, avtomatik yuborish — barchasi sizda.

### Haqiqiy stsenariy

Ali o'quvchi kechki 19:50 da dashboarddan "Testga kirish" tugmasini bosdi (Jahongir sahifasi). **Sizning** `/test/test1/waiting` sahifasi ochildi. U ko'rdi: katta sanoq — "10:00", "React kursida 18 ta o'quvchi ulandi".

20:00 da sanoq 0 ga yetdi — **sizning** `TestActivePage` i ochildi. 30 daqiqa davomida u 20 ta savolni ishladi:
- 1-savol: Quiz — Jasur yozgan `QuizQuestionView` ko'rindi
- 5-savol: Kod yozish — Monaco Editor ochildi
- "Testni yakunlash" bosdi

**Sizning** `TestCompletePage` i ochildi: "20 ta savoldan 18 tasiga javob berdingiz."

### Siz kimni kutasiz?

- **Jasur** — `QuestionDisplay` komponenti. Jasur tayyor bo'lguncha, o'zingiz placeholder yozing: `<div>Savol: {question.questionText}</div>`. Keyin almashtiring.
- **Fuzayil** — `testStore` dagi `currentAnswers` ob'ekti (javoblarni saqlash uchun), `ROUTES.TEST_WAITING` va `ROUTES.TEST_ACTIVE`.

### Kimlar sizni kutadi?

- **Shohjahon** — "Natijalar" tugmasi `TestCompletePage` da Shohjahon sahifasiga yo'naltiradi (o'qituvchi natijalarni ko'radi)
- **Jahongir** — `TestWaitingPage` ga Jahongir sahifasidan redirect keladi

### Haftalik ish rejasi

**1-kun:**
- `src/mocks/testSessionMock.js` yarating
- `useTestTimer.js` — countdown + test timer

**2-kun:**
- `CountdownTimer.jsx` — soat:daqiqa:soniya format
- `TestWaitingPage.jsx` — 30s mock countdown, keyin avtomatik redirect
- Brauzerda test: countdown ishlayaptimi?

**3-kun:**
- `TestHeader.jsx` — test nomi, savol hisobi, qolgan vaqt
- `TestProgressBar.jsx` — progress foizi
- `AnswerSubmitButton.jsx` — "Keyingi" yoki "Yakunlash"

**4-kun:**
- `useTestSession.js` — joriy savol indeksi, javoblar yig'ish, submit
- `TestActivePage.jsx` — barchani birlashtirish
- `beforeunload` ogohlantirish qo'shing

**5-kun:**
- `TestCompleteScreen.jsx` → `TestCompletePage.jsx`
- To'liq flow brauzerda test qiling
- PR oching

### Muhim nuqtalar

`useTestTimer.js` — ikkita timer boshqaradi:
1. Testgacha qolgan vaqt (`countdownSeconds`) — 0 ga yetganda `isTestStarted=true`
2. Test davomiylik vaqti (`remainingTestSeconds`) — 0 ga yetganda avtomatik yuborish

`beforeunload` event: faqat `isTestStarted=true` bo'lganda faol bo'lsin:
```js
useEffect(() => {
  if (!isTestStarted) return
  const handler = (e) => { e.preventDefault(); e.returnValue = '' }
  window.addEventListener('beforeunload', handler)
  return () => window.removeEventListener('beforeunload', handler)
}, [isTestStarted])
```

Javoblar `{ [questionId]: answer }` formatda saqlanadi — `testStore.currentAnswers` da.

---

## Sizga tegishli sahifalar

| Sahifa | Route | Kim ko'radi |
|--------|-------|-------------|
| TestWaitingPage | `/test/:testId/waiting` | Student |
| TestActivePage | `/test/:testId` | Student |
| TestCompletePage | `/test/:testId/complete` | Student |

---

## Sizga tegishli fayllar

```
src/
├── components/test-session/
│   ├── CountdownTimer.jsx
│   ├── TestProgressBar.jsx
│   ├── TestHeader.jsx
│   ├── AnswerSubmitButton.jsx
│   └── TestCompleteScreen.jsx
├── pages/test-session/
│   ├── TestWaitingPage.jsx
│   ├── TestActivePage.jsx
│   └── TestCompletePage.jsx
└── hooks/test-session/
    ├── useTestWaiting.js
    ├── useTestSession.js
    └── useTestTimer.js
```

---

## Har sahifaning funksionalligi

**TestWaitingPage** `/test/:testId/waiting`
- "Test boshlanishini kuting" sarlavhasi
- Test nomi va guruh nomi
- Katta `CountdownTimer` — testgacha qolgan vaqt (soat : daqiqa : soniya)
- O'quvchilar soni: "[N] kishi ulandi"
- Vaqt 0 ga yetganda → `/test/:testId` ga avtomatik yo'naltirish
- Mock: 30 soniya countdown

**TestActivePage** `/test/:testId`
- `TestHeader` — test nomi, savollar hisobi (1/20), qolgan vaqt
- `TestProgressBar` — qancha savol qoldi (progress)
- Joriy savol — `QuestionDisplay` (Jasur komponenti, mode='view')
- `AnswerSubmitButton` — "Keyingi savol" yoki "Testni yakunlash" (oxirgi savolda)
- Orqaga qaytish mumkin emas — faqat oldinga

**TestCompletePage** `/test/:testId/complete`
- "Test yakunlandi!" xabari
- Yuborilgan javoblar soni: "20 ta savoldan 18 tasiga javob berdingiz"
- "Natijalar e'lon qilinishi kutilmoqda..." (o'qituvchi tekshirgandan keyin ko'rinadi)
- O'quvchi dashboardiga qaytish tugmasi

---

## Mock ma'lumot

```js
// src/mocks/testSessionMock.js
export const mockTestInfo = {
  id: 'test1', name: '5-dars testi',
  groupName: 'React kursi',
  scheduledAt: new Date(Date.now() + 30000).toISOString(), // 30 soniyadan keyin
  durationMinutes: 30,
  questionCount: 3,
}

export const mockQuestionList = [
  { id: 'q1', type: 'quiz', questionText: 'useState nima?',
    answerOptions: ['State boshqarish', 'API', 'Routing', 'Stil'], correctOptionIndex: 0 },
  { id: 'q2', type: 'true_false', questionText: 'React bir tomonlama data flow ishlatadi.',
    correctAnswer: true },
  { id: 'q3', type: 'open', questionText: 'Virtual DOM ni tushuntiring.' },
]
```

---

## Qoidalar

1. `useTestTimer.js` — testgacha qolgan vaqt va test davomidagi vaqtni alohida boshqaradi
2. Vaqt tugaganda (`remainingSeconds === 0`) → test avtomatik yuboriladi
3. `TestActivePage` da sahifadan chiqish (F5, tab yopish) bo'lganda `beforeunload` event:
   "Sahifani yopsangiz, javoblaringiz yo'qolishi mumkin" ogohlantirish
4. Javoblar `testStore` dagi `currentAnswers` ob'ektida saqlanadi: `{ questionId: answer }`
5. `QuestionDisplay` komponenti Jasur yozadi — siz faqat import qilasiz:
   ```jsx
   import QuestionDisplay from '../questions/QuestionDisplay'
   ```

---

## Ishlash tartibi

1. `useTestTimer.js` — countdown + test timer logikasi
2. `CountdownTimer.jsx` → `TestWaitingPage.jsx`
3. `TestHeader.jsx` + `TestProgressBar.jsx`
4. `AnswerSubmitButton.jsx`
5. `useTestSession.js` — savol navigatsiyasi, javoblar yig'ish
6. `TestActivePage.jsx`
7. `TestCompleteScreen.jsx` → `TestCompletePage.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida Student Test Xonasi qurmoqdaman. Ism: Farid.
Stack: React + Vite (JSX), TailwindCSS v4.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/test-session/, src/pages/test-session/
Mock: src/mocks/testSessionMock.js

Birinchi useTestTimer.js yarating:
- countdownSeconds (test boshlanishigacha), remainingTestSeconds (test davomida)
- isTestStarted (bool)
- countdownSeconds 0 ga yetganda → isTestStarted=true, remainingTestSeconds=1800 (30 daqiqa)
- remainingTestSeconds 0 ga yetganda → onTestTimeExpired() callback
- setInterval bilan soniyalar kamaytiriladi
```
