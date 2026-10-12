# Savol Turlari UI — Jasur

**Branch:** `feature/questions`

> Bu komponentlar Otabek (tahrirlash) va Farid (test ishlash) sahifalarida ishlatiladi.
> Siz komponentlar yaratasiz — ular import qilib ishlatadi.

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
