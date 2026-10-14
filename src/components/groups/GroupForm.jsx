import { useState } from 'react'
import { Save } from 'lucide-react'
import AppButton from '../shared/AppButton'
import AppCard from '../shared/AppCard'
import AppInput from '../shared/AppInput'
import AppTextarea from '../shared/AppTextarea'
import { groupSubjectOptions } from '../../mocks/groupsMock'

const MAX_GROUP_NAME_LENGTH = 50

function validateGroupForm(groupName) {
  const errors = {}
  if (!groupName.trim()) errors.groupName = 'Guruh nomini kiriting'
  else if (groupName.trim().length > MAX_GROUP_NAME_LENGTH) {
    errors.groupName = `Guruh nomi ${MAX_GROUP_NAME_LENGTH} belgidan oshmasligi kerak`
  }
  return errors
}

function SubjectSelectField({ value, onChange }) {
  return (
    <div className="w-full">
      <label
        htmlFor="group-subject-select"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Fan
      </label>
      <select
        id="group-subject-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {groupSubjectOptions.map((subject) => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>
    </div>
  )
}

function GroupForm({ onSubmit, isSubmitting }) {
  const [groupName, setGroupName] = useState('')
  const [description, setDescription] = useState('')
  const [subject, setSubject] = useState(groupSubjectOptions[0])
  const [formErrors, setFormErrors] = useState({})

  function handleGroupSubmit(event) {
    event.preventDefault()
    const errors = validateGroupForm(groupName)
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return
    onSubmit({
      name: groupName.trim(),
      description: description.trim(),
      subject,
    })
  }

  return (
    <AppCard>
      <form onSubmit={handleGroupSubmit} className="flex flex-col gap-4" noValidate>
        <AppInput
          label="Guruh nomi"
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
          placeholder="Masalan: React kursi"
          errorMessage={formErrors.groupName}
        />
        <AppTextarea
          label="Tavsif (ixtiyoriy)"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Guruh haqida qisqacha"
          rows={3}
        />
        <SubjectSelectField value={subject} onChange={setSubject} />
        <div className="flex justify-end">
          <AppButton
            type="submit"
            label={<><Save className="h-4 w-4" aria-hidden="true" />Yaratish</>}
            isLoading={isSubmitting}
            className="w-full sm:w-auto"
          />
        </div>
      </form>
    </AppCard>
  )
}

export default GroupForm
