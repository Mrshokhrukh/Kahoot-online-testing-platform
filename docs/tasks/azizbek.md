# UI System — Azizbek

**Branch:** `feature/ui-system`
**Birinchi merge qilinadi — hammaga kerak.**

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest — o'qituvchiga dars o'tgandan keyin AI yordamida test tayyorlab, o'quvchilarga avtomatik yuboradigan platforma. O'quvchilar uyda belgilangan vaqtda test ishlaydi, o'qituvchi esa natijalarni real-time ko'radi.

Siz bu loyihadagi **birinchi va eng muhim** dasturchiisiz. Nima uchun? Chunki qolgan 14 ta dasturchi sizning komponentlaringizni ishlatadi. Ular tugma yozishmaydi — sizning `AppButton` ni import qiladi. Ular input yozishmaydi — sizning `AppInput` ni ishlatadi. Siz tayyor bo'lmasdan, hech kim o'z sahifasini to'liq qurolmaydi.

### Haqiqiy stsenariy

Tasavvur qiling: Shaxruz (Teacher Dashboard) o'z sahifasini yozmoqchi. U yuklanish vaqtida spinner ko'rsatishi kerak — **sizning `AppSpinner`** ini ishlatadi. Parviz (Auth) login tugmasini bosganda yuklanish holati kerak — **sizning `AppButton isLoading={true}`** ni ishlatadi. Zarrux guruh kartasida nusxalash tugmasi kerak — **sizning `AppButton`** ini oladi. Barcha 14 dasturchi — sizga bog'liq.

### Siz kimni kutasiz?

**Hech kimni kutmaysiz.** Siz birinchi boshlaysiz. Loyiha o'rnatilishi bilan darhol ishlashni boshlang.

### Kimlar sizni kutadi?

**Barcha 14 dasturchi** sizni kutadi. Ayniqsa:
- **Parviz** — Login/Register sahifasi uchun `AppButton`, `AppInput`, `AppCard`
- **Fuzayil** — `ProtectedRoute` uchun `AppSpinner`
- **Shaxruz** — Dashboard uchun `AppCard`, `AppLayout`, `AppSidebar`
- **Zarrux** — Guruhlar uchun `AppCard`, `AppBadge`, `InviteCodeDisplay`
- Qolgan barcha dasturchilar — biron komponent kerak bo'lganda sizga PR comment yozadi

### Haftalik ish rejasi

**1-kun:**
- Loyihani clone qilib, `npm install` va `npm run dev` ishlating
- `tailwind.config.js` ni oching — rang tokenlarini `docs/UI_SYSTEM.md` dagi palitragen ko'chirib qo'ying
- shadcn o'rnatish: `npx shadcn-ui@latest init`, keyin button, input, dialog, card, badge, avatar, toast
- `AppSpinner.jsx` yarating — eng oddiy va birinchi kerak bo'ladigan komponent

**2-kun:**
- `AppButton.jsx` — variant, size, isLoading, isDisabled holatlari bilan
- `AppInput.jsx` — label, errorMessage bilan
- `AppTextarea.jsx`
- `AppErrorMessage.jsx`

**3-kun:**
- `AppCard.jsx`, `AppBadge.jsx`, `AppAvatar.jsx`
- Har komponentni brauzerda tekshiring — hover, focus, disabled holatlari ishlayaptimi?

**4-kun:**
- `AppModal.jsx` — ESC va fon bosganda yopilishi
- `AppToast.jsx` — `showToast()` funksiyasi eksport qilinadi

**5-kun:**
- `AppLayout.jsx` — sahifa wrapper
- `AppSidebar.jsx` — teacher va student uchun alohida navItems
- `PageHeader.jsx`, `EmptyState.jsx`
- Barcha komponentlarni test qiling, PR oching

### Muhim nuqta

Prop nomlarini o'zingizcha o'zgartirmang. Masalan, `AppButton` da `label` prop bo'lishi kerak — agar siz `text` deb nomlasangiz, Parviz `label` deb yozadi va uning tugmasi bo'sh chiqadi. Barcha prop nomlari ushbu faylda belgilangan — shu nomlar bilan yozing.

Har komponent tayyor bo'lgach — o'sha komponentni `feature/ui-system` branchiga push qiling. Boshqa dasturchilar kutib turmay, allaqachon tayyor komponentlarni pull qilib ishlatishni boshlashi mumkin.

---

## Sahifalar
Yo'q. Siz sahifa emas, barcha dasturchilar foydalanadigan **komponentlar** yaratasiz.

---

## Sizga tegishli fayllar

```
src/
├── components/shared/
│   ├── AppButton.jsx
│   ├── AppInput.jsx
│   ├── AppTextarea.jsx
│   ├── AppModal.jsx
│   ├── AppCard.jsx
│   ├── AppSpinner.jsx
│   ├── AppBadge.jsx
│   ├── AppAvatar.jsx
│   ├── AppToast.jsx
│   ├── AppLayout.jsx
│   ├── AppSidebar.jsx
│   ├── AppErrorMessage.jsx
│   ├── EmptyState.jsx
│   └── PageHeader.jsx
├── lib/utils.js              ← shadcn auto, o'zgartirma
├── tailwind.config.js
└── components.json
```

---

## Har komponentning qoidasi

**AppButton**
- Props: `label`, `onClick`, `variant` (primary|secondary|danger|ghost), `size` (sm|md|lg), `isLoading`, `isDisabled`
- isLoading=true bo'lganda: spinner + disabled

**AppInput**
- Props: `value`, `onChange`, `label`, `placeholder`, `errorMessage`, `isDisabled`, `type`
- errorMessage berilsa — qizil chegara + xato matn

**AppTextarea**
- Props: `value`, `onChange`, `label`, `placeholder`, `errorMessage`, `rows`

**AppModal**
- Props: `isOpen`, `onClose`, `title`, `children`
- ESC va fon bosganda yopiladi

**AppCard**
- Props: `children`, `className`

**AppSpinner**
- Props: `size` (sm|md|lg)

**AppBadge**
- Props: `label`, `variant` (success|danger|warning|info|neutral)

**AppAvatar**
- Props: `name`, `size` (sm|md|lg) — nomdan 2 harf, deterministik rang

**AppToast**
- `showToast(message, type)` funksiyasi eksport qilinadi

**AppLayout**
- Props: `children` — sahifa wrapper, max kenglik, markazga

**AppSidebar**
- Props: `navItems`, `activeRoute` — chap yon navigatsiya
- Teacher va Student uchun navItems farq qiladi

**AppErrorMessage**
- Props: `message` — qizil fon, chegara, xato belgisi

**EmptyState**
- Props: `text`, `icon` — bo'sh holat ko'rinishi

**PageHeader**
- Props: `title`, `subtitle`, `action` (ixtiyoriy tugma/element)

---

## Qoidalar

1. Har komponentda: oddiy · hover · focus · disabled holatlari bo'lsin
2. Hech qanday `useState`, `useEffect`, API chaqiruv yo'q — faqat props
3. Prop nomlari o'zgartirилмайди — boshqalar shu nomni kutadi
4. `docs/UI_SYSTEM.md` dagi rang va o'lchamlarga qat'iy rioya qilinadi

---

## Ishlash tartibi

1. `tailwind.config.js` — rang tokenlarini sozla
2. shadcn o'rnatish: `button`, `input`, `dialog`, `card`, `badge`, `avatar`, `toast`
3. `AppSpinner` → `AppButton` → `AppInput` → `AppErrorMessage`
4. `AppCard` → `AppBadge` → `AppAvatar`
5. `AppModal` → `AppToast`
6. `AppLayout` → `AppSidebar` → `PageHeader` → `EmptyState`

---

## AI ga prompt

```
Men EduTest loyihasida UI System ni qurmoqdaman. Ism: Azizbek.
Stack: React + Vite (JSX), TailwindCSS v4, shadcn/ui.
Qoidalar: CLAUDE.md va docs/UI_SYSTEM.md fayllarida.
Fayllarim: src/components/shared/ papkasi.

Birinchi AppSpinner.jsx yarating:
- Props: size ('sm'|'md'|'lg')
- sm=w-4 h-4, md=w-6 h-6, lg=w-10 h-10
- Rang: border-blue-600, animate-spin
- Default export
```
