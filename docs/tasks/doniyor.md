# Analitika & Grafiklar — Doniyor

**Branch:** `feature/analytics`

---

## Sizga tegishli sahifalar

| Sahifa | Route |
|--------|-------|
| GroupAnalyticsPage | `/teacher/groups/:groupId/analytics` |
| StudentAnalyticsPage | `/teacher/students/:studentId/analytics` |

---

## Sizga tegishli fayllar

```
src/
├── components/analytics/
│   ├── GroupProgressChart.jsx
│   ├── StudentComparisonChart.jsx
│   ├── AttendanceRateCard.jsx
│   ├── TopPerformersCard.jsx
│   ├── StudentProgressChart.jsx
│   ├── SubjectStrengthChart.jsx
│   └── AnalyticsFilterBar.jsx
├── pages/teacher/analytics/
│   ├── GroupAnalyticsPage.jsx
│   └── StudentAnalyticsPage.jsx
└── hooks/analytics/
    ├── useGroupAnalytics.js
    └── useStudentAnalytics.js
```

---

## Kutubxona

```bash
npm install recharts
```

Faqat `recharts` ishlatiladi. Boshqa grafik kutubxona — taqiqlangan.

---

## Har sahifaning funksionalligi

**GroupAnalyticsPage** `/teacher/groups/:groupId/analytics`
- `AnalyticsFilterBar` — vaqt oralig'i: "Oxirgi 7 kun" | "Oxirgi 30 kun" | "Barchasi"

1. **`GroupProgressChart`** — chiziqli grafik (LineChart):
   - X o'qi: test sanasi
   - Y o'qi: o'rtacha ball (0–100)
   - Har test — bitta nuqta
   - Hover: test nomi + o'rtacha ball

2. **`StudentComparisonChart`** — gorizontal ustunli grafik (BarChart):
   - Har o'quvchi — bitta ustun
   - O'rtacha ball bo'yicha
   - Eng yuqori — yashil, eng past — sariq

3. **`AttendanceRateCard`** — doira grafik (PieChart):
   - Qatnashdi / Qatnashmadi nisbati
   - Foiz yozilgan

4. **`TopPerformersCard`** — top 3 o'quvchi (jadval):
   - Ism, o'rtacha ball, qatnashish foizi

**StudentAnalyticsPage** `/teacher/students/:studentId/analytics`
- O'quvchi nomi, email, guruh

1. **`StudentProgressChart`** — chiziqli grafik:
   - Har test bo'yicha ball dinamikasi
   - O'sish/tushish ko'rsatiladi

2. **`SubjectStrengthChart`** — radar yoki bar grafik:
   - Savol turlar bo'yicha: Quiz / T-F / Kod / Ochiq
   - Har turda o'rtacha to'g'rilik foizi

3. So'nggi 10 test tarixi jadvali:
   - Test nomi, sana, ball, foiz, qatnashdi/yo'q

---

## Mock ma'lumot

```js
// src/mocks/analyticsMock.js
export const mockGroupProgressData = [
  { date: '2026-10-01', testName: '1-dars', avgScore: 65 },
  { date: '2026-10-03', testName: '2-dars', avgScore: 71 },
  { date: '2026-10-07', testName: '3-dars', avgScore: 78 },
  { date: '2026-10-10', testName: '4-dars', avgScore: 74 },
]

export const mockStudentComparisonData = [
  { name: 'Ali', avgScore: 85 },
  { name: 'Vali', avgScore: 62 },
  { name: 'Sardor', avgScore: 78 },
]

export const mockStudentProgressData = [
  { date: '2026-10-01', testName: '1-dars', score: 55 },
  { date: '2026-10-03', testName: '2-dars', score: 70 },
  { date: '2026-10-07', testName: '3-dars', score: 85 },
]
```

---

## Qoidalar

1. Barcha grafiklarda recharts `ResponsiveContainer` ishlatiladi (kenglik 100%)
2. Grafik ranglar: asosiy=blue-600, ikkinchi=green-500, uchinchi=yellow-400
3. Grafik yuklanayotganda: `AppSpinner`
4. Ma'lumot yo'q bo'lganda: `EmptyState` ("Hali yetarli ma'lumot yo'q")
5. Tooltip — Uzbekcha: "O'rtacha ball: 78", "Sana: 01.10.2026"

---

## Ishlash tartibi

1. recharts o'rnatish va test qilish
2. `useGroupAnalytics.js` — mock ma'lumot + filter
3. `GroupProgressChart.jsx` (LineChart)
4. `StudentComparisonChart.jsx` (BarChart)
5. `AttendanceRateCard.jsx` (PieChart)
6. `TopPerformersCard.jsx`
7. `GroupAnalyticsPage.jsx`
8. `useStudentAnalytics.js` → `StudentProgressChart.jsx` → `StudentAnalyticsPage.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida Analitika & Grafiklar qurmoqdaman. Ism: Doniyor.
Stack: React + Vite (JSX), TailwindCSS v4, recharts.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/analytics/, src/pages/teacher/analytics/
Mock: src/mocks/analyticsMock.js

Birinchi GroupProgressChart.jsx yarating:
recharts LineChart bilan. ResponsiveContainer width='100%' height=300.
Data: [{ date, testName, avgScore }]
X o'qi: date, Y o'qi: avgScore (0–100).
Hover tooltip: testName + avgScore.
```
