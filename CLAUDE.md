# EduTest — AI-Powered Nazorat Platformasi
## Frontend Kod Qoidalari

> Barcha AI assistantlar (Claude Code, Cursor, Copilot) uchun majburiy.
> Har qanday kod yozishdan oldin bu faylni to'liq o'qi.
> Qoidadan chetga chiqish — PR rad etiladi.

---

## Platforma haqida

**EduTest** — o'qituvchi dars o'tgandan keyin AI orqali test tayyorlaydigan,
belgilangan vaqtda barcha o'quvchilar bir vaqtda ishlaydigan avtomatik nazorat platformasi.

**Ikkita rol:**
- `teacher` — guruh yaratadi, dars kiritadi, AI test generatsiya qiladi, natijalarni ko'radi
- `student` — guruhga qo'shiladi, belgilangan vaqtda test ishlaydi, natijasini ko'radi

**Test turlari:** Quiz (4 variant) · True/False · Kod yozish (Monaco) · Ochiq savol

**Stack:** React 18 + Vite (JSX) · TailwindCSS v4 · shadcn/ui · Zustand · React Router v6

---

## Folder tuzilishi

```
src/
├── components/
│   ├── shared/              ← Azizbek (UI System)
│   ├── auth/                ← Parviz
│   ├── teacher-dashboard/   ← Shaxruz
│   ├── groups/              ← Zarrux
│   ├── members/             ← Odiljon
│   ├── lessons/             ← Marufjon
│   ├── ai-generation/       ← Otabek
│   ├── test-management/     ← Baxrom
│   ├── questions/           ← Jasur (4 tur)
│   ├── test-session/        ← Farid
│   ├── monitoring/          ← Sunnatbek
│   ├── results/             ← Shohjahon
│   ├── analytics/           ← Doniyor
│   └── student/             ← Jahongir
├── pages/
│   ├── auth/                ← Parviz
│   ├── teacher/
│   │   ├── dashboard/       ← Shaxruz
│   │   ├── groups/          ← Zarrux
│   │   ├── members/         ← Odiljon
│   │   ├── lessons/         ← Marufjon
│   │   ├── ai-generation/   ← Otabek
│   │   ├── tests/           ← Baxrom
│   │   ├── monitoring/      ← Sunnatbek
│   │   ├── results/         ← Shohjahon
│   │   └── analytics/       ← Doniyor
│   ├── test-session/        ← Farid
│   └── student/             ← Jahongir
├── hooks/                   ← Har feature o'z papkasida
├── store/                   ← Fuzayil (barcha Zustand)
├── constants/               ← Fuzayil
├── mocks/                   ← Har developer o'z mock ni yozadi
└── router/                  ← Fuzayil
```

---

## 1. Fayl Nomlash

```
components/auth/LoginForm.jsx          ✅ PascalCase — komponent
pages/teacher/groups/GroupsPage.jsx    ✅ PascalCase — sahifa ("Page" suffiksi)
hooks/groups/useGroupList.js           ✅ camelCase, "use" prefiksi
store/groupStore.js                    ✅ camelCase, "Store" suffiksi
constants/testConstants.js             ✅ camelCase

loginform.jsx          ❌ kichik harf
GroupComponent.jsx     ❌ "Component" qo'shma
groupHelper.js         ❌ "Helper" taqiqlangan
index.jsx              ❌ komponent/sahifa uchun ishlatilmaydi
```

Qoida: Fayl nomi = ichidagi asosiy eksport nomi.

---

## 2. Komponent Tuzilishi (majburiy tartib)

```jsx
// 1. Importlar (React → lib → shared → lokal)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppButton from '../shared/AppButton'
import { useGroupStore } from '../../store/groupStore'

// 2. Konstantalar (agar magic value bo'lsa)
const MAX_GROUP_NAME_LENGTH = 50

// 3. Komponent
function GroupCard({ group, onSelect }) {
  if (!group) return null
  return ( ... )
}

// 4. Eksport
export default GroupCard
```

---

## 3. Nomlash Qoidasi

```js
✅  const studentAnswerCount = 0
✅  const isTestTimerActive = false
✅  function handleGroupCreate() {}
✅  const isLoading = true

❌  const n = 0
❌  const flag = false
❌  function submit() {}
❌  const data = {}
❌  const res = {}
```

- Handler: `handle` + nima + hodisa → `handleGroupCreate`, `handleTestSubmit`
- Boolean: `is/has/can/should` → `isLoading`, `hasError`, `canSubmit`
- Konstanta: `UPPER_SNAKE_CASE` → `TEST_DURATION_MINUTES`

---

## 4. Hajm Limiti

- Fayl: 200 qator maksimum
- Funksiya: 30 qator maksimum
- JSX return: 50 qator maksimum
- Oshsa — mantiqiy kichik qismlarga ajrat

---

## 5. Majburiy UI Holatlari

Ma'lumot ko'rsatadigan har komponent 4 holatni ko'rsatishi shart:

```jsx
if (isLoading) return <AppSpinner />
if (loadError) return <AppErrorMessage message={loadError} />
if (list.length === 0) return <EmptyState text="..." />
return <DataContent list={list} />
```

---

## 6. Uslub Qoidasi

```jsx
✅  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
❌  style={{ backgroundColor: 'blue' }}
❌  className="bg-[#1a1a2e]"
```

- Ruxsat etilgan ranglar: `docs/UI_SYSTEM.md` da
- Ikonlar: faqat `lucide-react`
- shadcn: to'g'ridan-to'g'ri emas, `shared/` wrapper orqali

---

## 7. Responsive (majburiy)

```jsx
// Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## 8. Import Qoidasi

```jsx
✅  import AppButton from '../shared/AppButton'
✅  import { useGroupStore } from '../../store/groupStore'

❌  import QuizCard from '../test-session/QuizCard'  // boshqa feature
❌  import { Button } from '@/components/ui/button'  // shadcn to'g'ridan-to'g'ri
```

---

## 9. Mock Ma'lumot

Backend tayyor bo'lguncha `src/mocks/` dan foydalaniladi.
`setTimeout(callback, 600)` bilan yuklanishni simulatsiya qiling.

---

## 10. Taqiqlangan Narsalar

```
❌  console.log / console.error
❌  Hardcoded URL
❌  Inline style
❌  Boshqa feature papkasidan import
❌  Ishlatilmayotgan import / o'zgaruvchi
❌  TODO / FIXME izoh
❌  Yangi npm package — teamlead tasdiqlashisiz
```

---

## 11. PR Checklist

```
[ ] Faqat o'z feature papkasidagi fayllar
[ ] Fayl 200 qatordan oshmagan
[ ] Funksiya 30 qatordan oshmagan
[ ] console.log yo'q
[ ] Inline style yo'q
[ ] Loading / Error / Empty holatlari bor
[ ] Mobile da ishlaydi
[ ] Teamlead reviewer qo'shilgan
```
