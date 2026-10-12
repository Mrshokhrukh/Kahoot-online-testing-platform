# Teacher Dashboard — Shaxruz

**Branch:** `feature/teacher-dashboard`

---

## Sizga tegishli sahifalar

| Sahifa | Route |
|--------|-------|
| TeacherDashboardPage | `/teacher/dashboard` |
| TeacherProfilePage | `/teacher/profile` |

---

## Sizga tegishli fayllar

```
src/
├── components/teacher-dashboard/
│   ├── StatsOverview.jsx
│   ├── GroupSummaryCard.jsx
│   ├── UpcomingTestCard.jsx
│   ├── RecentActivityItem.jsx
│   └── QuickActions.jsx
├── pages/teacher/dashboard/
│   ├── TeacherDashboardPage.jsx
│   └── TeacherProfilePage.jsx
└── hooks/teacher-dashboard/
    └── useTeacherDashboard.js
```

---

## Har sahifaning funksionalligi

**TeacherDashboardPage** `/teacher/dashboard`

Uchta bo'lim:
1. **StatsOverview** — 4 ta statistika kartasi:
   - Jami guruhlar soni
   - Jami o'quvchilar soni
   - O'tkazilgan testlar soni
   - O'rtacha o'zlashtirish foizi

2. **Guruhlar bo'limi** — har guruh uchun `GroupSummaryCard`:
   - Guruh nomi, o'quvchilar soni
   - So'nggi test sanasi
   - "Guruhga o'tish" tugmasi → `/teacher/groups/:groupId`

3. **Yaqin testlar** — `UpcomingTestCard` ro'yxati:
   - Test nomi, guruh, sana+vaqt
   - Qolgan vaqt (countdown: "3 soat 20 daqiqa qoldi")
   - "Monitoring" tugmasi (aktiv test bo'lsa)

4. **Tez harakatlar** — `QuickActions`:
   - "Yangi guruh" tugmasi → `/teacher/groups/new`
   - "Guruhlar" tugmasi → `/teacher/groups`

**TeacherProfilePage** `/teacher/profile`
- Ism, email ko'rsatish
- Parolni o'zgartirish forma
- Saqlanayotgan holat (isLoading)

---

## Mock ma'lumot

```js
// src/mocks/dashboardMock.js
export const mockDashboardStats = {
  groupCount: 4,
  studentCount: 87,
  testCount: 23,
  avgComprehension: 72,
}

export const mockGroupSummaryList = [
  { id: '1', name: 'React kursi', studentCount: 22, lastTestDate: '2026-10-10' },
  { id: '2', name: 'JS asoslari', studentCount: 30, lastTestDate: '2026-10-08' },
]

export const mockUpcomingTestList = [
  { id: 't1', name: '5-dars testi', groupName: 'React kursi',
    scheduledAt: '2026-10-13T20:00:00', status: 'scheduled' },
]
```

---

## Qoidalar

1. Dashboard sahifasi mount bo'lganda mock ma'lumot yuklanadi (setTimeout 600ms)
2. Yaqin test kartasida qolgan vaqt real-time hisoblanadi (`setInterval` 1 daqiqa)
3. Yon panel (sidebar) — `AppSidebar` dan (Azizbek yozadi)
4. Sahifa `AppLayout` wrapper ichida bo'ladi

---

## Ishlash tartibi

1. `useTeacherDashboard.js` hook — mock ma'lumot yuklash
2. `StatsOverview.jsx` — 4 ta stat kartasi
3. `GroupSummaryCard.jsx` → `UpcomingTestCard.jsx`
4. `QuickActions.jsx`
5. `TeacherDashboardPage.jsx` — barchani birlashtirish
6. `TeacherProfilePage.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida Teacher Dashboard qurmoqdaman. Ism: Shaxruz.
Stack: React + Vite (JSX), TailwindCSS v4.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/teacher-dashboard/, src/pages/teacher/dashboard/
Mock: src/mocks/dashboardMock.js

TeacherDashboardPage uchun useTeacherDashboard.js yarating:
- dashboardStats, groupSummaryList, upcomingTestList holatlari
- isLoading, loadError holatlari
- setTimeout 600ms bilan mock ma'lumot yuklash simulatsiyasi
```
