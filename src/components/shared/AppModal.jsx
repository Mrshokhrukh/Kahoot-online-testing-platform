import { useEffect } from 'react'
import { X } from 'lucide-react'

function AppModal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose?.() }}>
    <section role="dialog" aria-modal="true" aria-labelledby="app-modal-title" className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"><div className="mb-4 flex items-center justify-between"><h2 id="app-modal-title" className="text-xl font-semibold text-gray-900">{title}</h2><button type="button" onClick={onClose} aria-label="Yopish" className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"><X className="h-5 w-5" /></button></div>{children}</section>
  </div>
}

export default AppModal
