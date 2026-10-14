import QuizQuestionView from './quiz/QuizQuestionView'
import QuizQuestionEditor from './quiz/QuizQuestionEditor'
import TrueFalseView from './true-false/TrueFalseView'
import TrueFalseEditor from './true-false/TrueFalseEditor'
import CodeQuestionView from './code/CodeQuestionView'
import CodeQuestionEditor from './code/CodeQuestionEditor'
import OpenQuestionView from './open/OpenQuestionView'
import OpenQuestionEditor from './open/OpenQuestionEditor'
import AppErrorMessage from '../shared/AppErrorMessage'

const QUESTION_COMPONENTS = {
  quiz: { view: QuizQuestionView, edit: QuizQuestionEditor },
  true_false: { view: TrueFalseView, edit: TrueFalseEditor },
  code: { view: CodeQuestionView, edit: CodeQuestionEditor },
  open: { view: OpenQuestionView, edit: OpenQuestionEditor },
}

function QuestionDisplay({ question, mode = 'view', ...rest }) {
  if (!question) return null

  const questionComponents = QUESTION_COMPONENTS[question.type]
  const QuestionComponent = questionComponents?.[mode]

  if (!QuestionComponent) {
    const message = questionComponents
      ? `Noma'lum ko'rish rejimi: ${mode}`
      : `Noma'lum savol turi: ${question.type ?? "ko'rsatilmagan"}`
    return <AppErrorMessage message={message} />
  }

  return <QuestionComponent question={question} {...rest} />
}

export default QuestionDisplay
