import { useState } from 'react'
import AppButton from '../shared/AppButton'
import AppInput from '../shared/AppInput'

const INVITE_CODE_LENGTH = 6
const NON_ALPHANUMERIC_PATTERN = /[^a-zA-Z0-9]/g

function normalizeInviteCode(rawValue) {
  return rawValue
    .replace(NON_ALPHANUMERIC_PATTERN, '')
    .toUpperCase()
    .slice(0, INVITE_CODE_LENGTH)
}

function JoinGroupForm({ onGroupJoin, isJoining, errorMessage }) {
  const [inviteCode, setInviteCode] = useState('')
  const canSubmit = inviteCode.length === INVITE_CODE_LENGTH && !isJoining

  function handleInviteCodeChange(event) {
    const normalizedCode = normalizeInviteCode(event.target.value)
    setInviteCode(normalizedCode)
    if (normalizedCode.length === INVITE_CODE_LENGTH && !isJoining) {
      onGroupJoin(normalizedCode)
    }
  }

  function handleGroupJoinClick() {
    if (canSubmit) onGroupJoin(inviteCode)
  }

  return (
    <div className="flex flex-col gap-4">
      <AppInput
        label="Taklif kodi"
        value={inviteCode}
        onChange={handleInviteCodeChange}
        placeholder="ABC123"
        maxLength={INVITE_CODE_LENGTH}
        errorMessage={errorMessage}
        isDisabled={isJoining}
        className="text-center text-4xl! font-bold tracking-widest uppercase"
      />
      <AppButton
        label="Qo'shilish"
        size="lg"
        isLoading={isJoining}
        isDisabled={!canSubmit}
        onClick={handleGroupJoinClick}
      />
    </div>
  )
}

export default JoinGroupForm
