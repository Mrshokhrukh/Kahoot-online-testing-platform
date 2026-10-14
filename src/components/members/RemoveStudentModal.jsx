import AppButton from '../shared/AppButton'
import AppModal from '../shared/AppModal'

function RemoveStudentModal({ student, onClose, onConfirm }) {
  return (
    <AppModal isOpen={Boolean(student)} onClose={onClose} title="O'quvchini o'chirish">
      <p className="text-sm text-gray-600">
        {student?.name} guruhdan o'chiriladi. Uning natijalari saqlanib qoladi.
      </p>
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <AppButton label="Bekor qilish" variant="secondary" onClick={onClose} />
        <AppButton label="O'chirish" variant="danger" onClick={() => onConfirm(student.id)} />
      </div>
    </AppModal>
  )
}

export default RemoveStudentModal
