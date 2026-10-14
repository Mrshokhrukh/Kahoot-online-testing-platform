import CodeQuestionEditor from '../questions/code/CodeQuestionEditor'
import OpenQuestionEditor from '../questions/open/OpenQuestionEditor'
import QuizQuestionEditor from '../questions/quiz/QuizQuestionEditor'
import TrueFalseEditor from '../questions/true-false/TrueFalseEditor'

const QUESTION_EDITORS = {
  quiz: QuizQuestionEditor,
  true_false: TrueFalseEditor,
  code: CodeQuestionEditor,
  open: OpenQuestionEditor,
}

function QuestionEditorWrapper({ question, index = 0, onChange }) {
  if (!question) {
    return null
  }

  const Editor = QUESTION_EDITORS[question.type]
  if (!Editor) {
    return <p role="alert" className="text-sm text-red-700">Bu savol turi tahrirlanmaydi.</p>
  }
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">Savol {index + 1}</h3>
      <Editor question={question} onChange={onChange} />
    </div>
  )
}

export default QuestionEditorWrapper
