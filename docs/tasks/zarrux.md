# Guruh Boshqaruvi — Zarrux

**Branch:** `feature/groups`
**To'rtinchi merge qilinadi — Fuzayil bilan parallel.**

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest platformasida o'qituvchi o'quvchilarini guruhlar orqali boshqaradi. Guruh — bu "React kursi" yoki "JS asoslari" kabi sinfdir. O'quvchilar guruhga **invite code** orqali qo'shiladi. Har guruh uchun darslar, testlar, natijalar bo'ladi.

Siz bu loyihadagi **guruh boshqaruvi** ni qurasiz. Guruh yaratish, ko'rish, sozlash, o'chirish — barchasi sizda. Platforma ishlashi uchun avvalo guruh bo'lishi kerak — undan keyin darslar, testlar va o'quvchilar keladi.

### Haqiqiy stsenariy

Sardor o'qituvchi dashboarddan "Yangi guruh" tugmasini bosdi. **Sizning** `/teacher/groups/new` sahifasi ochildi. U "React kursi" nomini kiritdi, "Dasturlash" fanini tanladi. "Yaratish" bosildi — va u `/teacher/groups/abc123` ga yo'naltirildi. Bu yerda **sizning** `GroupDetailPage` i bor: katta `ABC123` invite kodi, "Nusxalash" tugmasi. U kodni o'quvchilarga telegram orqali yuboradi. O'quvchilar (Jahongir sahifasi) `/student/join` da shu kodni kiritadi va guruhga qo'shiladi.

### Siz kimni kutasiz?

- **Fuzayil** — `ROUTES` konstantasi (navigatsiya uchun), `groupStore` dan `setActiveGroup` (aktiv guruhni saqlash). Tayyor bo'lguncha `useNavigate()` bilan hardcode route ishlatishingiz mumkin.
- **Azizbek** — `AppCard`, `AppModal` (o'chirish tasdiqlash uchun), `AppBadge`, `InviteCodeDisplay` — tayyor bo'lguncha oddiy `<div>` bilan yozing.

### Kimlar sizni kutadi?

- **Odiljon** — `groupId` bilan `/teacher/groups/:groupId/members` sahifasiga tab navigatsiya
- **Marufjon** — `groupId` bilan `/teacher/groups/:groupId/lessons` sahifasiga tab navigatsiya
- **Jahongir** — o'quvchi kiritgan invite kodi sizning guruhingizga mos keladi (mock tekshiruv)
- **Shaxruz** — dashboarddagi guruh kartasi sizning `groupId` ga yo'naltiradi

### Haftalik ish rejasi

**1-kun:**
- `src/mocks/groupsMock.js` yarating
- `useGroupList.js` hook — mock guruhlar

**2-kun:**
- `GroupCard.jsx` — guruh kartasi
- `GroupsPage.jsx` — ro'yxat + "Yangi guruh" tugmasi

**3-kun:**
- `GroupForm.jsx` — validatsiya bilan
- `useGroupCreate.js` + `GroupNewPage.jsx`
- Brauzerda test: guruh yaratib, redirect ishlayaptimi?

**4-kun:**
- `InviteCodeDisplay.jsx` — `navigator.clipboard.writeText()` bilan
- `GroupStatsBar.jsx`
- `useGroupDetail.js` → `GroupDetailPage.jsx`

**5-kun:**
- `GroupSettingsPage.jsx` — tahrirlash + o'chirish modal
- PR oching

### Muhim nuqtalar

Invite kodi generatsiya: `Math.random().toString(36).substring(2, 8).toUpperCase()` — 6 belgili kod. Guruh yaratilganda avtomatik generatsiya qilinadi.

`InviteCodeDisplay` da "Nusxalash" bosilganda: `navigator.clipboard.writeText(inviteCode)` → toast: "Kod nusxalandi!"

Guruh o'chirishda modal matni aniq bo'lsin: **"React kursi guruhini o'chirmoqchimisiz? Bu amal qaytarib bo'lmaydi."**

`GroupDetailPage` dagi 3 ta tab navigatsiya: tab bosilganda `useNavigate` bilan URL o'zgartiring (Odiljon, Marufjon sahifalariga yo'naltiradi).

---

## Sizga tegishli sahifalar

| Sahifa | Route |
|--------|-------|
| GroupsPage | `/teacher/groups` |
| GroupNewPage | `/teacher/groups/new` |
| GroupDetailPage | `/teacher/groups/:groupId` |
| GroupSettingsPage | `/teacher/groups/:groupId/settings` |

---

## Sizga tegishli fayllar

```
src/
├── components/groups/
│   ├── GroupCard.jsx
│   ├── GroupForm.jsx
│   ├── InviteCodeDisplay.jsx
│   └── GroupStatsBar.jsx
├── pages/teacher/groups/
│   ├── GroupsPage.jsx
│   ├── GroupNewPage.jsx
│   ├── GroupDetailPage.jsx
│   └── GroupSettingsPage.jsx
└── hooks/groups/
    ├── useGroupList.js
    ├── useGroupCreate.js
    └── useGroupDetail.js
```

---

## Har sahifaning funksionalligi

**GroupsPage** `/teacher/groups`
- Barcha guruhlar ro'yxati — `GroupCard` bilan
- "Yangi guruh" tugmasi → `/teacher/groups/new`
- Bo'sh holat: "Hali guruh yaratilmagan"
- Har karta: guruh nomi, o'quvchilar soni, so'nggi faollik, "Ko'rish" tugmasi

**GroupNewPage** `/teacher/groups/new`
- `GroupForm`: guruh nomi (majburiy), tavsif (ixtiyoriy), fan (select: Matematika/Fizika/Kimyo va h.k.)
- "Yaratish" tugmasi → muvaffaqiyat → `/teacher/groups/:newGroupId`
- Yaratilganda avtomatik taklif kodi generatsiya qilinadi

**GroupDetailPage** `/teacher/groups/:groupId`
- Yuqorida: `PageHeader` — guruh nomi + "Sozlamalar" tugmasi
- `InviteCodeDisplay` — taklif kodi (katta, nusxalash tugmasi bilan)
- `GroupStatsBar` — o'quvchilar soni, testlar soni, o'rtacha ball
- Quyida: 3 ta tab-ko'rinish
  - "O'quvchilar" → `/teacher/groups/:groupId/members` (Odiljon sahifasi)
  - "Darslar" → `/teacher/groups/:groupId/lessons` (Marufjon sahifasi)
  - "Testlar" → `/teacher/tests` filtrlanib (Baxrom sahifasi)

**GroupSettingsPage** `/teacher/groups/:groupId/settings`
- Guruh nomini tahrirlash
- Tavsifni tahrirlash
- Taklif kodini yangilash
- Guruhni o'chirish (xavfli zona — tasdiqlash modal bilan)

---

## Mock ma'lumot

```js
// src/mocks/groupsMock.js
export const mockGroupList = [
  { id: '1', name: 'React kursi', description: 'Frontend kurs',
    subject: 'Dasturlash', studentCount: 22, testCount: 8,
    inviteCode: 'ABC123', createdAt: '2026-09-01' },
  { id: '2', name: 'JS asoslari', description: '',
    subject: 'Dasturlash', studentCount: 30, testCount: 5,
    inviteCode: 'XYZ789', createdAt: '2026-08-15' },
]
```

---

## Qoidalar

1. `InviteCodeDisplay` da "Nusxalash" tugmasi `navigator.clipboard.writeText()` ishlatadi
2. Guruhni o'chirishdan oldin — `AppModal` bilan "Haqiqatan ham o'chirmoqchimisiz?" tasdiqlash
3. Tab navigatsiyasi uchun `useNavigate` + URL o'zgartirish
4. `useGroupStore` dan `setActiveGroup` chaqiriladi (Fuzayil yozadi)

---

## Ishlash tartibi

1. `useGroupList.js` — mock guruhlar ro'yxati
2. `GroupCard.jsx` → `GroupsPage.jsx`
3. `GroupForm.jsx` + `useGroupCreate.js` → `GroupNewPage.jsx`
4. `InviteCodeDisplay.jsx` + `GroupStatsBar.jsx`
5. `useGroupDetail.js` → `GroupDetailPage.jsx`
6. `GroupSettingsPage.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida Guruh boshqaruvi qurmoqdaman. Ism: Zarrux.
Stack: React + Vite (JSX), TailwindCSS v4.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/groups/, src/pages/teacher/groups/
Mock: src/mocks/groupsMock.js

Birinchi useGroupList.js yarating:
- groupList, isLoading, loadError holatlari
- setTimeout 600ms bilan mock ma'lumot yuklash
Keyin GroupCard.jsx: guruh nomi, o'quvchilar soni, "Ko'rish" tugmasi.
```
