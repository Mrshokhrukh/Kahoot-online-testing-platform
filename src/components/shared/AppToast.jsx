/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react'
import { CircleCheck, CircleX, Info, TriangleAlert, X } from 'lucide-react'

const EVENT_NAME = 'edutest:toast'
const TOAST_STYLES = { success: 'border-green-200 bg-green-50 text-green-700', error: 'border-red-200 bg-red-50 text-red-700', warning: 'border-yellow-200 bg-yellow-50 text-yellow-700', info: 'border-blue-200 bg-blue-50 text-blue-700' }
const TOAST_ICONS = { success: CircleCheck, error: CircleX, warning: TriangleAlert, info: Info }

function showToast(message, type = 'info') {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { message, type } }))
}

function AppToast() {
  const [toast, setToast] = useState(null)
  useEffect(() => {
    const handleToast = (event) => setToast(event.detail)
    window.addEventListener(EVENT_NAME, handleToast)
    return () => window.removeEventListener(EVENT_NAME, handleToast)
  }, [])
  useEffect(() => {
    if (!toast) return undefined
    const timeoutId = window.setTimeout(() => setToast(null), 2000)
    return () => window.clearTimeout(timeoutId)
  }, [toast])
  if (!toast) return null
  const Icon = TOAST_ICONS[toast.type] || Info
  return <div role="status" className={`fixed right-4 top-4 z-[60] flex max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg ${TOAST_STYLES[toast.type] || TOAST_STYLES.info}`}><Icon className="h-5 w-5 shrink-0" /><p className="flex-1 text-sm font-medium">{toast.message}</p><button type="button" aria-label="Bildirishnomani yopish" onClick={() => setToast(null)} className="rounded p-0.5 opacity-70 hover:opacity-100"><X className="h-4 w-4" /></button></div>
}

export { showToast }
export default AppToast
