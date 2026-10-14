export const mockTestResults = {
  testName: '5-dars testi',
  totalStudents: 22,
  summary: { attended: 18, avgScore: 73, avgPercentage: 73, maxScore: 95, minScore: 42 },
  attendanceList: [
    { id: 's1', name: 'Ali Karimov', attended: true, startTime: '20:00', endTime: '20:28' },
    { id: 's2', name: 'Vali Toshmatov', attended: false, startTime: null, endTime: null },
    { id: 's3', name: 'Laylo Rahimova', attended: true, startTime: '20:01', endTime: '20:35' },
    { id: 's4', name: 'Sardor Aliyev', attended: true, startTime: '20:00', endTime: '20:40' },
    { id: 's5', name: 'Dilnoza Qodirova', attended: true, startTime: '20:02', endTime: '20:30' },
  ],
  scoreList: [
    { rank: 1, id: 's1', name: 'Ali Karimov', score: 95, percentage: 95, correct: 19, total: 20, durationMinutes: 28 },
    { rank: 2, id: 's3', name: 'Laylo Rahimova', score: 82, percentage: 82, correct: 16, total: 20, durationMinutes: 34 },
    { rank: 3, id: 's5', name: 'Dilnoza Qodirova', score: 68, percentage: 68, correct: 14, total: 20, durationMinutes: 28 },
    { rank: 4, id: 's4', name: 'Sardor Aliyev', score: 42, percentage: 42, correct: 8, total: 20, durationMinutes: 40 },
  ],
  questionAnalysis: [
    { questionNumber: 1, questionText: 'useState nima?', correctRate: 89 },
    { questionNumber: 2, questionText: 'useEffect qachon ishlaydi?', correctRate: 72 },
    { questionNumber: 3, questionText: 'Virtual DOM ni tushuntiring.', correctRate: 44 },
    { questionNumber: 4, questionText: 'Props va state farqi nima?', correctRate: 66 },
  ],
}

export const mockGroupResults = {
  groupName: 'Frontend 12-guruh',
  testList: [
    { id: 't1', name: '5-dars testi', date: '2026-10-12', avgScore: 73, participationRate: 82 },
    { id: 't2', name: '4-dars testi', date: '2026-10-05', avgScore: 78, participationRate: 91 },
    { id: 't3', name: '3-dars testi', date: '2026-09-28', avgScore: 65, participationRate: 77 },
  ],
}
