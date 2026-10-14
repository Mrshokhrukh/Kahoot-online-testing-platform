export const mockTestInfo = {
  id: 'test1',
  name: '5-dars testi',
  groupName: 'React kursi',
  scheduledAt: new Date(Date.now() + 30000).toISOString(),
  durationMinutes: 30,
  questionCount: 3,
  connectedStudentCount: 28,
}

export const mockQuestionList = [
  {
    id: 'q1',
    type: 'quiz',
    questionText: 'useState nima?',
    answerOptions: ['State boshqarish', 'API', 'Routing', 'Stil'],
    correctOptionIndex: 0,
  },
  {
    id: 'q2',
    type: 'true_false',
    questionText: 'React bir tomonlama data flow ishlatadi.',
    correctAnswer: true,
  },
  {
    id: 'q3',
    type: 'open',
    questionText: 'Virtual DOM ni tushuntiring.',
  },
]
