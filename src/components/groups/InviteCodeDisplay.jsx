import { Copy } from 'lucide-react'
import AppButton from '../shared/AppButton'
import { showToast } from '../shared/AppToast'

const COPY_SUCCESS_MESSAGE = 'Kod nusxalandi!'
const COPY_ERROR_MESSAGE = "Kodni nusxalab bo'lmadi. Qayta urinib ko'ring."

function InviteCodeDisplay({ inviteCode }) {
  if (!inviteCode) return null

  async function handleCodeCopy() {
    try {
      await navigator.clipboard.writeText(inviteCode)
      showToast(COPY_SUCCESS_MESSAGE, 'success')
    } catch {
      showToast(COPY_ERROR_MESSAGE, 'error')
    }
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-150 hover:shadow-lg">
      <p className="text-sm font-medium text-gray-500">Taklif kodi</p>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="break-all text-4xl font-black tracking-wider text-gray-900 sm:text-6xl">
          {inviteCode}
        </p>
        <AppButton
          label={<><Copy className="h-4 w-4" aria-hidden="true" />Nusxalash</>}
          variant="secondary"
          onClick={handleCodeCopy}
          className="w-full shrink-0 sm:w-auto"
        />
      </div>
      <p className="mt-3 text-sm text-gray-500">
        O'quvchilar shu kodni kirib guruhga qo'shiladi
      </p>
    </section>
  )
}

export default InviteCodeDisplay
