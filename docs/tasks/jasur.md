# Savol Turlari UI — Jasur

**Branch:** `feature/questions`
**To'rtinchi merge qilinadi — Fuzayil bilan parallel (Otabek va Farid kutadi).**

> Bu komponentlar Otabek (tahrirlash) va Farid (test ishlash) sahifalarida ishlatiladi.
> Siz komponentlar yaratasiz — ular import qilib ishlatadi.

---

## Batafsil Vazifa Tavsifi

### Loyiha nima va siz unda qanday rol o'ynaysiz?

EduTest platformasida 4 turdagi savol bor: Quiz (4 variant), True/False (Ha/Yo'q), Kod yozish (Monaco Editor), Ochiq savol (matn). Har tur **ikkita rejimda** ko'rinadi: o'quvchi uchun (View) va o'qituvchi uchun (Editor).

Siz bu loyihadagi **savol komponentlarini** yaratasiz. Bu komponentlar 2 ta boshqa dasturchi tomonidan ishlatiladi: Otabek (test tahrirlash) va Farid (test ishlash). Ularning sahifalari ishlashi uchun sizning komponentlaringiz tayyor bo'lishi kerak.

### Haqiqiy stsenariy

**Tahrirlash rejimi (Otabek ishlatadi):**
O'qituvchi "useState nima?" savolini tahrirlayapti. Otabek yozgan `QuestionEditorWrapper` sizning `QuizQuestionEditor` ni import qiladi. Unda savol matni input, 4 ta variant input, to'g'ri javob radio button bor.

**Test ishlash rejimi (Farid ishlatadi):**
Ali o'quvchi 3-savolda: "useEffect faqat bir marta ishlaydi." — Ha yoki Yo'q? Farid yozgan `TestActivePage` sizning `QuestionDisplay` ni `mode='view'` bilan chaqiradi. Siz `TrueFalseView` ni ko'rsatasiz: 2 ta katta tugma.

### Siz kimni kutasiz?

**Hech kimni kutmaysiz.** Siz Fuzayil bilan bir vaqtda boshlaysiz. Monaco Editor o'rnatish: `npm install @monaco-editor/react`. Bu packageni o'rnatishdan oldin teamlead (Shokhrukh) ga yozing.

### Kimlar sizni kutadi?

- **Otabek** — `QuizQuestionEditor`, `TrueFalseEditor`, `CodeQuestionEditor`, `OpenQuestionEditor`
- **Farid** — `QuestionDisplay` (barcha turlarni birlashtirgan universal komponent)

### Haftalik ish rejasi

**1-kun:**
- `QuizQuestionView.jsx` — 4 ta variant tugma, tanlash, reveal logikasi
- `QuizQuestionEditor.jsx` — savol matni + 4 variant input + to'g'ri javob radio

**2-kun:**
- `TrueFalseView.jsx` — 2 ta katta tugma (Ha/Yo'q)
- `TrueFalseEditor.jsx` — savol + to'g'ri javob toggle
- `OpenQuestionView.jsx` + `OpenQuestionEditor.jsx`

**3-kun:**
- `npm install @monaco-editor/react`
- `useCodeEditor.js` — Monaco konfiguratsiyasi
- `CodeQuestionView.jsx` — Monaco dark theme, JavaScript, min 200px

**4-kun:**
- `CodeQuestionEditor.jsx` — savol textarea + starter kod Monaco + til tanlash
- Brauzerda test: barcha 4 tur ishlayaptimi?

**5-kun:**
- `QuestionDisplay.jsx` — universal komponent (mode='view'|'edit' bo'yicha to'g'ri komponent)
- PR oching

### Muhim nuqtalar

`QuizQuestionView` da javob yuborilgandan keyin (`isAnswerSubmitted=true`) barcha variantlar `disabled` bo'lsin. Reveal bo'lganda (`isAnswerRevealed=true`): to'g'ri variant `bg-green-100 border-green-500`, noto'g'ri tanlangan `bg-red-100 border-red-500`.

`QuestionDisplay` — bu barcha komponentlarning darvozasi. Tashqaridan faqat shu import qilinadi:
```jsx
<QuestionDisplay question={q} mode="view" selectedOptionIndex={...} onSelectOption={...} />
```

Monaco Editor — `@monaco-editor/react` paketi. Konfiguratsiya: `theme="vs-dark"`, `language="javascript"`, `height="200px"`.

---

---

## Sizga tegishli fayllar

```
src/
├── components/questions/
│   ├── quiz/
│   │   ├── QuizQuestionView.jsx       ← student ishlash uchun
│   │   └── QuizQuestionEditor.jsx     ← teacher tahrirlash uchun
│   ├── true-false/
│   │   ├── TrueFalseView.jsx
│   │   └── TrueFalseEditor.jsx
│   ├── code/
│   │   ├── CodeQuestionView.jsx       ← Monaco Editor
│   │   └── CodeQuestionEditor.jsx
│   ├── open/
│   │   ├── OpenQuestionView.jsx
│   │   └── OpenQuestionEditor.jsx
│   └── QuestionDisplay.jsx            ← tur bo'yicha to'g'ri komponentni ko'rsatadi
└── hooks/questions/
    └── useCodeEditor.js               ← Monaco uchun
```

---

## Har komponentning funksionalligi

### QuizQuestionView.jsx (student uchun)
```
Props: question, selectedOptionIndex, onSelectOption,
       isAnswerSubmitted, isAnswerRevealed, correctOptionIndex

Ko'rinish:
  - Savol matni (katta, markazda)
  - 4 ta variant — ruchka variant button:
    * Normal: oddiy ko'rinish
    * Tanlangan: ko'k chegara
    * isAnswerRevealed=true: to'g'ri=yashil, noto'g'ri=qizil

Qoida: bitta tanlangandan keyin qolganlar disabled
```

### QuizQuestionEditor.jsx (teacher uchun)
```
Props: question, onChange

Ko'rinish:
  - Savol matni input
  - 4 ta variant input
  - Har variant yonida radio "To'g'ri javob"
  - Faqat bitta radio aktiv bo'ladi
```

### TrueFalseView.jsx (student uchun)
```
Props: question, selectedAnswer, onSelectAnswer,
       isAnswerSubmitted, isAnswerRevealed, correctAnswer

Ko'rinish: 2 ta katta tugma — "Ha ✓" va "Yo'q ✗"
Ranglar: Ha=yashil, Yo'q=qizil
```

### TrueFalseEditor.jsx (teacher uchun)
```
Props: question, onChange
Ko'rinish: savol matni input + to'g'ri javob toggle (Ha/Yo'q)
```

### CodeQuestionView.jsx (student uchun)
```
Props: question, studentCode, onCodeChange, isSubmitted

Ko'rinish:
  - Savol matni
  - Monaco Editor (dark theme, JavaScript, minHeight: 200px)
  - "Yuborish" tugmasi

Monaco o'rnatish: npm install @monaco-editor/react
```

### CodeQuestionEditor.jsx (teacher uchun)
```
Props: question, onChange
Ko'rinish:
  - Savol matni textarea
  - Starter kod (Monaco Editor)
  - Til tanlash: JavaScript / Python / HTML
```

### OpenQuestionView.jsx (student uchun)
```
Props: question, studentAnswer, onAnswerChange, isSubmitted
Ko'rinish: savol matni + katta textarea (min 4 qator)
```

### OpenQuestionEditor.jsx (teacher uchun)
```
Props: question, onChange
Ko'rinish: savol matni textarea + namuna javob textarea
```

### QuestionDisplay.jsx (universal)
```
Props: question, mode ('view'|'edit'), ...rest

Ichida:
  if (question.type === 'quiz')       → QuizQuestionView yoki Editor
  if (question.type === 'true_false') → TrueFalseView yoki Editor
  if (question.type === 'code')       → CodeQuestionView yoki Editor
  if (question.type === 'open')       → OpenQuestionView yoki Editor
```

---

## Qoidalar

1. `View` komponentlar — faqat ko'rsatish, state faqat tanlash uchun
2. `Editor` komponentlar — `onChange(updatedQuestion)` prop orqali yuqoriga xabar beradi
3. Monaco Editor faqat `CodeQuestionView` va `CodeQuestionEditor` da ishlatiladi
4. `QuestionDisplay` barcha 4 turni ichiga oladi — tashqaridan faqat shu import qilinadi

---

## Ishlash tartibi

1. `QuizQuestionView.jsx` → `QuizQuestionEditor.jsx`
2. `TrueFalseView.jsx` → `TrueFalseEditor.jsx`
3. `OpenQuestionView.jsx` → `OpenQuestionEditor.jsx`
4. Monaco o'rnatish → `useCodeEditor.js` → `CodeQuestionView.jsx` → `CodeQuestionEditor.jsx`
5. `QuestionDisplay.jsx` — hammani birlashtirish

---

## AI ga prompt

```
Men EduTest loyihasida Savol Turlari UI qurmoqdaman. Ism: Jasur.
Stack: React + Vite (JSX), TailwindCSS v4, @monaco-editor/react.
Qoidalar: CLAUDE.md faylida.
Fayllarim: src/components/questions/

Birinchi QuizQuestionView.jsx yarating:
Props: question ({ questionText, answerOptions: [string] }),
       selectedOptionIndex (null|number), onSelectOption(index),
       isAnswerSubmitted (bool), isAnswerRevealed (bool),
       correctOptionIndex (number)

4 ta variant tugma. Tanlanganda ko'k, submitdan keyin disabled.
Reveal bo'lganda: to'g'ri=green-500, noto'g'ri tanlangan=red-500.
```
