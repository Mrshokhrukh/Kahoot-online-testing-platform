import AppTextarea from '../../shared/AppTextarea'

function OpenQuestionView({
  question,
  studentAnswer = '',
  onAnswerChange,
  isSubmitted = false,
}) {
  if (!question) return null

  return (
    <section className="mx-auto w-full max-w-3xl space-y-5">
      <h2 className="text-center text-2xl font-bold text-gray-900">
        {question.questionText}
      </h2>
      <div className="space-y-2">
        <AppTextarea
          label="Javobingiz"
          rows={4}
          value={studentAnswer}
          placeholder="Javobingizni yozing"
          isDisabled={isSubmitted}
          className="min-h-32 text-base"
          onChange={(event) => onAnswerChange?.(event.target.value)}
        />
      </div>
    </section>
  )
}

export default OpenQuestionView
