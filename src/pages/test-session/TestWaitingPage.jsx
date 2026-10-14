import AppLayout from '../../components/shared/AppLayout'
import CountdownTimer from '../../components/test-session/CountdownTimer'
import useTestWaiting from '../../hooks/test-session/useTestWaiting'

function TestWaitingPage() {
  const { testInfo, countdownSeconds } = useTestWaiting()

  return (
    <AppLayout>
      <section className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6">
            <div className="space-y-2 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Kutilmoqda</p>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Test boshlanishini kuting</h1>
            </div>

            <div className="grid gap-4 text-center sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Test nomi</p>
                <p className="mt-2 text-xl font-semibold text-gray-900">{testInfo.name}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Guruh</p>
                <p className="mt-2 text-xl font-semibold text-gray-900">{testInfo.groupName}</p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xl">
              <CountdownTimer seconds={countdownSeconds} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-600">Ulangan o'quvchilar</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{testInfo.connectedStudentCount}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-600">Savollar</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{testInfo.questionCount}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-600">Davomiylik</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{testInfo.durationMinutes} min</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}

export default TestWaitingPage
