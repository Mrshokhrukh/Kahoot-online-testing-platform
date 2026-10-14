import { useId } from 'react'
import Editor from '@monaco-editor/react'
import useCodeEditor from '../../../hooks/questions/useCodeEditor'
import AppCard from '../../shared/AppCard'
import AppTextarea from '../../shared/AppTextarea'

const CODE_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
]

function updateQuestion(question, onChange, updates) {
  onChange?.({ ...question, ...updates })
}

function CodeQuestionEditor({ question = {}, onChange }) {
  const editorId = useId()
  const language = question.language ?? 'javascript'
  const editorConfig = useCodeEditor(language)

  return (
    <AppCard className="w-full space-y-5">
      <AppTextarea label="Savol matni" rows={3} value={question.questionText ?? ''} placeholder="Savolni kiriting" className="min-h-24 text-base" onChange={(event) => updateQuestion(question, onChange, { questionText: event.target.value })} />
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900" htmlFor={`${editorId}-language`}>Starter kod va dasturlash tili</label>
        <select id={`${editorId}-language`} className="min-h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={language} onChange={(event) => updateQuestion(question, onChange, { language: event.target.value })}>
          {CODE_LANGUAGES.map((codeLanguage) => <option key={codeLanguage.value} value={codeLanguage.value}>{codeLanguage.label}</option>)}
        </select>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <Editor {...editorConfig} value={question.starterCode ?? ''} onChange={(codeValue) => updateQuestion(question, onChange, { starterCode: codeValue ?? '' })} />
        </div>
      </div>
    </AppCard>
  )
}

export default CodeQuestionEditor
