# Auth — Parviz

**Branch:** `feature/auth`
**Ikkinchi merge qilinadi (UI System dan keyin).**

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest platformasiga kirish uchun birinchi to'siq — bu sizning sahifalaringiz. O'qituvchi ham, o'quvchi ham dastlab sizning `LoginPage` ingizdan o'tadi. Siz faqat sahifalar yozmaysiz — siz butun autentifikatsiya tizimini qurасиz: kim kirdi, qanday rol bor, qayerga yo'naltirish kerak.

### Haqiqiy stsenariy

Sardor o'qituvchi (teacher) platformaga birinchi marta kirmoqchi. U brauzerda `edutest.uz` ni ochadi — `/login` sahifasi ochiladi (sizning sahifangiz). U email va parolini kiritadi, "Kirish" tugmasini bosadi. Platforma uning rolini aniqlaydi: `role: 'teacher'` — va `/teacher/dashboard` ga yo'naltiradi (Shaxruzning sahifasi).

Ali esa o'quvchi (student). U ham shu `/login` sahifasini ko'radi, email-parolini kiritadi, platforma `role: 'student'` deb `/student/dashboard` ga jo'natadi (Jahongirning sahifasi).

Agar yangi foydalanuvchi bo'lsa — `/register` sahifasiga o'tadi (ham sizning sahifangiz). U yerda **rol tanlash** eng muhim: "O'qituvchiman" yoki "O'quvchiman" — bu kartalar katta va aniq ko'rinishi kerak.

### Siz kimni kutasiz?

**Azizbek** — UI komponentlari: `AppButton`, `AppInput`, `AppCard`, `AppErrorMessage`. Azizbek komponentlarini tayyor qilguncha, siz oddiy HTML `<button>` va `<input>` bilan placeholder yozishingiz mumkin. Keyin almashtirасиз.

**Fuzayil** — `authStore.js` dan `useAuthStore`, `setCurrentUser`, `setAuthToken`. Fuzayil store ni yozguncha, siz o'zingiz vaqtinchalik local state ishlatishingiz mumkin.

### Kimlar sizni kutadi?

- **Shaxruz** — teacher login qilmasa dashboard ko'rinmaydi, sizning authStore ga yozish kerak
- **Jahongir** — student login qilmasa student dashboard ishlamaydi
- **Fuzayil** — `ProtectedRoute` authStore ni tekshiradi, siz token to'g'ri yozmagan bo'lsangiz himoyalangan sahifalar ochilmaydi

Amalda: siz tayyor bo'lmasdan, hech kim o'z sahifasini to'liq sinab ko'rolmaydi.

### Haftalik ish rejasi

**1-kun:**
- `src/mocks/authMock.js` yarating
- `useLoginForm.js` hook ni yozing — email, password, validatsiya, mock login
- `LoginForm.jsx` — bu hook ni ishlatib forma

**2-kun:**
- `LoginPage.jsx` — forma + sahifa dizayni (logo yuqorida, forma markazda)
- Brauzerda oching, test qiling: bo'sh yuborilsa xato chiqadimi, spinner ishlayaptimi?

**3-kun:**
- `RoleSelector.jsx` — ikkita katta karta (Teacher / Student), biri tanlananda active ko'rinishi
- `useRegisterForm.js` — barcha validatsiyalar bilan (parollar mosligini tekshirish ham)

**4-kun:**
- `RegisterForm.jsx` → `RegisterPage.jsx`
- Teacher sifatida register qiling → login qiling → dashboard ga bordi? Test qiling

**5-kun:**
- `ForgotPasswordForm.jsx` → `ForgotPasswordPage.jsx`
- Barcha holatlari tekshiring, PR oching

### Muhim nuqtalar

1. Login muvaffaqiyatli bo'lganda `localStorage.setItem('authToken', 'mock-token')` qiling — Fuzayilning `ProtectedRoute` shu token bor-yo'qligini tekshiradi.

2. `currentUser` ob'ekti aynan shu formatda bo'lsin: `{ id, name, email, role }` — Shaxruz va Jahongir ism ko'rsatish uchun `currentUser.name` ni ishlatadi.

3. Ro'yxatdan o'tganida `role` aniq saqlansin: `'teacher'` yoki `'student'` — boshqa qiymat bo'lsa ProtectedRoute noto'g'ri yo'naltiradi.

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
