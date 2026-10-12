# Jonli Monitoring — Sunnatbek

**Branch:** `feature/monitoring`
**To'rtinchi merge qilinadi — Baxrom bilan parallel.**

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest platformasida test aktiv bo'lganida o'qituvchi real-time o'quvchilarni kuzatishi kerak: kim ulandi, kim ishlayapti, kim tugatdi, kim ulanmadi. Bu — **sizning vazifangiz**.

Siz platformadagi **eng dinamik sahifani** yaratasiz: bitta sahifa, lekin har 2 soniyada yangilanib turadi. O'qituvchi test davomida shu sahifada o'tiradi va hamma narsani kuzatadi.

### Haqiqiy stsenariy

Sardor o'qituvchi kechki 20:00 da Baxrom sahifasidan "Monitoring" tugmasini bosdi. **Sizning** `/teacher/tests/t1/monitor` sahifasi ochildi. U ko'rdi:

- Yuqorida: "5-dars testi — React kursi" + katta qizil timer: "28:45"
- "18 / 22 ta o'quvchi ulandi"
- Grid: 22 ta karta — Ali ✅ Tugatdi (20/20), Vali 🔵 Ishlayapti (12/20), Sardor ⚪ Ulanmadi

Har 2 soniyada ekran yangilanadi: yana 1 ta o'quvchi "Tugatdi" bo'ladi. 28 daqiqada hammasi tugadi.

### Siz kimni kutasiz?

- **Baxrom** — `testId` URL parametri. Baxrom sahifasidan "Monitoring" tugmasi sizga yo'naltiradi.
- **Fuzayil** — `ROUTES.TEACHER_RESULTS` konstantasi (test tugagandan keyin natijalar sahifasiga).
- **Azizbek** — `AppSpinner` (yuklanish uchun), `AppModal` (to'xtatish tasdiqlash uchun), `AppBadge`.

### Kimlar sizni kutadi?

- **Shohjahon** — test tugagandan keyin sizning sahifangizdan "Natijalar" tugmasi Shohjahon sahifasiga yo'naltiradi

### Haftalik ish rejasi

**1-kun:**
- `src/mocks/monitoringMock.js` yarating — `mockMonitoringData`, `mockStudentStatusList`
- `useMonitoring.js` — yuklanish + 2 soniyalik simulatsiya + countdown

**2-kun:**
- `LiveTimer.jsx` — qolgan vaqt MM:SS formatda
- `MonitoringHeader.jsx` — test nomi + timer + holat badge + "To'xtatish" tugmasi

**3-kun:**
- `OverallProgressPanel.jsx` — katta sonlar + progress bar
- `StudentStatusCard.jsx` — ism, holat, progress

**4-kun:**
- `StudentStatusGrid.jsx` — responsive grid
- `QuestionStatsPanel.jsx` — joriy savol statistikasi

**5-kun:**
- `MonitoringPage.jsx` — barchani birlashtirish
- Simulatsiya to'g'ri ishlayaptimi tekshiring: har 2s da o'quvchi holati o'zgaryaptimi?
- PR oching

### Muhim nuqtalar

Real-time simulatsiya `useMonitoring.js` ichida:
```js
setInterval(() => {
  setStudentStatusList(prev => {
    const inProgressIndex = prev.findIndex(s => s.status === 'in_progress')
    if (inProgressIndex === -1) return prev
    const updated = [...prev]
    updated[inProgressIndex] = { ...updated[inProgressIndex], status: 'completed', currentQuestion: updated[inProgressIndex].totalQuestions }
    return updated
  })
}, 2000)
```

Timer `useEffect` cleanup: `return () => clearInterval(interval)` — sahifadan chiqilganda interval to'xtaydi.

"Testni to'xtatish" — `AppModal` da tasdiqlash, keyin mock to'xtatish + `navigate(ROUTES.TEACHER_RESULTS.replace(':testId', testId))`.

---

## Sizga tegishli sahifalar

| Sahifa | Route |
|--------|-------|
| MonitoringPage | `/teacher/tests/:testId/monitor` |

---

## Sizga tegishli fayllar

```
src/
├── components/monitoring/
│   ├── MonitoringHeader.jsx
│   ├── OverallProgressPanel.jsx
│   ├── StudentStatusGrid.jsx
│   ├── StudentStatusCard.jsx
│   ├── QuestionStatsPanel.jsx
│   └── LiveTimer.jsx
├── pages/teacher/monitoring/
│   └── MonitoringPage.jsx
└── hooks/monitoring/
    └── useMonitoring.js
```

---

## Sahifaning funksionalligi

**MonitoringPage** `/teacher/tests/:testId/monitor`

To'rtta asosiy panel:

**1. `MonitoringHeader`**
- Test nomi, guruh nomi
- `LiveTimer` — testda qolgan vaqt (real-time)
- Test holati: "Aktiv" (yashil badge)
- "Testni to'xtatish" tugmasi (qizil, tasdiqlash modal bilan)

**2. `OverallProgressPanel`**
- Katta sonlar:
  - "18 / 22" — testni tugatgan / jami o'quvchilar
  - "%82" — o'rtacha progress
- Progress bar — jami tugatganlar foizi
- "Ulanmagan: 4 kishi" (qizil)

**3. `StudentStatusGrid`**
- Har o'quvchi uchun `StudentStatusCard`:
  - Ism + avatar
  - Holat: "Ulangan" 🟢 | "Ishlayapti" 🔵 | "Tugatdi" ✅ | "Ulanmagan" ⚪
  - Progress: "12/20 savol"
  - O'rtacha to'g'ri foizi (agar ma'lum bo'lsa)
- Grid: mobile=2 ta, tablet=3 ta, desktop=4-5 ta ustun

**4. `QuestionStatsPanel`**
- Joriy savol statistikasi (o'quvchilar oxirgi savolda):
  - Har variant uchun foiz (Quiz uchun A/B/C/D)
  - "15 kishi javob berdi, 7 kishi hali bermoqda"

---

## Mock ma'lumot (real-time simulatsiya)

```js
// src/mocks/monitoringMock.js
export const mockMonitoringData = {
  testName: '5-dars testi', groupName: 'React kursi',
  remainingSeconds: 1547,
  totalStudents: 22,
  stats: { connected: 18, inProgress: 12, completed: 6, disconnected: 4 },
}

export const mockStudentStatusList = [
  { id: 's1', name: 'Ali Karimov', status: 'completed',
    currentQuestion: 20, totalQuestions: 20, correctRate: 85 },
  { id: 's2', name: 'Vali Toshmatov', status: 'in_progress',
    currentQuestion: 12, totalQuestions: 20, correctRate: null },
  { id: 's3', name: 'Sardor Yo\'ldoshev', status: 'disconnected',
    currentQuestion: 0, totalQuestions: 20, correctRate: null },
  // ...
]
```

---

## Real-time simulatsiya qoidasi

```js
// useMonitoring.js ichida — har 2 soniyada holat yangilanadi (mock)
useEffect(() => {
  const interval = setInterval(() => {
    // mock: ba'zi o'quvchilarning status va progress ni yangilash
    // "completed" soni oshib boradi
    // remainingSeconds kamayadi
  }, 2000)
  return () => clearInterval(interval)
}, [])
```

---

## Qoidalar

1. `StudentStatusCard` da holat ranglari: ulangan=ko'k, ishlayapti=sariq, tugatdi=yashil, ulanmagan=kulrang
2. Grid avtomatik scroll bo'lsin (o'quvchilar ko'p bo'lganda)
3. "Testni to'xtatish" — `AppModal` bilan tasdiqlash, keyin mock to'xtatish
4. Timer o'chirilganda (`useEffect` cleanup) interval to'xtatiladi

---

## Ishlash tartibi

1. `useMonitoring.js` — ma'lumot + real-time simulatsiya
2. `LiveTimer.jsx` — qolgan vaqt countdown
3. `MonitoringHeader.jsx`
4. `OverallProgressPanel.jsx`
5. `StudentStatusCard.jsx` → `StudentStatusGrid.jsx`
6. `QuestionStatsPanel.jsx`
7. `MonitoringPage.jsx` — barchani birlashtirish

---

## AI ga prompt

```
Men EduTest loyihasida Jonli Monitoring qurmoqdaman. Ism: Sunnatbek.
Stack: React + Vite (JSX), TailwindCSS v4.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/monitoring/, src/pages/teacher/monitoring/
Mock: src/mocks/monitoringMock.js

Birinchi useMonitoring.js yarating:
- monitoringData, studentStatusList holatlari
- Mock ma'lumot yuklash (setTimeout 600ms)
- Har 2 soniyada: 1 ta o'quvchi 'in_progress' dan 'completed' ga o'tadi (simulatsiya)
- remainingSeconds har soniyada 1 ga kamayadi
```
