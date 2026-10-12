# Auth — Parviz

**Branch:** `feature/auth`
**Ikkinchi merge qilinadi (UI System dan keyin).**

---

## Sizga tegishli sahifalar

| Sahifa | Route | Kimga |
|--------|-------|-------|
| LoginPage | `/login` | Teacher + Student |
| RegisterPage | `/register` | Teacher + Student (rol tanlaydi) |
| ForgotPasswordPage | `/forgot-password` | Har ikki rol |

---

## Sizga tegishli fayllar

```
src/
├── components/auth/
│   ├── LoginForm.jsx
│   ├── RegisterForm.jsx
│   ├── RoleSelector.jsx
│   └── ForgotPasswordForm.jsx
├── pages/auth/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── ForgotPasswordPage.jsx
└── hooks/auth/
    ├── useLoginForm.js
    └── useRegisterForm.js
```

---

## Har sahifaning funksionalligi

**LoginPage** `/login`
- Email + parol inputlari
- "Kirish" tugmasi
- "Ro'yxatdan o'tish" havolasi
- "Parolni unutdim" havolasi
- Xato: "Email yoki parol noto'g'ri"
- Muvaffaqiyat: rol bo'yicha yo'naltirish
  - teacher → `/teacher/dashboard`
  - student → `/student/dashboard`

**RegisterPage** `/register`
- Ism, email, parol, parolni tasdiqlash inputlari
- RoleSelector — "O'qituvchi" yoki "O'quvchi" kartalar
- Validatsiya: email format, parol min 8 belgi, parollar mos
- Muvaffaqiyat → `/login` ga yo'naltirish

**ForgotPasswordPage** `/forgot-password`
- Email input
- "Yuborish" tugmasi
- Muvaffaqiyat: "Email yuborildi" xabari

---

## Qoidalar

1. Rol tanlash (`RoleSelector`) ko'zga ko'rinadigan, katta kartalarda bo'lsin — 2 ta karta: Teacher | Student
2. Form yuborilganda: `isLoading=true` → tugma disabled + spinner
3. Xato xabarlari aniq bo'lsin: `"Email manzil noto'g'ri formatda"`, `"Parol kamida 8 belgi"`
4. Token saqlanishi: `localStorage.setItem('authToken', token)`
5. `useAuthStore` dan `setCurrentUser` va `setAuthToken` chaqiriladi (Fuzayil yozadi)

---

## Mock ma'lumot

```js
// src/mocks/authMock.js
export const mockTeacherUser = {
  id: '1', name: 'Sardor Usmonov',
  email: 'teacher@test.com', role: 'teacher',
}
export const mockStudentUser = {
  id: '2', name: 'Ali Karimov',
  email: 'student@test.com', role: 'student',
}
```

---

## Ishlash tartibi

1. `useLoginForm.js` hook — email, password, isLoading, error holatlari
2. `LoginForm.jsx` → `LoginPage.jsx`
3. `RoleSelector.jsx` (teacher/student 2 ta karta)
4. `useRegisterForm.js` hook — validatsiya bilan
5. `RegisterForm.jsx` → `RegisterPage.jsx`
6. `ForgotPasswordForm.jsx` → `ForgotPasswordPage.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida Auth featureni qurmoqdaman. Ism: Parviz.
Stack: React + Vite (JSX), TailwindCSS v4, shadcn/ui, Zustand.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/auth/, src/pages/auth/, src/hooks/auth/
Mock: src/mocks/authMock.js

Birinchi useLoginForm.js hook yarating:
- Holat: emailValue, passwordValue, formError, isSubmitting
- validateLoginForm(): email format + parol min 8 belgi tekshiradi
- handleLoginSubmit(): validatsiya → mock login (setTimeout 800ms)
  → teacher bo'lsa /teacher/dashboard, student bo'lsa /student/dashboard
```
