# Test Boshqaruvi & Jadval — Baxrom

**Branch:** `feature/test-management`

---

## Sizga tegishli sahifalar

| Sahifa | Route |
|--------|-------|
| TestsPage | `/teacher/tests` |
| TestConfigPage | `/teacher/tests/:testId/configure` |

---

## Sizga tegishli fayllar

```
src/
├── components/test-management/
│   ├── TestListCard.jsx
│   ├── TestStatusBadge.jsx
│   ├── TestConfigForm.jsx
│   ├── ScheduleTimePicker.jsx
│   └── TestTypeSelector.jsx
├── pages/teacher/tests/
│   ├── TestsPage.jsx
│   └── TestConfigPage.jsx
└── hooks/test-management/
    ├── useTestList.js
    └── useTestConfig.js
```

---

## Har sahifaning funksionalligi

**TestsPage** `/teacher/tests`
- Tab bo'yicha filtrlash: "Barchasi" | "Rejalashtirilgan" | "Aktiv" | "Tugagan"
- `TestListCard` ro'yxati
- Har karta:
  - Test nomi, guruh nomi
  - `TestStatusBadge`: Rejalashtirilgan (sariq) | Aktiv (yashil) | Tugagan (kulrang)
  - Sana va vaqt
  - O'quvchilar soni
  - Tugmalar: "Sozla" | "Monitoring" (aktiv bo'lsa) | "Natijalar" (tugagan bo'lsa)

**TestConfigPage** `/teacher/tests/:testId/configure`

Ikkita bo'lim:

*1. Test sozlamalari:*
- Test nomi
- `TestTypeSelector` — test turlari nisbati (Quiz 60% / T-F 20% / Kod 20%)
- Savollar soni
- Test davomiyligi (20 / 25 / 30 / 45 daqiqa — select)
- Ko'rsatish tartibi (ketma-ket | tasodifiy)

*2. Vaqt jadval:*
- `ScheduleTimePicker`:
  - Sana tanlash (date input)
  - Soat tanlash (time input)
  - Vaqt zonasi ko'rsatish
- "E'lon qilish" tugmasi — testni rejalashtirilgan holatga o'tkazadi
- Muvaffaqiyat: "Test [sana va vaqt] da boshlanadi" xabari
- "Monitoring" havolasi → Sunnatbek sahifasi

---

## Mock ma'lumot

```js
// src/mocks/testsMock.js
export const mockTestList = [
  { id: 't1', name: '5-dars testi', groupName: 'React kursi', groupId: 'g1',
    status: 'scheduled', scheduledAt: '2026-10-13T20:00:00',
    studentCount: 22, questionCount: 20, durationMinutes: 30 },
  { id: 't2', name: '4-dars testi', groupName: 'React kursi', groupId: 'g1',
    status: 'completed', scheduledAt: '2026-10-10T20:00:00',
    studentCount: 22, questionCount: 15, durationMinutes: 25 },
]
```

---

## Qoidalar

1. `ScheduleTimePicker` — o'tgan vaqt tanlanmaydi (min = bugungi sana)
2. "E'lon qilish" bosilganda: `isLoading=true` → mock 800ms → muvaffaqiyat toast
3. Test `status === 'active'` bo'lganda — sozlash mumkin emas (readonly mode)
4. `testStore` dan `setActiveTest` chaqiriladi

---

## Ishlash tartibi

1. `useTestList.js` — filtrlanuvchi ro'yxat
2. `TestStatusBadge.jsx` + `TestListCard.jsx`
3. `TestsPage.jsx` — tab filtrlash bilan
4. `ScheduleTimePicker.jsx` + `TestTypeSelector.jsx` + `TestConfigForm.jsx`
5. `useTestConfig.js` → `TestConfigPage.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida Test boshqaruvi qurmoqdaman. Ism: Baxrom.
Stack: React + Vite (JSX), TailwindCSS v4.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/test-management/, src/pages/teacher/tests/
Mock: src/mocks/testsMock.js

Birinchi useTestList.js yarating:
- testList, filteredList, activeTab holatlari
- activeTab: 'all'|'scheduled'|'active'|'completed'
- setActiveTab(tab) → filteredList yangilanadi
- isLoading, loadError holatlari
```
