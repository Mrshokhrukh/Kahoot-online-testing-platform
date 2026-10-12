# Store & Infra — Fuzayil

**Branch:** `feature/infra`
**Uchinchi merge qilinadi — barcha store lar va routing.**

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
