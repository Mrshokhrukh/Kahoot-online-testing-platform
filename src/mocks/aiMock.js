export const mockGeneratedTest = {
  lessonId: 'l2',
  questionList: [
    {
      id: 'q1',
      type: 'quiz',
      questionText: 'useState hook nima uchun ishlatiladi?',
      answerOptions: ['State boshqarish', 'API chaqirish', 'Routing', 'Stil berish'],
      correctOptionIndex: 0,
    },
    {
      id: 'q2',
      type: 'true_false',
      questionText: 'useEffect faqat bir marta ishlaydi.',
      correctAnswer: false,
    },
    {
      id: 'q3',
      type: 'code',
      questionText: 'Counter komponent yarating (useState bilan).',
      starterCode: 'function Counter() {\n  // ...\n}',
    },
    {
      id: 'q4',
      type: 'open',
      questionText: 'React da prop drilling nima va muammosi nima?',
    },
  ],
}
