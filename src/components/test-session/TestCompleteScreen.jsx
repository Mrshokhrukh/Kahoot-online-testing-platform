import AppButton from '../shared/AppButton'

function TestCompleteScreen({
  answeredCount = 0,
  totalQuestionCount = 0,
  onBackToDashboard,
  testName = 'Test',
}) {
  const questionSummary = totalQuestionCount === 0 ? 'Savollar mavjud emas' : `${answeredCount} ta savoldan ${totalQuestionCount} tasiga javob berdingiz.`

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">Yakunlandi</p>
          <h1 className="text-3xl font-bold text-gray-900">Test yakunlandi!</h1>
          <p className="text-sm text-gray-600">{testName}</p>
        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="text-lg font-semibold text-gray-900">{questionSummary}</p>
        </div>

        <p className="text-base text-gray-600">Natijalar e’lon qilinishi kutilmoqda...</p>

        <AppButton
          label="Dashboardga qaytish"
          variant="primary"
          size="lg"
          onClick={onBackToDashboard}
        />
      </div>
    </section>
  )
}

export default TestCompleteScreen
