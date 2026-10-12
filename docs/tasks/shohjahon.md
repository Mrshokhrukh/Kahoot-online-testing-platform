# Test Natijalari — Shohjahon

**Branch:** `feature/results`

---

## Sizga tegishli sahifalar

| Sahifa | Route |
|--------|-------|
| TestResultsPage | `/teacher/tests/:testId/results` |
| GroupResultsPage | `/teacher/groups/:groupId/results` |

---

## Sizga tegishli fayllar

```
src/
├── components/results/
│   ├── ResultsSummaryBar.jsx
│   ├── AttendanceTable.jsx
│   ├── ScoreTable.jsx
│   ├── QuestionAnalysisPanel.jsx
│   └── ExportButton.jsx
├── pages/teacher/results/
│   ├── TestResultsPage.jsx
│   └── GroupResultsPage.jsx
└── hooks/results/
    ├── useTestResults.js
    └── useGroupResults.js
```

---

## Har sahifaning funksionalligi

**TestResultsPage** `/teacher/tests/:testId/results`

**1. `ResultsSummaryBar`** — yuqori qismda 5 ta statistika:
- Ishtirokchilar: 18/22
- O'rtacha ball: 73/100
- O'rtacha o'zlashtirish: 73%
- Eng yuqori ball: 95/100
- Eng past ball: 42/100

**2. `AttendanceTable`** — qatnashish jadvali:
| Ism | Holat | Kirish vaqti | Tugatish vaqti |
|-----|-------|-------------|----------------|
| Ali | ✅ Qatnashdi | 20:00 | 20:28 |
| Vali | ❌ Qatnashmadi | — | — |

**3. `ScoreTable`** — ballar jadvali (saralash: ball bo'yicha):
| # | Ism | Ball | % | To'g'ri/Jami | Davomiyligi |
|---|-----|------|---|--------------|-------------|
| 1 | Ali | 95 | 95% | 19/20 | 28 daqiqa |

- Har qatorda: o'quvchi ismi → bosilganda Doniyor sahifasiga

**4. `QuestionAnalysisPanel`** — qaysi savol qiyin bo'ldi:
- Har savol uchun: to'g'ri javob foizi
- "Eng qiyin savol" — eng past foizli

**5. `ExportButton`** — natijalarni CSV formatida yuklash

---

**GroupResultsPage** `/teacher/groups/:groupId/results`
- Ushbu guruhning barcha testlari ro'yxati
- Har test: nomi, sana, o'rtacha ball, ishtirok foizi
- Bosilganda → `TestResultsPage` ga

---

## Mock ma'lumot

```js
// src/mocks/resultsMock.js
export const mockTestResults = {
  testName: '5-dars testi', totalStudents: 22,
  summary: { attended: 18, avgScore: 73, maxScore: 95, minScore: 42 },
  attendanceList: [
    { id: 's1', name: 'Ali Karimov', attended: true,
      startTime: '20:00', endTime: '20:28' },
    { id: 's2', name: 'Vali Toshmatov', attended: false,
      startTime: null, endTime: null },
  ],
  scoreList: [
    { rank: 1, id: 's1', name: 'Ali Karimov',
      score: 95, percentage: 95, correct: 19, total: 20, durationMinutes: 28 },
  ],
  questionAnalysis: [
    { questionNumber: 1, questionText: 'useState nima?', correctRate: 89 },
    { questionNumber: 3, questionText: 'Virtual DOM ni tushuntiring.', correctRate: 44 },
  ],
}
```

---

## Qoidalar

1. `ScoreTable` da saralash (ustun sarlavhasiga bosib): ball, ism, foiz bo'yicha
2. Jadvallar scroll bo'lsin (ko'p o'quvchi bo'lganda)
3. `ExportButton` — `JSON.stringify` → blob → link.click() bilan CSV-ga o'xshash eksport
4. 0 ball olgan — qizil rang, 90+ ball — yashil rang

---

## Ishlash tartibi

1. `useTestResults.js` — mock natijalar
2. `ResultsSummaryBar.jsx`
3. `AttendanceTable.jsx`
4. `ScoreTable.jsx` — saralash bilan
5. `QuestionAnalysisPanel.jsx`
6. `ExportButton.jsx`
7. `TestResultsPage.jsx` — barchani birlashtirish
8. `useGroupResults.js` → `GroupResultsPage.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida Test Natijalari qurmoqdaman. Ism: Shohjahon.
Stack: React + Vite (JSX), TailwindCSS v4.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/results/, src/pages/teacher/results/
Mock: src/mocks/resultsMock.js

Birinchi useTestResults.js yarating:
- testResults, isLoading, loadError holatlari
- sortField, sortDirection holatlari ('score'|'name', 'asc'|'desc')
- setSortField(field) — sortedScoreList yangilanadi
- setTimeout 600ms bilan mock yuklash
```
