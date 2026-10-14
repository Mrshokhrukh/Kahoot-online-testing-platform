/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Link, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { ROUTES } from '../constants/routes'
import { USER_ROLES } from '../constants/testConstants'
import { AppLayout } from '../components/shared'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import StudentDashboardPage from '../pages/student/StudentDashboardPage'
import StudentGroupsPage from '../pages/student/StudentGroupsPage'
import StudentJoinPage from '../pages/student/StudentJoinPage'
import StudentResultsPage from '../pages/student/StudentResultsPage'
import StudentResultDetailPage from '../pages/student/StudentResultDetailPage'
import TeacherDashboardPage from '../pages/teacher/dashboard/TeacherDashboardPage'
import TeacherProfilePage from '../pages/teacher/dashboard/TeacherProfilePage'
import MembersPage from '../pages/teacher/members/MembersPage'
import StudentProfilePage from '../pages/teacher/members/StudentProfilePage'
import LessonsPage from '../pages/teacher/lessons/LessonsPage'
import LessonNewPage from '../pages/teacher/lessons/LessonNewPage'
import LessonDetailPage from '../pages/teacher/lessons/LessonDetailPage'
import AiGeneratePage from '../pages/teacher/ai-generation/AiGeneratePage'
import TestPreviewPage from '../pages/teacher/ai-generation/TestPreviewPage'
import TestEditPage from '../pages/teacher/ai-generation/TestEditPage'
import TestsPage from '../pages/teacher/tests/TestsPage'
import GroupsPage from '../pages/teacher/groups/GroupsPage'
import GroupNewPage from '../pages/teacher/groups/GroupNewPage'
import GroupDetailPage from '../pages/teacher/groups/GroupDetailPage'
import GroupSettingsPage from '../pages/teacher/groups/GroupSettingsPage'
import MonitoringPage from '../pages/teacher/monitoring/MonitoringPage'
import TestResultsPage from '../pages/teacher/results/TestResultsPage'
import GroupResultsPage from '../pages/teacher/results/GroupResultsPage'

function RootRedirect() {
  const currentUser = useAuthStore((state) => state.currentUser)
  if (currentUser?.role === USER_ROLES.TEACHER) return <Navigate to={ROUTES.TEACHER_DASHBOARD} replace />
  if (currentUser?.role === USER_ROLES.STUDENT) return <Navigate to={ROUTES.STUDENT_DASHBOARD} replace />
  return <Navigate to={ROUTES.LOGIN} replace />
}

function PlaceholderPage({ title }) {
  return <AppLayout><section className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm"><h1 className="text-xl font-bold text-gray-900">{title}</h1><p className="mt-2 text-sm text-gray-600">Bu sahifa hali ishlab chiqilmoqda.</p><Link className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700" to="/">Bosh sahifaga qaytish</Link></section></AppLayout>
}

function MissingPage() {
  return <PlaceholderPage title="Sahifa topilmadi" />
}

function TeacherRoutes() {
  return <ProtectedRoute allowedRole={USER_ROLES.TEACHER} />
}

function StudentRoutes() {
  return <ProtectedRoute allowedRole={USER_ROLES.STUDENT} />
}

function TestSessionRoutes() {
  return <Outlet />
}

const teacherPlaceholderRoutes = [
  [ROUTES.TEACHER_TEST_CONFIG, 'Test sozlamalari'],
  [ROUTES.TEACHER_ANALYTICS, 'Guruh tahlili'],
  [ROUTES.STUDENT_ANALYTICS, 'O‘quvchi tahlili'],
]

const router = createBrowserRouter([
  { path: '/', element: <RootRedirect /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  {
    element: <TeacherRoutes />,
    children: [
      { path: ROUTES.TEACHER_DASHBOARD, element: <TeacherDashboardPage /> },
      { path: ROUTES.TEACHER_PROFILE, element: <TeacherProfilePage /> },
      { path: ROUTES.TEACHER_MEMBERS, element: <MembersPage /> },
      { path: `${ROUTES.TEACHER_MEMBERS}/:studentId`, element: <StudentProfilePage /> },
      { path: ROUTES.TEACHER_LESSONS, element: <LessonsPage /> },
      { path: ROUTES.TEACHER_LESSON_NEW, element: <LessonNewPage /> },
      { path: ROUTES.TEACHER_LESSON, element: <LessonDetailPage /> },
      { path: ROUTES.TEACHER_AI_GENERATE, element: <AiGeneratePage /> },
      { path: ROUTES.TEACHER_TEST_PREVIEW, element: <TestPreviewPage /> },
      { path: ROUTES.TEACHER_TEST_EDIT, element: <TestEditPage /> },
      { path: ROUTES.TEACHER_TESTS, element: <TestsPage /> },
      { path: ROUTES.TEACHER_GROUPS, element: <GroupsPage /> },
      { path: ROUTES.TEACHER_GROUP_NEW, element: <GroupNewPage /> },
      { path: ROUTES.TEACHER_GROUP, element: <GroupDetailPage /> },
      { path: `${ROUTES.TEACHER_GROUP}/settings`, element: <GroupSettingsPage /> },
      { path: ROUTES.TEACHER_MONITOR, element: <MonitoringPage /> },
      { path: ROUTES.TEACHER_RESULTS, element: <TestResultsPage /> },
      { path: ROUTES.TEACHER_GROUP_RESULTS, element: <GroupResultsPage /> },
      ...teacherPlaceholderRoutes.map(([path, title]) => ({ path, element: <PlaceholderPage title={title} /> })),
    ],
  },
  {
    element: <StudentRoutes />,
    children: [
      { path: ROUTES.STUDENT_DASHBOARD, element: <StudentDashboardPage /> },
      { path: ROUTES.STUDENT_GROUPS, element: <StudentGroupsPage /> },
      { path: ROUTES.STUDENT_JOIN, element: <StudentJoinPage /> },
      { path: ROUTES.STUDENT_RESULTS, element: <StudentResultsPage /> },
      { path: ROUTES.STUDENT_RESULT, element: <StudentResultDetailPage /> },
    ],
  },
  {
    element: <TestSessionRoutes />,
    children: [
      { path: ROUTES.TEST_WAITING, element: <PlaceholderPage title="Test boshlanishini kuting" /> },
      { path: ROUTES.TEST_ACTIVE, element: <PlaceholderPage title="Test ishlash" /> },
      { path: ROUTES.TEST_COMPLETE, element: <PlaceholderPage title="Test yakunlandi" /> },
    ],
  },
  { path: '*', element: <MissingPage /> },
])

export default router
