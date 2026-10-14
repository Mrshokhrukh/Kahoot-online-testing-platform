const REACT_GROUP_ID = 'g1'
const JS_GROUP_ID = 'g2'

export const mockLessonGroupList = [
  { id: REACT_GROUP_ID, name: 'React kursi' },
  { id: JS_GROUP_ID, name: 'JS asoslari' },
]

export const mockLessonList = [
  {
    id: 'l1',
    groupId: REACT_GROUP_ID,
    lessonNumber: 1,
    title: 'React asoslari',
    date: '2026-10-01',
    subject: 'Dasturlash',
    content:
      'Bugun biz React nima ekanligini, komponent tushunchasini, JSX sintaksisini o\'rgandik. Virtual DOM qanday ishlashi va nima uchun React tez ekanligi haqida gaplashdik. Birinchi funksional komponentimizni yozdik va uni sahifaga chiqardik.',
    topics: ['React', 'JSX', 'Komponent'],
    testStatus: 'completed',
  },
  {
    id: 'l2',
    groupId: REACT_GROUP_ID,
    lessonNumber: 2,
    title: 'useState va useEffect',
    date: '2026-10-03',
    subject: 'Dasturlash',
    content:
      'useState hook ni o\'rgandik. State nima, qanday o\'zgaradi va nima uchun komponent qayta render bo\'ladi. useEffect bilan side effect yozdik: ma\'lumot yuklash, taymer o\'rnatish va cleanup funksiyasi orqali tozalash.',
    topics: ['useState', 'useEffect', 'Hooks'],
    testStatus: 'none',
  },
  {
    id: 'l3',
    groupId: REACT_GROUP_ID,
    lessonNumber: 3,
    title: 'Props va komponentlar aloqasi',
    date: '2026-10-08',
    subject: 'Dasturlash',
    content:
      'Props orqali ota komponentdan bola komponentga ma\'lumot uzatishni o\'rgandik. Callback funksiyalar yordamida bola komponentdan ota komponentga hodisa yuborish va state ni yuqoriga ko\'tarish (lifting state up) usulini ko\'rib chiqdik.',
    topics: ['Props', 'Callback', 'Lifting state'],
    testStatus: 'scheduled',
  },
  {
    id: 'l4',
    groupId: JS_GROUP_ID,
    lessonNumber: 1,
    title: 'O\'zgaruvchilar va ma\'lumot turlari',
    date: '2026-10-02',
    subject: 'Dasturlash',
    content:
      'let, const va var orasidagi farqni o\'rgandik. JavaScript dagi primitiv ma\'lumot turlari: string, number, boolean, null, undefined. typeof operatori yordamida turini aniqlash va turlarni o\'zgartirishni mashq qildik.',
    topics: ['let', 'const', 'typeof'],
    testStatus: 'completed',
  },
]
