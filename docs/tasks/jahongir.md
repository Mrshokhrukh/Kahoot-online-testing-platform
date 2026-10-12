# Student Dashboard — Jahongir

**Branch:** `feature/student`

---

## Sizga tegishli sahifalar

| Sahifa | Route |
|--------|-------|
| StudentDashboardPage | `/student/dashboard` |
| StudentGroupsPage | `/student/groups` |
| StudentJoinPage | `/student/join` |
| StudentResultsPage | `/student/results` |
| StudentResultDetailPage | `/student/results/:testId` |

---

## Sizga tegishli fayllar

```
src/
├── components/student/
│   ├── UpcomingTestCard.jsx
│   ├── StudentGroupCard.jsx
│   ├── JoinGroupForm.jsx
│   ├── MyResultCard.jsx
│   ├── StudentStatsBar.jsx
│   └── ResultDetailView.jsx
├── pages/student/
│   ├── StudentDashboardPage.jsx
│   ├── StudentGroupsPage.jsx
│   ├── StudentJoinPage.jsx
│   ├── StudentResultsPage.jsx
│   └── StudentResultDetailPage.jsx
└── hooks/student/
    ├── useStudentDashboard.js
    ├── useJoinGroup.js
    └── useStudentResults.js
```

---

## Har sahifaning funksionalligi

**StudentDashboardPage** `/student/dashboard`
- "Salom, [ism]!" sarlavhasi
- `StudentStatsBar` — 3 ta stat: guruhlar soni, o'tkazilgan testlar, o'rtacha ball
- **Yaqin testlar** — `UpcomingTestCard` ro'yxati:
  - Test nomi, guruh, sana+vaqt
  - Qolgan vaqt: "Ertaga 20:00 da" yoki "2 soat 30 daqiqa qoldi"
  - "Testga kirish" tugmasi → `/test/:testId/waiting` (faqat vaqt yaqinlashganda aktiv)
- **So'nggi natijalar** — oxirgi 3 ta natija

**StudentGroupsPage** `/student/groups`
- Mening guruhlarim ro'yxati — `StudentGroupCard` bilan
- Har karta: guruh nomi, o'qituvchi ismi, testlar soni, o'rtacha ball
- "Guruhga qo'shilish" tugmasi → `/student/join`

**StudentJoinPage** `/student/join`
- `JoinGroupForm`:
  - 6 belgili taklif kodi input (katta, markazda)
  - "Qo'shilish" tugmasi
  - Xato: "Bu kod noto'g'ri yoki muddati o'tgan"
  - Muvaffaqiyat: guruh nomi ko'rsatiladi + "Guruhga qo'shildingiz!"

**StudentResultsPage** `/student/results`
- Barcha natijalar ro'yxati — `MyResultCard` bilan
- Har karta: test nomi, guruh, sana, ball (katta), foiz
- Qatnashmagan testlar: "❌ Qatnashmadingiz" (qizil)
- Har karta → `/student/results/:testId`

**StudentResultDetailPage** `/student/results/:testId`
- Test nomi va sana
- Ball va foiz (katta, markazda)
- Har savol bo'yicha: savol matni, mening javobim, to'g'ri javob
- To'g'ri = yashil ✓, Noto'g'ri = qizil ✗

---

## Mock ma'lumot

```js
// src/mocks/studentMock.js
export const mockUpcomingTestList = [
  { id: 't1', testName: '5-dars testi', groupName: 'React kursi',
    scheduledAt: new Date(Date.now() + 7200000).toISOString() }, // 2 soatdan keyin
]

export const mockMyGroupList = [
  { id: 'g1', name: 'React kursi', teacherName: 'Sardor Usmonov',
    testCount: 5, avgScore: 78 },
]

export const mockMyResultList = [
  { id: 'r1', testName: '4-dars testi', groupName: 'React kursi',
    date: '2026-10-10', score: 82, percentage: 82, attended: true },
  { id: 'r2', testName: '3-dars testi', groupName: 'React kursi',
    date: '2026-10-07', score: 0, percentage: 0, attended: false },
]
```

---

## Qoidalar

1. "Testga kirish" tugmasi: faqat test boshlanishiga 15 daqiqadan kam qolganda aktiv bo'ladi
2. `JoinGroupForm` — 6 belgi kiritilganda avtomatik "Qo'shilish" trigger bo'lishi mumkin
3. O'quvchi faqat o'z natijalarini ko'radi — boshqa o'quvchilar ko'rsatilmaydi
4. `studentStore` dan `myGroupList`, `upcomingTestList` ishlatiladi (Fuzayil yozadi)
5. Test natijasida to'g'ri javoblar faqat test tugagandan keyin ko'rsatiladi

---

## Ishlash tartibi

1. `useStudentDashboard.js` — mock ma'lumot
2. `UpcomingTestCard.jsx` + `StudentStatsBar.jsx`
3. `StudentDashboardPage.jsx`
4. `StudentGroupCard.jsx` → `StudentGroupsPage.jsx`
5. `useJoinGroup.js` + `JoinGroupForm.jsx` → `StudentJoinPage.jsx`
6. `MyResultCard.jsx` + `useStudentResults.js` → `StudentResultsPage.jsx`
7. `ResultDetailView.jsx` → `StudentResultDetailPage.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida Student Dashboard qurmoqdaman. Ism: Jahongir.
Stack: React + Vite (JSX), TailwindCSS v4.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/student/, src/pages/student/
Mock: src/mocks/studentMock.js

Birinchi useStudentDashboard.js yarating:
- upcomingTestList, recentResultList, studentStats holatlari
- studentStats: { groupCount, completedTestCount, avgScore }
- isLoading, loadError holatlari
- setTimeout 600ms bilan mock yuklash
```
