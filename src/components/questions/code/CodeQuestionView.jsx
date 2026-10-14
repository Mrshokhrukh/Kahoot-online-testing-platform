import Editor from '@monaco-editor/react'
import useCodeEditor from '../../../hooks/questions/useCodeEditor'
import AppButton from '../../shared/AppButton'

function CodeQuestionView({
  question,
  studentCode,
  onCodeChange,
  isSubmitted = false,
  onSubmit,
}) {
  const editorConfig = useCodeEditor('javascript')
  if (!question) return null

  return (
    <section className="mx-auto w-full max-w-4xl space-y-5">
      <h2 className="text-2xl font-bold text-gray-900">{question.questionText}</h2>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <Editor
          {...editorConfig}
          value={studentCode ?? question.starterCode ?? ''}
          options={{ ...editorConfig.options, readOnly: isSubmitted }}
          onChange={(codeValue) => onCodeChange?.(codeValue ?? '')}
        />
      </div>
      <AppButton
        label="Yuborish"
        isDisabled={isSubmitted}
        onClick={() => onSubmit?.()}
      />
    </section>
  )
}

export default CodeQuestionView
