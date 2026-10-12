# Teacher Dashboard — Shaxruz

**Branch:** `feature/teacher-dashboard`
**To'rtinchi merge qilinadi — infra tayyor bo'lgandan keyin.**

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest — o'qituvchi dars o'tgandan keyin AI yordamida test tayyorlaydigan, belgilangan vaqtda barcha o'quvchilar bir vaqtda ishlaydigan avtomatik nazorat platformasi.

Siz bu loyihadagi **o'qituvchi yuzini** qurasiz. O'qituvchi login qilgandan keyin birinchi ko'radigan narsa — **sizning sahifangiz**. Platformaning umumiy holatini bir joyda ko'radi: nechta guruh, nechta o'quvchi, qanday testlar bor, yaqinlashtiyotgan testlar.

### Haqiqiy stsenariy

Sardor o'qituvchi tizimga kirdi. Parviz yozgan `/login` sahifasidan o'tib, `role='teacher'` aniqlandi — va to'g'ridan-to'g'ri **sizning** `/teacher/dashboard` ga tushdi. U ko'radi:
- "Siz 4 ta guruh, 87 ta o'quvchi bilan ishlayapsiz"
- "Bugun kechki 20:00 da React kursida test bor — 3 soat qoldi"
- "React kursi" kartasiga bosganda → Zarrux sahifasi (`/teacher/groups/g1`)

### Siz kimni kutasiz?

- **Fuzayil** — `authStore` dan `useAuthStore().currentUser` (ism ko'rsatish uchun), `ROUTES` konstantasi (navigatsiya uchun). Fuzayil yozguncha, o'zingiz vaqtinchalik `{ name: 'Sardor Usmonov' }` mock ishlatishingiz mumkin.
- **Azizbek** — `AppSidebar`, `AppLayout`, `AppCard`, `AppSpinner`. Azizbek tayyor bo'lguncha oddiy `<div>` bilan yozing.

### Kimlar sizni kutadi?

- **Zarrux** — "Guruhga o'tish" tugmasi sizdan Zarrux sahifasiga yo'naltiradi
- **Sunnatbek** — "Monitoring" tugmasi sizdan Sunnatbek sahifasiga yo'naltiradi
- **Baxrom** — yaqinlashtiyotgan testlar Baxrom testConfigPage ga bog'langan

### Haftalik ish rejasi

**1-kun:**
- `src/mocks/dashboardMock.js` yarating — `mockDashboardStats`, `mockGroupSummaryList`, `mockUpcomingTestList`
- `useTeacherDashboard.js` hook — mock yuklash (setTimeout 600ms)

**2-kun:**
- `StatsOverview.jsx` — 4 ta statistika kartasi
- Brauzerda tekshiring: isLoading holati spinner ko'rsatadimi?

**3-kun:**
- `GroupSummaryCard.jsx` — guruh nomi, o'quvchilar soni, "Ko'rish" tugmasi
- `UpcomingTestCard.jsx` — test nomi, vaqt, countdown (`setInterval` 1 daqiqa)

**4-kun:**
- `QuickActions.jsx` — 2 ta tugma
- `TeacherDashboardPage.jsx` — barchani birlashtiring
- Sahifani to'liq brauzerda oching, barcha holatlari tekshiring

**5-kun:**
- `TeacherProfilePage.jsx` — ism, email ko'rsatish, parol o'zgartirish forma
- PR oching

### Muhim nuqtalar

`currentUser.name` — dashboardda "Salom, Sardor!" deb ko'rsatiladi. Fuzayil `authStore` ni yozguncha `const currentUser = { name: 'Sardor Usmonov' }` deb hardcode qiling.

`UpcomingTestCard` da qolgan vaqt hisoblash: `scheduledAt` — `Date.now()` farqini soat/daqiqaga aylantiring. `setInterval(1 daqiqa)` bilan yangilansin.

Sidebar navigatsiya: teacher uchun navItems = `[{ label: 'Dashboard', route: ROUTES.TEACHER_DASHBOARD }, { label: 'Guruhlar', route: ROUTES.TEACHER_GROUPS }, ...]`

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
