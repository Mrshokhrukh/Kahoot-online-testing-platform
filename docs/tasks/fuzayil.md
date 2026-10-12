# Store & Infra — Fuzayil

**Branch:** `feature/infra`
**Uchinchi merge qilinadi — barcha store lar va routing.**

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest — o'qituvchilarga AI yordamida uy vazifasi test yaratib, o'quvchilarni nazorat qiladigan platforma.

Siz bu loyihadagi **muhandislik asosi** siz. Siz sahifa ham, komponent ham yozmaysiz — lekin siz yozgan narsalarsiz hech bir sahifa to'g'ri ishlamaydi. Tasavvur qiling: Parviz login sahifasini yozdi, lekin `authStore` yo'q — token qayerga saqlanadi? Zarrux guruh yaratdi, lekin `groupStore` yo'q — qayerda saqlanadi? Fuzayil yozgan store'lar — barcha feature lar uchun umumiy xotira.

### Loyiha arxitekturasida sizning o'rningiz

```
Brauzer ochiladi
    → App.jsx (sizning router + providers)
        → /login ga boradi (Parviz sahifasi)
        → Login muvaffaqiyatli
        → authStore.setCurrentUser() chaqiriladi (sizning store)
        → router ProtectedRoute tekshiradi (sizning ProtectedRoute)
        → role=teacher → /teacher/dashboard (Shaxruz sahifasi)
```

Barcha yo'l (routing) sizniki. `ROUTES` konstantasi sizniki. Barcha store'lar sizniki. Siz bu narsalarni noto'g'ri yozsangiz — butun loyiha buziladi.

### Siz kimni kutasiz?

**Hech kimni.** Siz Azizbek bilan parallel boshlaysiz. Sizga UI komponent kerak emas — faqat logika va konfiguratsiya.

### Kimlar sizni kutadi?

- **Parviz** — `useAuthStore` import qilishi kerak (1-kun kerak)
- **Fuzayil o'zi** — `ROUTES` konstantasi boshqa barcha dasturchilar ishlatadi
- **Shaxruz, Zarrux, Odiljon, Marufjon** — `groupStore`, `lessonStore` larini kutadi
- **Farid, Sunnatbek** — `testStore` ni kutadi
- **Jahongir** — `studentStore` ni kutadi

### Haftalik ish rejasi

**1-kun (eng muhim):**
- `src/constants/routes.js` — barcha route'larni yozing. Bu fayl birinchi bo'lishi shart — boshqa 14 dasturchi `navigate(ROUTES.TEACHER_DASHBOARD)` deb ishlatadi
- `src/constants/testConstants.js` — `QUESTION_TYPES`, `USER_ROLES`, `INVITE_CODE_LENGTH`
- `src/store/authStore.js` — Parviz kutayapti

**2-kun:**
- `src/store/groupStore.js` — Zarrux kutayapti
- `src/store/lessonStore.js` — Marufjon kutayapti
- `src/store/testStore.js` — Baxrom, Farid, Sunnatbek kutayapti

**3-kun:**
- `src/store/studentStore.js` — Jahongir kutayapti
- `src/router/ProtectedRoute.jsx` — authStore dan currentUser tekshiradi

**4-kun:**
- `src/router/index.jsx` — barcha route'larni ulaш. Sahifalar hali tayyor bo'lmasa — placeholder yozasiz
- `src/main.jsx` + `src/App.jsx` — RouterProvider bilan

**5-kun:**
- Barcha route'lar ishlayaptimi tekshiring (brauzerda har URL ni oching)
- PR oching

### Muhim nuqtalar

`ROUTES` ob'ektini yozganda — boshqa dasturchilar bilan kelishilgan nom formatiga rioya qiling. Masalan, `ROUTES.TEACHER_DASHBOARD` — bu Shaxruz `navigate(ROUTES.TEACHER_DASHBOARD)` deb ishlatadi. Agar siz `ROUTES.DASHBOARD` deb yozsangiz — Shaxruz noto'g'ri nom topadi va xato chiqadi.

`ProtectedRoute` ikki holatni tekshiradi:
1. `currentUser` yo'q → `/login` ga qaytarish
2. `currentUser.role` noto'g'ri → `/login` ga qaytarish

Teacher sahifasi `/teacher/*` — faqat `role='teacher'` uchun. Student sahifasi `/student/*` — faqat `role='student'` uchun. Test session `/test/*` — ikkalasi uchun ham ochiq.

---

## Sizga tegishli fayllar

```
src/
├── store/
│   ├── authStore.js
│   ├── groupStore.js
│   ├── lessonStore.js
│   ├── testStore.js
│   └── studentStore.js
├── constants/
│   ├── routes.js
│   ├── testConstants.js
│   └── appConstants.js
└── router/
    ├── index.jsx
    └── ProtectedRoute.jsx
```

---

## Har faylning vazifasi

### constants/routes.js — BARCHA dasturchilar ishlatadiган

```js
export const ROUTES = {
  // Auth
  LOGIN:           '/login',
  REGISTER:        '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Teacher
  TEACHER_DASHBOARD:    '/teacher/dashboard',
  TEACHER_GROUPS:       '/teacher/groups',
  TEACHER_GROUP_NEW:    '/teacher/groups/new',
  TEACHER_GROUP:        '/teacher/groups/:groupId',
  TEACHER_MEMBERS:      '/teacher/groups/:groupId/members',
  TEACHER_LESSONS:      '/teacher/groups/:groupId/lessons',
  TEACHER_LESSON_NEW:   '/teacher/groups/:groupId/lessons/new',
  TEACHER_LESSON:       '/teacher/groups/:groupId/lessons/:lessonId',
  TEACHER_AI_GENERATE:  '/teacher/lessons/:lessonId/generate',
  TEACHER_TEST_PREVIEW: '/teacher/lessons/:lessonId/test/preview',
  TEACHER_TEST_EDIT:    '/teacher/lessons/:lessonId/test/edit',
  TEACHER_TESTS:        '/teacher/tests',
  TEACHER_TEST_CONFIG:  '/teacher/tests/:testId/configure',
  TEACHER_MONITOR:      '/teacher/tests/:testId/monitor',
  TEACHER_RESULTS:      '/teacher/tests/:testId/results',
  TEACHER_ANALYTICS:    '/teacher/groups/:groupId/analytics',
  STUDENT_ANALYTICS:    '/teacher/students/:studentId/analytics',

  // Student
  STUDENT_DASHBOARD: '/student/dashboard',
  STUDENT_GROUPS:    '/student/groups',
  STUDENT_JOIN:      '/student/join',
  STUDENT_RESULTS:   '/student/results',

  // Test Session (teacher + student)
  TEST_WAITING:  '/test/:testId/waiting',
  TEST_ACTIVE:   '/test/:testId',
  TEST_COMPLETE: '/test/:testId/complete',
}
```

### constants/testConstants.js

```js
export const TEST_DURATION_MINUTES = 30
export const MAX_QUESTION_COUNT = 30
export const MIN_QUESTION_COUNT = 5
export const QUESTION_TYPES = {
  QUIZ:       'quiz',
  TRUE_FALSE: 'true_false',
  CODE:       'code',
  OPEN:       'open',
}
export const USER_ROLES = {
  TEACHER: 'teacher',
  STUDENT: 'student',
}
export const INVITE_CODE_LENGTH = 6
```

### authStore.js

```js
// Holat: currentUser, authToken, isAuthLoading
// Amallar: setCurrentUser, setAuthToken, clearAuth
// authToken → localStorage dan o'qiladi/yoziladi
```

### groupStore.js

```js
// Holat: groupList, activeGroup
// Amallar: setGroupList, setActiveGroup, addGroup, removeGroup
```

### lessonStore.js

```js
// Holat: lessonList, activeLesson
// Amallar: setLessonList, setActiveLesson, addLesson
```

### testStore.js

```js
// Holat: testList, activeTest, currentQuestion, testStatus
// testStatus: 'idle' | 'waiting' | 'active' | 'completed'
// Amallar: setActiveTest, setCurrentQuestion, setTestStatus
```

### studentStore.js

```js
// Holat: myGroupList, upcomingTestList, myResultList
// Amallar: setMyGroupList, setUpcomingTestList, addMyResult
```

### router/index.jsx

```
Himoyasiz: /login, /register, /forgot-password
           /test/:testId/waiting, /test/:testId, /test/:testId/complete

Teacher himoyalangan: /teacher/* — faqat role='teacher' bo'lsa
Student himoyalangan: /student/* — faqat role='student' bo'lsa
```

### router/ProtectedRoute.jsx

```js
// Props: allowedRole ('teacher'|'student'|null)
// currentUser yo'q → /login
// currentUser.role !== allowedRole → /login
// To'g'ri → <Outlet />
```

---

## Qoidalar

1. Har store faqat o'z domeniga tegishli holat saqlaydi
2. `ROUTES` konstantasidagi yo'llar o'zgartirilmaydi — boshqalar shu nomlarni ishlatadi
3. Store dan to'g'ridan-to'g'ri `localStorage` ga yozilmaydi — faqat `authStore` da token uchun ruxsat

---

## Ishlash tartibi

1. `constants/routes.js` — birinchi, hammaga kerak
2. `constants/testConstants.js` + `constants/appConstants.js`
3. `store/authStore.js` — Parviz kutayapti
4. `store/groupStore.js`, `store/lessonStore.js`, `store/testStore.js`, `store/studentStore.js`
5. `router/ProtectedRoute.jsx` → `router/index.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida infra qurmoqdaman. Ism: Fuzayil.
Stack: React + Vite (JSX), Zustand, React Router v6.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/store/, src/constants/, src/router/

Birinchi src/constants/routes.js yarating — ROUTES ob'ekti.
Keyin src/store/authStore.js yarating — Zustand create():
currentUser (null), authToken (localStorage dan),
setCurrentUser, setAuthToken, clearAuth.
```
