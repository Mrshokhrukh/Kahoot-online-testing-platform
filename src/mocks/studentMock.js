const MS_PER_MINUTE = 60000
const MS_PER_HOUR = 3600000
const TOMORROW_TEST_HOUR = 20

function createScheduledAt(offsetMs) {
  return new Date(Date.now() + offsetMs).toISOString()
}

function createTomorrowScheduledAt(hour) {
  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  tomorrowDate.setHours(hour, 0, 0, 0)
  return tomorrowDate.toISOString()
}

export const mockUpcomingTestList = [
  {
    id: 't1',
    testName: '5-dars testi',
    groupName: 'React kursi',
    scheduledAt: createScheduledAt(2 * MS_PER_HOUR),
  },
  {
    id: 't2',
    testName: '6-dars testi',
    groupName: 'React kursi',
    scheduledAt: createTomorrowScheduledAt(TOMORROW_TEST_HOUR),
  },
  {
    id: 't3',
    testName: 'Qo\'shimcha nazorat',
    groupName: 'React kursi',
    scheduledAt: createScheduledAt(12 * MS_PER_MINUTE),
  },
]

export const mockMyGroupList = [
  {
    id: 'g1',
    name: 'React kursi',
    teacherName: 'Sardor Usmonov',
    testCount: 5,
    avgScore: 78,
  },
]

export const mockMyResultList = [
  {
    id: 'r1',
    testId: 't4',
    testName: '4-dars testi',
    groupName: 'React kursi',
    date: '2026-10-10',
    score: 82,
    percentage: 82,
    attended: true,
  },
  {
    id: 'r2',
    testId: 't3old',
    testName: '3-dars testi',
    groupName: 'React kursi',
    date: '2026-10-07',
    score: 0,
    percentage: 0,
    attended: false,
  },
]

export const mockResultQuestionMap = {
  t4: [
    {
      id: 'q1',
      text: 'React da komponent holati (state) qanday yangilanadi?',
      myAnswer: 'useState qaytargan funksiya orqali',
      correctAnswer: 'useState qaytargan funksiya orqali',
      isCorrect: true,
    },
    {
      id: 'q2',
      text: 'JSX nima?',
      myAnswer: 'Ma\'lumotlar bazasi turi',
      correctAnswer: 'JavaScript uchun sintaksis kengaytmasi',
      isCorrect: false,
    },
    {
      id: 'q3',
      text: 'useEffect bo\'sh bog\'liqliklar massivi bilan qachon ishlaydi?',
      myAnswer: 'Faqat birinchi renderdan keyin',
      correctAnswer: 'Faqat birinchi renderdan keyin',
      isCorrect: true,
    },
    {
      id: 'q4',
      text: 'Komponent o\'ziga kelgan props qiymatini o\'zgartira oladi.',
      myAnswer: 'Noto\'g\'ri',
      correctAnswer: 'Noto\'g\'ri',
      isCorrect: true,
    },
  ],
}

export const mockInviteCodeMap = {
  ABC123: 'React kursi',
  JS2026: 'JavaScript kursi',
}
