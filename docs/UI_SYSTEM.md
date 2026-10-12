# QuizMaster UI System

> Barcha dasturchilar uchun majburiy o'qish.
> UI System tayyor bo'lmasdan boshqa featurelarga o'tilmaydi.

---

## Nima uchun UI System birinchi?

12 dasturchi bir loyihada ishlaydi. Har biri o'z uslubida yozsa — loyiha tutarsiz ko'rinadi.
UI System barcha uchun "bitta til" — har dasturchi bir xil komponentni, bir xil rangda, bir xil o'lchamda ishlatadi.

---

## Ranglar Palitasi

Faqat quyidagi ranglarni ishlatish mumkin. Boshqa rang — PR rad etiladi.

```
ASOSIY (Primary)
  blue-600   #2563EB  — tugmalar, faol havolalar
  blue-700   #1D4ED8  — hover holati
  blue-50    #EFF6FF  — yengil fon, highlight

XAVFli (Danger)
  red-500    #EF4444  — xato xabar, o'chirish
  red-600    #DC2626  — hover holati
  red-50     #FEF2F2  — xato fon

MUVAFFAQIYAT (Success)
  green-500  #22C55E  — to'g'ri javob, muvaffaqiyat
  green-600  #16A34A  — hover holati
  green-50   #F0FDF4  — muvaffaqiyat fon

OGOHLANTIRISH (Warning)
  yellow-400 #FACC15  — ehtiyot, kutish
  yellow-500 #EAB308  — hover holati
  yellow-50  #FEFCE8  — ogohlantirish fon

NEYTRAL (Neutral)
  gray-50    #F9FAFB  — sahifa foni
  gray-100   #F3F4F6  — karta foni, input foni
  gray-200   #E5E7EB  — chegara, ajratgich
  gray-400   #9CA3AF  — placeholder, ikkinchi darajali matn
  gray-600   #4B5563  — asosiy matn (yengil)
  gray-900   #111827  — asosiy matn (qoramtir)
  white      #FFFFFF  — karta foni, modal foni
```

**O'yin javob ranglari (Kahoot uslubi):**
```
A varianti:  red-500    — qizil
B varianti:  blue-600   — ko'k
C varianti:  green-500  — yashil
D varianti:  yellow-400 — sariq
```

---

## Tipografiya

```
Shrift: Inter (Google Fonts yoki system-ui fallback)

SARLAVHALAR
  text-3xl font-bold     — sahifa sarlavhasi (H1)
  text-2xl font-bold     — bo'lim sarlavhasi (H2)
  text-xl  font-semibold — kichik sarlavha (H3)
  text-lg  font-semibold — karta sarlavhasi

ASOSIY MATN
  text-base              — oddiy matn (16px)
  text-sm                — ikkinchi darajali matn (14px)
  text-xs                — yorliq, meta matn (12px)

MAXSUS
  text-6xl font-black    — PIN raqami (katta)
  text-4xl font-bold     — ball, natija
```

---

## Bo'shliq (Spacing) Tizimi

```
Ichki bo'shliq (padding):
  p-2  (8px)   — kichik element
  p-3  (12px)  — tugma, input
  p-4  (16px)  — karta
  p-6  (24px)  — katta karta, modal
  p-8  (32px)  — sahifa bo'limi

Tashqi bo'shliq (gap/margin):
  gap-2  (8px)   — kichik elementlar orasida
  gap-4  (16px)  — standart
  gap-6  (24px)  — bo'limlar orasida
  gap-8  (32px)  — katta bo'limlar
```

---

## Chegara Radiusi (Border Radius)

```
rounded-sm   (4px)   — input, kichik element
rounded-md   (8px)   — tugma, badge
rounded-lg   (12px)  — karta
rounded-xl   (16px)  — katta karta, modal
rounded-full         — yumaloq (avatar, badge)
```

---

## Soya (Shadow)

```
shadow-sm    — kichik karta
shadow-md    — asosiy karta
shadow-lg    — modal, dropdown
shadow-xl    — muhim element
```

---

## Komponentlar Spesifikatsiyasi

### AppButton

```
Variantlar:
  primary   — bg-blue-600, hover:bg-blue-700, text-white
  secondary — bg-white, border border-gray-200, hover:bg-gray-50, text-gray-900
  danger    — bg-red-500, hover:bg-red-600, text-white
  ghost     — bg-transparent, hover:bg-gray-100, text-gray-600

O'lchamlar:
  sm  — px-3 py-1.5 text-sm  min-h-[36px]
  md  — px-4 py-2   text-base min-h-[44px]  (standart)
  lg  — px-6 py-3   text-lg   min-h-[52px]

Holatlar (barchasi bo'lishi shart):
  isLoading   — matn o'rniga spinner, disabled holat
  isDisabled  — opacity-50, cursor-not-allowed
  hover       — rangni bir daraja to'qlashtirish
  focus       — ring-2 ring-blue-400 ring-offset-2
  active      — scale-[0.98]
```

### AppInput

```
Holatlar:
  default  — border border-gray-200, bg-white
  focus    — border-blue-500, ring-1 ring-blue-500
  error    — border-red-500, ring-1 ring-red-500
  disabled — bg-gray-100, cursor-not-allowed

Elementlar:
  label   — text-sm font-medium text-gray-700, mb-1
  input   — w-full, rounded-md, px-3 py-2
  xato    — text-sm text-red-600, mt-1 (errorMessage prop)
```

### AppCard

```
Standart: bg-white rounded-xl shadow-md p-6
Hover: hover:shadow-lg transition-shadow duration-150
```

### AppModal

```
Overlay:  fixed inset-0, bg-black/50, z-50
Kontent:  bg-white rounded-xl shadow-xl, max-w-md w-full, p-6
Yopish:   ESC klavishi va outside click
```

### AppSpinner

```
sm:  w-4 h-4
md:  w-6 h-6   (standart)
lg:  w-10 h-10

Rang: border-blue-600
Animatsiya: animate-spin
```

### AppBadge

```
success  — bg-green-100 text-green-700
danger   — bg-red-100   text-red-700
warning  — bg-yellow-100 text-yellow-700
info     — bg-blue-100  text-blue-700
neutral  — bg-gray-100  text-gray-600
```

### AppAvatar

```
O'lchamlar: sm (w-8 h-8), md (w-10 h-10), lg (w-14 h-14)
Kontent:    initials (2 harf) yoki rasm
Fon rang:   foydalanuvchi nomidan deterministik rang
```

### AppErrorMessage

```
Ko'rinish: bg-red-50 border border-red-200 rounded-lg p-4
Matn:      text-red-700 text-sm
Aniq bo'lishi shart: nima bo'ldi + foydalanuvchi nima qila oladi
```

---

## Animatsiya Qoidalari

```jsx
// FAQAT Tailwind transition klasi
className="transition-colors duration-150"    ✅
className="transition-all duration-200"       ✅
className="transition-shadow duration-150"    ✅

// TAQIQLANGAN — maxsus animatsiya
@keyframes myAnimation { ... }    ❌
animation: myAnimation 0.3s       ❌
```

---

## Responsive Dizayn

**Mobile-first** — avval kichik ekran, keyin katta ekran:

```jsx
// Asosiy sahifa konteyneri
<div className="min-h-screen bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    ...
  </div>
</div>

// Grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

// Flex
<div className="flex flex-col sm:flex-row gap-4">
```

---

## Accessibility Minimumi

```jsx
// Har tugmada aria-label (agar matn yo'q bo'lsa)
<button aria-label="Quizni o'chirish">
  <Trash2 className="w-4 h-4" />
</button>

// Har formda label
<label htmlFor="emailInput">Email</label>
<input id="emailInput" type="email" />

// Xato holat
<input aria-invalid={hasError} aria-describedby="emailError" />
<p id="emailError" role="alert">{errorMessage}</p>
```

---

## UI System Fayllar Tuzilishi

```
src/
├── components/
│   └── shared/
│       ├── AppButton.jsx
│       ├── AppInput.jsx
│       ├── AppModal.jsx
│       ├── AppCard.jsx
│       ├── AppSpinner.jsx
│       ├── AppBadge.jsx
│       ├── AppAvatar.jsx
│       ├── AppToast.jsx
│       ├── AppLayout.jsx
│       └── AppErrorMessage.jsx
└── lib/
    └── utils.js            ← shadcn auto (o'zgartirma)
```

---

## Boshqa Dasturchilar uchun Qoida

UI System komponentlari tayyor bo'lguncha:
- Har feature o'z sahifasida `<div>Loading...</div>` placeholder ishlatadi
- UI System tayyor bo'lgach — barcha placeholder almashtiriladi

Komponent yetishmasa:
- O'zingiz yaratmang
- PR comment orqali @alex-uz11 ga xabar bering
- Javob 24 soat ichida bo'ladi
