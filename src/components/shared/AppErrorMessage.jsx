import { AlertCircle } from 'lucide-react'

function AppErrorMessage({ message }) {
  if (!message) return null
  return <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /><p>{message}</p></div>
}

export default AppErrorMessage
