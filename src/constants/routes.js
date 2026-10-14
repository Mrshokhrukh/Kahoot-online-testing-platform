export const ROUTES = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Teacher
  TEACHER_DASHBOARD: '/teacher/dashboard',
  TEACHER_PROFILE: '/teacher/profile',
  TEACHER_GROUPS: '/teacher/groups',
  TEACHER_GROUP_NEW: '/teacher/groups/new',
  TEACHER_GROUP: '/teacher/groups/:groupId',
  TEACHER_MEMBERS: '/teacher/groups/:groupId/members',
  TEACHER_LESSONS: '/teacher/groups/:groupId/lessons',
  TEACHER_LESSON_NEW: '/teacher/groups/:groupId/lessons/new',
  TEACHER_LESSON: '/teacher/groups/:groupId/lessons/:lessonId',
  TEACHER_AI_GENERATE: '/teacher/lessons/:lessonId/generate',
  TEACHER_TEST_PREVIEW: '/teacher/lessons/:lessonId/test/preview',
  TEACHER_TEST_EDIT: '/teacher/lessons/:lessonId/test/edit',
  TEACHER_TESTS: '/teacher/tests',
  TEACHER_TEST_CONFIG: '/teacher/tests/:testId/configure',
  TEACHER_MONITOR: '/teacher/tests/:testId/monitor',
  TEACHER_RESULTS: '/teacher/tests/:testId/results',
  TEACHER_ANALYTICS: '/teacher/groups/:groupId/analytics',
  STUDENT_ANALYTICS: '/teacher/students/:studentId/analytics',

  // Student
  STUDENT_DASHBOARD: '/student/dashboard',
  STUDENT_GROUPS: '/student/groups',
  STUDENT_JOIN: '/student/join',
  STUDENT_RESULTS: '/student/results',
  STUDENT_RESULT: '/student/results/:testId',

  // Test Session (teacher + student)
  TEST_WAITING: '/test/:testId/waiting',
  TEST_ACTIVE: '/test/:testId',
  TEST_COMPLETE: '/test/:testId/complete',
}

export default ROUTES
