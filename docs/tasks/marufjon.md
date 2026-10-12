# Dars Builder — Marufjon

**Branch:** `feature/lessons`

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
