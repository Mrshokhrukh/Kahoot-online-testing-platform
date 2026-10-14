import AppCard from '../../shared/AppCard'
import AppTextarea from '../../shared/AppTextarea'

function updateQuestion(question, onChange, updates) {
  onChange?.({ ...question, ...updates })
}

function OpenQuestionEditor({ question = {}, onChange }) {
  return (
    <AppCard className="w-full space-y-5">
      <AppTextarea
        label="Savol matni"
        rows={3}
        value={question.questionText ?? ''}
        placeholder="Savolni kiriting"
        onChange={(event) => updateQuestion(question, onChange, { questionText: event.target.value })}
      />
      <AppTextarea
        label="Namuna javob"
        rows={4}
        value={question.sampleAnswer ?? ''}
        placeholder="Namuna javobni kiriting"
        onChange={(event) => updateQuestion(question, onChange, { sampleAnswer: event.target.value })}
      />
    </AppCard>
  )
}

export default OpenQuestionEditor
