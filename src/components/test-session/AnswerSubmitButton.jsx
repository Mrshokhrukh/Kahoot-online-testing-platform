import AppButton from '../shared/AppButton'

function AnswerSubmitButton({
  isLastQuestion = false,
  onClick,
  isDisabled = false,
  isSubmitting = false,
}) {
  const label = isLastQuestion ? 'Testni yakunlash' : 'Keyingi savol'

  return (
    <AppButton
      label={label}
      variant="primary"
      size="lg"
      onClick={onClick}
      isDisabled={isDisabled || isSubmitting}
    />
  )
}

export default AnswerSubmitButton
