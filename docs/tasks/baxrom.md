# Test Boshqaruvi & Jadval — Baxrom

**Branch:** `feature/test-management`
**To'rtinchi merge qilinadi — Otabek bilan parallel.**

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest platformasida AI test yaratilgandan keyin (Otabek sahifasi) o'qituvchi testni **sozlashi va vaqtini belgilashi** kerak. Bu — **sizning vazifangiz**.

Siz o'qituvchi uchun test boshqaruv markazi yaratasiz: barcha testlar ro'yxati, har test konfiguratsiyasi (savol soni, davomiylik), va eng muhimi — **vaqt jadval** (qaysi kunda, soatda test bo'lishini belgilash). Test belgilangan vaqtda **barcha o'quvchilarga bir vaqtda ochiladi**.

### Haqiqiy stsenariy

Sardor Otabek sahifasidan "Qabul qilish va davom etish" tugmasini bosdi. **Sizning** `/teacher/tests/t1/configure` sahifasi ochildi. U:
1. Test nomini tekshirdi: "5-dars testi"
2. Savol soni: 20, davomiylik: 30 daqiqa
3. Ko'rsatish tartibi: "Tasodifiy" tanladi
4. Sana: 2026-10-13, soat: 20:00 tanladi
5. "E'lon qilish" bosdi → toast: "Test 13-oktabr, soat 20:00 da boshlanadi"

Keyingi kuni u `/teacher/tests` ga kirdi — status "Rejalashtirilgan" (sariq badge). Kechki 20:00 da status "Aktiv" (yashil) — "Monitoring" tugmasi paydo bo'ldi. U Sunnatbek sahifasiga o'tdi.

### Siz kimni kutasiz?

- **Otabek** — "Qabul qilish va davom etish" tugmasi sizning sahifangizga yo'naltiradi. Siz `testId` ni URL dan olasiz.
- **Fuzayil** — `testStore` dan `setActiveTest`, `ROUTES.TEACHER_MONITOR` va `ROUTES.TEACHER_RESULTS` konstantalari.
- **Azizbek** — `TestStatusBadge` uchun `AppBadge`, `ScheduleTimePicker` uchun oddiy input komponentlari.

### Kimlar sizni kutadi?

- **Sunnatbek** — `TestConfigPage` dagi "Monitoring" havolasi Sunnatbek sahifasiga (`/teacher/tests/:testId/monitor`) yo'naltiradi
- **Shohjahon** — tugagan testlar "Natijalar" tugmasi Shohjahon sahifasiga yo'naltiradi

### Haftalik ish rejasi

**1-kun:**
- `src/mocks/testsMock.js` yarating
- `useTestList.js` — tab filtrlanuvchi ro'yxat

**2-kun:**
- `TestStatusBadge.jsx` — 3 rang: sariq/yashil/kulrang
- `TestListCard.jsx` — test kartasi
- `TestsPage.jsx` — tab filtrlash bilan

**3-kun:**
- `ScheduleTimePicker.jsx` — sana + soat input, o'tgan sana taqiqlangan
- `TestTypeSelector.jsx` — tur nisbati sozlash

**4-kun:**
- `TestConfigForm.jsx` — barcha sozlamalar
- `useTestConfig.js` — saqlash logikasi
- `TestConfigPage.jsx`

**5-kun:**
- Brauzerda to'liq test: konfiguratsiya → e'lon qilish → TestsPage da status tekshirish
- PR oching

### Muhim nuqtalar

`ScheduleTimePicker` da `<input type="date" min={today}>` — o'tgan sanani tanlash mumkin emas.

"E'lon qilish" bosilganda: `isLoading=true` → mock 800ms → `showToast('Test 13-oktabr, soat 20:00 da boshlanadi', 'success')`.

`TestsPage` dagi tab filtrlash: `activeTab === 'scheduled'` → `testList.filter(t => t.status === 'scheduled')`. Har tab o'chirilganda filteredList yangilansin.

Test `status === 'active'` bo'lganda `TestConfigPage` readonly mode: barcha inputlar `disabled`, faqat "Monitoring" tugmasi ko'rinadi.

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
