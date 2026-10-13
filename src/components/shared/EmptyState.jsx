import { Inbox } from 'lucide-react'

function EmptyState({ text, icon: Icon = Inbox }) {
  return <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-gray-600"><Icon className="h-9 w-9 text-gray-400" aria-hidden="true" /><p className="text-sm">{text}</p></div>
}

export default EmptyState
