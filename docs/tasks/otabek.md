# AI Test Generatsiya — Otabek

**Branch:** `feature/ai-generation`
**To'rtinchi merge qilinadi — Jasur bilan parallel.**

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest platformasida o'qituvchi dars kiritgandan keyin (Marufjon sahifasi) AI yordamida test yaratatadi. Bu jarayon — **sizning vazifangiz**. Siz 3 bosqichli ekran qurasiz: sozlash → generatsiya animatsiyasi → natija ko'rish va tahrirlash.

Siz platformaning **eng ko'rinarli** qismini yaratasiz: AI generatsiya animatsiyasi, preview ekrani, savol tahrirlash.

### Haqiqiy stsenariy

Sardor "2-dars: useState va useEffect" ni saqladi va "Saqlash va test yaratish" bosdi (Marufjon). **Sizning** `/teacher/lessons/l2/generate` sahifasi ochildi. U ko'radi:
1. Chap tomonda: dars mazmuni (o'qituvchiga eslatish uchun)
2. O'ng tomonda: sozlamalar — "20 ta savol", "Quiz ✓ T/F ✓ Kod ✓ Ochiq ✓", "O'rta qiyinlik"
3. "AI bilan test yaratish" tugmasini bosdi → **generatsiya animatsiyasi** (3 soniya)
4. "20 ta savol yaratildi" → `TestPreviewPage` ga o'tdi
5. U yerda savollarni ko'rdi, 2-savolni tahrirlash kerak dedi → `TestEditPage` ga o'tdi
6. Tahrirladi, "Saqlash" bosdi → Baxrom sahifasiga yo'naltirildi (test sozlash uchun)

### Siz kimni kutasiz?

- **Marufjon** — `lessonId` URL parametri. Siz `useParams()` dan olasiz va mock dars mazmunini ko'rsatish uchun ishlatiladi.
- **Jasur** — `QuizQuestionEditor`, `TrueFalseEditor`, `CodeQuestionEditor`, `OpenQuestionEditor` komponentlari. Jasur yozguncha, `QuestionEditorWrapper` da placeholder `<div>Savol #{index}</div>` ko'rsating.

### Kimlar sizni kutadi?

- **Baxrom** — "Qabul qilish va davom etish" tugmasi Baxrom sahifasiga (`/teacher/tests/:testId/configure`) yo'naltiradi

### Haftalik ish rejasi

**1-kun:**
- `src/mocks/aiMock.js` yarating — `mockGeneratedTest` ob'ekti
- `useAiGenerate.js` hook — generationStatus: idle → loading → done

**2-kun:**
- `LessonContentPanel.jsx` — dars mazmunini ko'rsatish
- `GenerationSettings.jsx` — slider + checkbox + select

**3-kun:**
- `GeneratingAnimation.jsx` — CSS animatsiya ("AI fikrlamoqda..." pulsing)
- `AiGeneratePage.jsx` — 3 bosqichni birlashtirish
- Brauzerda test: "AI bilan test yaratish" bosing, 3s kutib preview ko'rining

**4-kun:**
- `GeneratedTestPreview.jsx` — savollar ro'yxati (tur belgisi + matn)
- `TestPreviewPage.jsx`

**5-kun:**
- `useTestEditor.js` — savol qo'shish/o'chirish/tahrirlash
- `QuestionEditorWrapper.jsx` — Jasur komponentlarini import qiladi
- `TestEditPage.jsx`
- PR oching

### Muhim nuqtalar

`GeneratingAnimation` da animatsiya davomida sahifa o'zi scroll bo'lmasin: `overflow: hidden` asosiy wrapper da.

`QuestionEditorWrapper` — savol turini tekshirib, Jasur komponentini import qiladi. Jasur tayyor bo'lguncha:
```jsx
function QuestionEditorWrapper({ question, onChange }) {
  return <div className="border rounded p-4">Savol {question.type}: {question.questionText}</div>
}
```

Keyin Jasur tayyor bo'lganda to'liq versiyani yozing.

"Qabul qilish va davom etish" → `navigate(ROUTES.TEACHER_TEST_CONFIG.replace(':testId', 'new-test-id'))`

---

## Sizga tegishli sahifalar

| Sahifa | Route |
|--------|-------|
| AiGeneratePage | `/teacher/lessons/:lessonId/generate` |
| TestPreviewPage | `/teacher/lessons/:lessonId/test/preview` |
| TestEditPage | `/teacher/lessons/:lessonId/test/edit` |

---

## Sizga tegishli fayllar

```
src/
├── components/ai-generation/
│   ├── LessonContentPanel.jsx
│   ├── GenerationSettings.jsx
│   ├── GeneratingAnimation.jsx
│   ├── GeneratedTestPreview.jsx
│   └── QuestionEditorWrapper.jsx
├── pages/teacher/ai-generation/
│   ├── AiGeneratePage.jsx
│   ├── TestPreviewPage.jsx
│   └── TestEditPage.jsx
└── hooks/ai-generation/
    ├── useAiGenerate.js
    └── useTestEditor.js
```

---

## Har sahifaning funksionalligi

**AiGeneratePage** `/teacher/lessons/:lessonId/generate`

Uch bosqichli ekran:

*Bosqich 1 — Sozlash:*
- `LessonContentPanel` — dars mazmunini ko'rsatadi (Marufjon dan keladi)
- `GenerationSettings`:
  - Savol soni (slider: 5–30)
  - Test turlari (checkbox: Quiz ✓, T/F ✓, Kod ✓, Ochiq ✓)
  - Qiyinlik darajasi (Oson / O'rta / Qiyin)
- "AI bilan test yaratish" katta tugmasi

*Bosqich 2 — Generatsiya:*
- `GeneratingAnimation` — animatsiya + "AI test tayyorlamoqda..." matni
- Mock: setTimeout 3000ms, keyin bosqich 3

*Bosqich 3 — Natija:*
- Muvaffaqiyat xabari: "20 ta savol yaratildi"
- "Previewni ko'rish" tugmasi → TestPreviewPage

**TestPreviewPage** `/teacher/lessons/:lessonId/test/preview`
- `GeneratedTestPreview` — barcha savollar ro'yxati
- Har savol: tur belgisi (🔵 Quiz | ✅ T/F | 💻 Kod | 📝 Ochiq) + savol matni
- "Tahrirlash" tugmasi → TestEditPage
- "Qabul qilish va davom etish" → Baxrom sahifasi (test sozlash)

**TestEditPage** `/teacher/lessons/:lessonId/test/edit`
- Har savol uchun `QuestionEditorWrapper` — savol turini aniqlaydi va Jasur komponentini chaqiradi
- Savol qo'shish: tur tanlash + bo'sh savol
- Savol o'chirish: × tugmasi + tasdiqlash
- "Saqlash" → TestPreviewPage

---

## Mock ma'lumot

```js
// src/mocks/aiMock.js
export const mockGeneratedTest = {
  lessonId: 'l2',
  questionList: [
    { id: 'q1', type: 'quiz', questionText: 'useState hook nima uchun ishlatiladi?',
      answerOptions: ['State boshqarish', 'API chaqirish', 'Routing', 'Stil berish'],
      correctOptionIndex: 0 },
    { id: 'q2', type: 'true_false', questionText: 'useEffect faqat bir marta ishlaydi.',
      correctAnswer: false },
    { id: 'q3', type: 'code', questionText: 'Counter komponent yarating (useState bilan).',
      starterCode: 'function Counter() {\n  // ...\n}' },
    { id: 'q4', type: 'open', questionText: 'React da prop drilling nima va muammosi nima?' },
  ],
}
```

---

## Qoidalar

1. Generatsiya animatsiyasi davomida tugma disabled va sahifa scroll bo'lmaydi
2. `QuestionEditorWrapper` — savol turini tekshirib, Jasur komponentini import qiladi:
   - `type === 'quiz'` → `QuizQuestionEditor`
   - `type === 'true_false'` → `TrueFalseQuestionEditor`
   - `type === 'code'` → `CodeQuestionEditor`
   - `type === 'open'` → `OpenQuestionEditor`
3. Jasur komponentlari `src/components/questions/` da — siz faqat import qilasiz

---

## Ishlash tartibi

1. `useAiGenerate.js` — generatsiya holati (idle → loading → done)
2. `LessonContentPanel.jsx` + `GenerationSettings.jsx`
3. `GeneratingAnimation.jsx` (CSS animation yoki lottie)
4. `AiGeneratePage.jsx` — 3 bosqichni birlashtirish
5. `GeneratedTestPreview.jsx` → `TestPreviewPage.jsx`
6. `useTestEditor.js` + `QuestionEditorWrapper.jsx` → `TestEditPage.jsx`

---

## AI ga prompt

```
Men EduTest loyihasida AI Test Generatsiya qurmoqdaman. Ism: Otabek.
Stack: React + Vite (JSX), TailwindCSS v4.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/ai-generation/, src/pages/teacher/ai-generation/
Mock: src/mocks/aiMock.js

Birinchi useAiGenerate.js yarating:
- generationStatus: 'idle' | 'loading' | 'done' | 'error'
- generationSettings: { questionCount: 20, types: [], difficulty: 'medium' }
- generatedTest: null | test ob'ekti
- handleGenerate(): idle → loading → setTimeout 3000ms → done + mockGeneratedTest
```
