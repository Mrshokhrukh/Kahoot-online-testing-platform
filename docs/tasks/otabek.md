# AI Test Generatsiya — Otabek

**Branch:** `feature/ai-generation`

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
