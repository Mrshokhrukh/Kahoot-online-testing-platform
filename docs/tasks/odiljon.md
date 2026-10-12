# A'zo Boshqaruvi — Odiljon

**Branch:** `feature/members`
**To'rtinchi merge qilinadi — Zarrux bilan parallel.**

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest platformasida o'qituvchi guruh ichidagi o'quvchilarni ko'rishi, ularning statistikasini tekshirishi, agar kerak bo'lsa guruhdan chiqarishi kerak. Bu — **sizning vazifangiz**.

Siz o'qituvchiga **o'quvchilar ro'yxatini** va **har o'quvchining profilini** ko'rsatadigan sahifalar yaratasiz. Bu sahifalar Zarrux yozgan `GroupDetailPage` dagi "O'quvchilar" tabidan ochiladi.

### Haqiqiy stsenariy

Sardor o'qituvchi "React kursi" guruhini ochdi (Zarrux sahifasi). "O'quvchilar" tabiga bosdi — **sizning** `/teacher/groups/abc123/members` sahifasi ochildi. U ko'radi: 22 ta o'quvchi, har birining qatnashuvi va o'rtacha bali. "Ali Karimov" kartasiga bosdi → **sizning** `StudentProfilePage` i ochildi. U yerda Alining so'nggi 5 ta test natijalari, "Batafsil analitika" tugmasi bor (Doniyor sahifasiga).

### Siz kimni kutasiz?

- **Zarrux** — `groupId` URL parametri (`useParams()` orqali olasiz). Zarrux sahifasidan navigatsiya keladi.
- **Fuzayil** — `ROUTES.STUDENT_ANALYTICS` konstantasi (Doniyor sahifasiga link uchun).
- **Azizbek** — `AppAvatar` (o'quvchi avatari), `AppModal` (o'chirish modal), `AppBadge`. Tayyor bo'lguncha oddiy komponentlar bilan yozing.

### Kimlar sizni kutadi?

- **Doniyor** — `StudentProfilePage` dagi "Batafsil analitika" tugmasi Doniyor sahifasiga yo'naltiradi (`/teacher/students/:studentId/analytics`)

### Haftalik ish rejasi

**1-kun:**
- `src/mocks/membersMock.js` yarating
- `useMemberList.js` — qidiruv va saralash bilan

**2-kun:**
- `StudentCard.jsx` — ism, avatar, qatnashuv foizi, o'rtacha ball
- `MembersFilterBar.jsx` — qidiruv input + saralash select

**3-kun:**
- `RemoveStudentModal.jsx` — tasdiqlash modal
- `MembersPage.jsx` — barchani birlashtirish
- Brauzerda test: qidiruv ishlayaptimi?

**4-kun:**
- `useStudentProfile.js` — mock profil va test tarixi
- `StudentStatsRow.jsx` — statistika satri

**5-kun:**
- `StudentProfilePage.jsx` — profil + so'nggi 5 test natijalari jadvali
- PR oching

### Muhim nuqtalar

`useParams()` dan `groupId` va `studentId` olinadi. Ular mock ma'lumotlarga filter qilishda ishlatiladi.

Qidiruv debounce: `setTimeout` bilan 300ms kechiktirib, har keystrokeda barcha list filter qilinmasin.

`StudentCard` dagi "O'chirish" tugmasi bosilganda faqat `RemoveStudentModal` ochiladi — haqiqiy o'chirish modal tasdiqlangandan keyin bo'ladi.

`StudentProfilePage` da so'nggi 5 test jadvali: test nomi, sana, ball (rangli: 90+ yashil, 60- qizil), qatnashdi ✅ / qatnashmadi ❌.

---

## Sizga tegishli sahifalar

| Sahifa | Route |
|--------|-------|
| MembersPage | `/teacher/groups/:groupId/members` |
| StudentProfilePage | `/teacher/groups/:groupId/members/:studentId` |

---

## Sizga tegishli fayllar

```
src/
├── components/members/
│   ├── StudentCard.jsx
│   ├── StudentStatsRow.jsx
│   ├── RemoveStudentModal.jsx
│   └── MembersFilterBar.jsx
├── pages/teacher/members/
│   ├── MembersPage.jsx
│   └── StudentProfilePage.jsx
└── hooks/members/
    ├── useMemberList.js
    └── useStudentProfile.js
```

---

## Har sahifaning funksionalligi

**MembersPage** `/teacher/groups/:groupId/members`
- Sarlavha: "O'quvchilar — [guruh nomi]"
- `MembersFilterBar` — qidiruv (ismga ko'ra), saralash (ism/ball/faollik)
- O'quvchilar ro'yxati — `StudentCard` bilan
- Har karta:
  - Ism, avatar, qo'shilgan sana
  - Testlarda ishtirok foizi (75%)
  - O'rtacha ball (82/100)
  - "Ko'rish" tugmasi → `/teacher/groups/:groupId/members/:studentId`
  - "O'chirish" tugmasi → `RemoveStudentModal`

**StudentProfilePage** `/teacher/groups/:groupId/members/:studentId`
- Profil: ism, email, qo'shilgan sana
- Statistika: jami testlar, o'rtacha ball, ishtirok foizi
- So'nggi 5 ta test natijalari jadvali:
  - Test nomi, sana, ball, foiz, qatnashdi/qatnashmadi
- "Batafsil analitika" tugmasi → Doniyor sahifasi

---

## Mock ma'lumot

```js
// src/mocks/membersMock.js
export const mockMemberList = [
  { id: 's1', name: 'Ali Karimov', email: 'ali@test.com',
    joinedAt: '2026-09-05', testCount: 8, avgScore: 82, attendanceRate: 87 },
  { id: 's2', name: 'Vali Toshmatov', email: 'vali@test.com',
    joinedAt: '2026-09-06', testCount: 6, avgScore: 65, attendanceRate: 75 },
]

export const mockStudentTestHistory = [
  { testName: '1-dars testi', date: '2026-10-01', score: 85, percentage: 85, attended: true },
  { testName: '2-dars testi', date: '2026-10-03', score: 0,  percentage: 0,  attended: false },
]
```

---

## Qoidalar

1. O'quvchi o'chirilganda `RemoveStudentModal` da: "Ali Karimov guruhdan o'chiriladi. Uning natijalari saqlanib qoladi." — aniq xabar
2. Qidiruv real-time (debounce 300ms) — `setTimeout` bilan yoki `useMemo` bilan
3. `MembersFilterBar` da saralash: `[...list].sort()` — asl massivni o'zgartirma
4. URL dan `groupId` va `studentId` → `useParams()` bilan olinadi

---

## Ishlash tartibi

1. `useMemberList.js` — mock o'quvchilar
2. `StudentCard.jsx` → `MembersFilterBar.jsx`
3. `RemoveStudentModal.jsx`
4. `MembersPage.jsx` — barchani birlashtirish
5. `useStudentProfile.js` + `StudentStatsRow.jsx`
6. `StudentProfilePage.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida A'zo boshqaruvi qurmoqdaman. Ism: Odiljon.
Stack: React + Vite (JSX), TailwindCSS v4.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/members/, src/pages/teacher/members/
Mock: src/mocks/membersMock.js

Birinchi useMemberList.js yarating:
- memberList, filteredList, searchQuery, isLoading holatlari
- setSearchQuery — qidiruv (ism bo'yicha filter)
- sortBy(field) — 'name'|'score'|'attendance' bo'yicha saralash
```
