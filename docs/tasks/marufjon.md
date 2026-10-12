# Dars Builder — Marufjon

**Branch:** `feature/lessons`
**To'rtinchi merge qilinadi — Zarrux bilan parallel.**

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest platformasida test yaratishning birinchi qadami — **dars kiritish**. O'qituvchi dars o'tgandan keyin dars mavzusini, o'tilgan narsalarni yozadi. Keyin AI shu mazmundan test yaratadi. Bu kiritish sahifasi — **sizning vazifangiz**.

Siz o'qituvchiga **dars yaratish va ko'rish** imkonini berasiz. Siz yozgan `LessonDetailPage` dagi "Test yaratish" tugmasi Otabek sahifasiga yo'naltiradi — ya'ni siz Otabekning darvozasiasiz.

### Haqiqiy stsenariy

Sardor o'qituvchi "React kursi" guruhini ochdi (Zarrux sahifasi), "Darslar" tabiga bosdi — **sizning** `/teacher/groups/abc123/lessons` sahifasi ochildi. "Yangi dars" bosdi. **Sizning** `LessonNewPage` i ochildi. U kiritdi:
- Mavzu: "useState va useEffect"
- Darsda o'tilganlar: "useState hook bilan state boshqarish, useEffect bilan side effect..."
- Teglar: useState, useEffect, Hooks
- "Saqlash va test yaratish" bosdi

Va u **Otabek sahifasiga** (`/teacher/lessons/l2/generate`) yo'naltirildi.

### Siz kimni kutasiz?

- **Zarrux** — `groupId` URL parametri. Zarrux sahifasining "Darslar" tabidan navigatsiya keladi.
- **Fuzayil** — `lessonStore` dan `setActiveLesson`, `ROUTES.TEACHER_AI_GENERATE` konstantasi.
- **Azizbek** — `LessonStatusBadge` uchun `AppBadge`, `LessonCard` uchun `AppCard`.

### Kimlar sizni kutadi?

- **Otabek** — `LessonDetailPage` dagi "Test yaratish" tugmasi Otabek sahifasiga `lessonId` bilan yo'naltiradi. Otabek `lessonContent` ni ko'rsatishi kerak — siz yozgan mock mazmun shu yerda bo'ladi.

### Haftalik ish rejasi

**1-kun:**
- `src/mocks/lessonsMock.js` yarating
- `useLessonList.js` hook — mock darslar

**2-kun:**
- `LessonStatusBadge.jsx` — 3 holat: "Test yo'q" / "Rejalashtirilgan" / "O'tdi"
- `TopicTagList.jsx` — teglar ko'rinishi
- `LessonCard.jsx`

**3-kun:**
- `LessonsPage.jsx` — xronologik ro'yxat
- Brauzerda tekshiring: bo'sh holat, yuklash animatsiyasi

**4-kun:**
- `useLessonForm.js` — validatsiya bilan (content min 50 belgi, title majburiy)
- `LessonForm.jsx` — tag input (Enter/vergul bilan teg qo'shish)

**5-kun:**
- `LessonNewPage.jsx` + `LessonDetailPage.jsx`
- "Saqlash va test yaratish" → Otabek sahifasiga redirect
- PR oching

### Muhim nuqtalar

Tag input mexanizmi: `topicList` state da teglar saqlangan. Input da Enter yoki vergul bosilganda `addTopic()` chaqiriladi, yangi teg qo'shiladi. Teg yonidagi `×` bosilganda `removeTopic()`.

`LessonDetailPage` dagi `LessonStatusBadge`:
- `testStatus === 'none'` → sariq "Test yaratilmagan" + "Test yaratish" tugmasi
- `testStatus === 'completed'` → yashil "Test o'tdi" + "Natijalar" tugmasi

"Saqlash va test yaratish": `navigate(ROUTES.TEACHER_AI_GENERATE.replace(':lessonId', lessonId))`

---

## Sizga tegishli sahifalar

| Sahifa | Route |
|--------|-------|
| LessonsPage | `/teacher/groups/:groupId/lessons` |
| LessonNewPage | `/teacher/groups/:groupId/lessons/new` |
| LessonDetailPage | `/teacher/groups/:groupId/lessons/:lessonId` |

---

## Sizga tegishli fayllar

```
src/
├── components/lessons/
│   ├── LessonCard.jsx
│   ├── LessonForm.jsx
│   ├── TopicTagList.jsx
│   └── LessonStatusBadge.jsx
├── pages/teacher/lessons/
│   ├── LessonsPage.jsx
│   ├── LessonNewPage.jsx
│   └── LessonDetailPage.jsx
└── hooks/lessons/
    ├── useLessonList.js
    └── useLessonForm.js
```

---

## Har sahifaning funksionalligi

**LessonsPage** `/teacher/groups/:groupId/lessons`
- "Darslar — [guruh nomi]" sarlavhasi
- Xronologik ro'yxat — `LessonCard` bilan
- Har karta: dars raqami, mavzu, sana, mavzular teglari, test holati
- "Yangi dars" tugmasi → `/teacher/groups/:groupId/lessons/new`
- Bo'sh holat: "Hali dars kiritilmagan"

**LessonNewPage** `/teacher/groups/:groupId/lessons/new`
- `LessonForm`:
  - Dars raqami (avto yoki qo'lda: 1, 2, 3...)
  - Dars mavzusi (majburiy, text input)
  - Dars sanasi (date picker)
  - Darsda o'tilgan narsalar (katta textarea — asosiy mazmun)
  - Mavzular teglari (tag input: Enter bosganda yangi teg)
- "Saqlash va test yaratish" tugmasi → Otabek sahifasiga yo'naltiradi
- "Faqat saqlash" tugmasi → darslar ro'yxatiga qaytadi

**LessonDetailPage** `/teacher/groups/:groupId/lessons/:lessonId`
- Dars ma'lumotlari: mavzu, sana, raqam
- Darsda o'tilgan narsalar (to'liq matn)
- Mavzular teglari
- `LessonStatusBadge`: "Test yaratilmagan" | "Test rejalashtirilgan" | "Test o'tdi"
- "Test yaratish" tugmasi (agar test yo'q bo'lsa) → Otabek sahifasi
- "Test ko'rish" tugmasi (test yaratilgan bo'lsa) → Baxrom sahifasi

---

## Mock ma'lumot

```js
// src/mocks/lessonsMock.js
export const mockLessonList = [
  {
    id: 'l1', lessonNumber: 1, title: 'React asoslari',
    date: '2026-10-01', subject: 'Dasturlash',
    content: 'Bugun biz React nima ekanligini, komponent tushunchasini, JSX sintaksisini o\'rgandik...',
    topics: ['React', 'JSX', 'Komponent'],
    testStatus: 'completed',
  },
  {
    id: 'l2', lessonNumber: 2, title: 'useState va useEffect',
    date: '2026-10-03',
    content: 'useState hook ni o\'rgandik. State nima, qanday o\'zgaradi...',
    topics: ['useState', 'useEffect', 'Hooks'],
    testStatus: 'none',
  },
]
```

---

## Qoidalar

1. "Darsda o'tilgan narsalar" textarea — kamida 50 belgi bo'lishi shart (validatsiya)
2. Tag input: Enter yoki vergul bosganda yangi teg qo'shiladi
3. Tag o'chiriladi: teg yonidagi × tugmasi
4. `lessonStore` dan `setActiveLesson` chaqiriladi (Fuzayil yozadi)

---

## Ishlash tartibi

1. `useLessonList.js` — mock darslar ro'yxati
2. `LessonStatusBadge.jsx` + `TopicTagList.jsx`
3. `LessonCard.jsx` → `LessonsPage.jsx`
4. `useLessonForm.js` — validatsiya bilan
5. `LessonForm.jsx` → `LessonNewPage.jsx`
6. `LessonDetailPage.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida Dars Builder qurmoqdaman. Ism: Marufjon.
Stack: React + Vite (JSX), TailwindCSS v4.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/lessons/, src/pages/teacher/lessons/
Mock: src/mocks/lessonsMock.js

Birinchi useLessonForm.js yarating:
- lessonNumber, lessonTitle, lessonDate, lessonContent, topicList holatlari
- addTopic(tag), removeTopic(tag) funksiyalari
- validateLessonForm(): title bo'sh emas, content min 50 belgi
- handleSaveLesson(): mock saqlash → navigatsiya
```
