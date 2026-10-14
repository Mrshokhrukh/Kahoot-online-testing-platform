import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import '../../../index.css'
import AppButton from '../../../components/shared/AppButton'
import MonitoringPage from './MonitoringPage'

const INITIAL_PREVIEW_PATH = '/teacher/tests/t1/monitor'
const PREVIEW_RESULTS_PATH = '/teacher/tests/:testId/results'

export function PreviewResultsPage() {
  const navigate = useNavigate()
  const { testId } = useParams()

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <section className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Local preview</p>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Natijalar sahifasi</h1>
        <p className="mt-2 text-sm text-gray-600">Test ID: {testId}. Vaqtinchalik route navigatsiya sinovi uchun ishlayapti.</p>
        <AppButton
          label="Monitoringga qaytish"
          className="mt-6"
          onClick={() => navigate(INITIAL_PREVIEW_PATH)}
        />
      </section>
    </main>
  )
}

export function PreviewApplication() {
  return (
    <StrictMode>
      <MemoryRouter initialEntries={[INITIAL_PREVIEW_PATH]}>
        <Routes>
          <Route path="/teacher/tests/:testId/monitor" element={<MonitoringPage />} />
          <Route path={PREVIEW_RESULTS_PATH} element={<PreviewResultsPage />} />
        </Routes>
      </MemoryRouter>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<PreviewApplication />)
