/* eslint-disable react-refresh/only-export-components */
import { useSyncExternalStore } from 'react'
import { CircleCheck, CircleX, Info, TriangleAlert, X } from 'lucide-react'

const TOAST_STYLES = {
  success: 'border-green-200 bg-green-50 text-green-700',
  error: 'border-red-200 bg-red-50 text-red-700',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-700',
  info: 'border-blue-200 bg-blue-50 text-blue-700',
}
const TOAST_ICONS = { success: CircleCheck, error: CircleX, warning: TriangleAlert, info: Info }
const TOAST_DURATION_MS = 2000

let activeToast = null
let toastTimeoutId
const toastListeners = new Set()

function notifyToastListeners() {
  toastListeners.forEach((listener) => listener())
}

function subscribeToToast(listener) {
  toastListeners.add(listener)
  return () => toastListeners.delete(listener)
}

function getToastSnapshot() {
  return activeToast
}

function dismissToast() {
  activeToast = null
  window.clearTimeout(toastTimeoutId)
  notifyToastListeners()
}

function showToast(message, type = 'info') {
  activeToast = { message, type }
  notifyToastListeners()
  window.clearTimeout(toastTimeoutId)
  toastTimeoutId = window.setTimeout(() => {
    activeToast = null
    notifyToastListeners()
  }, TOAST_DURATION_MS)
}

function AppToast() {
  const toast = useSyncExternalStore(subscribeToToast, getToastSnapshot, () => null)
  if (!toast) return null
  const Icon = TOAST_ICONS[toast.type] || Info
  return <div role="status" className={`fixed right-4 top-4 z-[60] flex max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg ${TOAST_STYLES[toast.type] || TOAST_STYLES.info}`}><Icon className="h-5 w-5 shrink-0" /><p className="flex-1 text-sm font-medium">{toast.message}</p><button type="button" aria-label="Bildirishnomani yopish" onClick={dismissToast} className="rounded p-0.5 opacity-70 hover:opacity-100"><X className="h-4 w-4" /></button></div>
}

export { showToast }
export default AppToast
