import { Save, Sparkles } from 'lucide-react'
import AppButton from '../shared/AppButton'
import AppCard from '../shared/AppCard'
import AppInput from '../shared/AppInput'
import AppTextarea from '../shared/AppTextarea'
import TopicTagList from './TopicTagList'

const TOPIC_SEPARATOR_KEYS = ['Enter', ',']
const CONTENT_ROWS = 8

function TopicInputField({ topicList, topicInput, setTopicInput, addTopic, removeTopic }) {
  function handleTopicKeyDown(event) {
    if (event.nativeEvent.isComposing || !TOPIC_SEPARATOR_KEYS.includes(event.key)) return
    event.preventDefault()
    addTopic(topicInput)
  }

  return (
    <div className="flex flex-col gap-2">
      <AppInput
        label="Mavzular teglari"
        value={topicInput}
        onChange={(event) => setTopicInput(event.target.value)}
        onKeyDown={handleTopicKeyDown}
        onBlur={() => addTopic(topicInput)}
        placeholder="Masalan: useState — Enter yoki vergul bosing"
      />
      <TopicTagList topicList={topicList} onRemove={removeTopic} />
    </div>
  )
}

function LessonMetaFields({ lessonForm }) {
  const { lessonNumber, setLessonNumber, lessonDate, setLessonDate, formErrors } = lessonForm

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <AppInput
        label="Dars raqami"
        type="number"
        min="1"
        value={lessonNumber}
        onChange={(event) => setLessonNumber(event.target.value)}
        errorMessage={formErrors.lessonNumber}
      />
      <AppInput
        label="Dars sanasi"
        type="date"
        value={lessonDate}
        onChange={(event) => setLessonDate(event.target.value)}
        errorMessage={formErrors.lessonDate}
      />
    </div>
  )
}

function LessonContentField({ lessonForm }) {
  const { lessonContent, setLessonContent, formErrors, minContentLength } = lessonForm
  const contentLength = lessonContent.trim().length
  const isContentLongEnough = contentLength >= minContentLength

  return (
    <div className="flex flex-col gap-1">
      <AppTextarea
        label="Darsda o'tilgan narsalar"
        rows={CONTENT_ROWS}
        value={lessonContent}
        onChange={(event) => setLessonContent(event.target.value)}
        placeholder="Darsda nimalar o'tilganini batafsil yozing — AI test shu matn asosida tuziladi"
        errorMessage={formErrors.lessonContent}
      />
      <p className={`text-right text-xs ${isContentLongEnough ? 'text-green-600' : 'text-gray-500'}`}>
        {contentLength} / {minContentLength} belgi
      </p>
    </div>
  )
}

function LessonFormActions({ isSaving, onSave }) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <AppButton
        label={<><Save className="h-4 w-4" aria-hidden="true" />Faqat saqlash</>}
        variant="secondary"
        onClick={() => onSave(false)}
        isDisabled={isSaving}
      />
      <AppButton
        label={<><Sparkles className="h-4 w-4" aria-hidden="true" />Saqlash va test yaratish</>}
        onClick={() => onSave(true)}
        isLoading={isSaving}
      />
    </div>
  )
}

function LessonForm({ lessonForm }) {
  if (!lessonForm) return null
  const { lessonTitle, setLessonTitle, formErrors, isSaving, handleSaveLesson } = lessonForm

  function handleFormSubmit(event) {
    event.preventDefault()
  }

  return (
    <AppCard className="hover:shadow-sm">
      <form onSubmit={handleFormSubmit} noValidate className="flex flex-col gap-5">
        <LessonMetaFields lessonForm={lessonForm} />
        <AppInput
          label="Dars mavzusi"
          value={lessonTitle}
          onChange={(event) => setLessonTitle(event.target.value)}
          placeholder="Masalan: useState va useEffect"
          errorMessage={formErrors.lessonTitle}
        />
        <LessonContentField lessonForm={lessonForm} />
        <TopicInputField {...lessonForm} />
        <LessonFormActions isSaving={isSaving} onSave={handleSaveLesson} />
      </form>
    </AppCard>
  )
}

export default LessonForm
