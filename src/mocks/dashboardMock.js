const MS_PER_MINUTE = 60000
const MS_PER_HOUR = 3600000

const REACT_GROUP_ID = 'g1'
const JS_GROUP_ID = 'g2'

function createScheduledAt(offsetMs) {
  return new Date(Date.now() + offsetMs).toISOString()
}

export const mockDashboardStats = {
  groupCount: 4,
  studentCount: 87,
  testCount: 23,
  avgComprehension: 72,
}

export const mockGroupSummaryList = [
  {
    id: REACT_GROUP_ID,
    name: 'React kursi',
    studentCount: 22,
    lastTestDate: '2026-10-10',
  },
  {
    id: JS_GROUP_ID,
    name: 'JS asoslari',
    studentCount: 30,
    lastTestDate: '2026-10-08',
  },
]

export const mockUpcomingTestList = [
  {
    id: 't1',
    name: '5-dars testi',
    groupName: 'React kursi',
    scheduledAt: createScheduledAt(3 * MS_PER_HOUR + 20 * MS_PER_MINUTE),
    status: 'scheduled',
  },
  {
    id: 't2',
    name: '4-dars testi',
    groupName: 'JS asoslari',
    scheduledAt: createScheduledAt(25 * MS_PER_HOUR),
    status: 'scheduled',
  },
]

export const mockRecentActivityList = [
  {
    id: 'a1',
    studentName: 'Azizbek Karimov',
    groupName: 'React kursi',
    action: 'Testni yakunladi',
    time: '10:45',
    state: 'success',
  },
  {
    id: 'a2',
    studentName: 'Malika Boboyeva',
    groupName: 'React kursi',
    action: 'Testni boshladi',
    time: '10:31',
    state: 'info',
  },
  {
    id: 'a3',
    studentName: "Dilshod To'liyev",
    groupName: 'JS asoslari',
    action: 'Javob kutilmoqda',
    time: '10:12',
    state: 'warning',
  },
  {
    id: 'a4',
    studentName: 'Sardor Hamidov',
    groupName: 'JS asoslari',
    action: 'Testni yakunladi',
    time: '09:56',
    state: 'success',
  },
]
