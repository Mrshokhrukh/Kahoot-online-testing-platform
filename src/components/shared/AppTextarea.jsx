import { useId } from 'react'

function AppTextarea({ value, onChange, label, placeholder, errorMessage, rows = 4, isDisabled = false, className = '', ...props }) {
  const inputId = useId()
  const errorId = `${inputId}-error`
  return <div className="w-full">
    {label && <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
    <textarea id={inputId} rows={rows} value={value} onChange={onChange} placeholder={placeholder} disabled={isDisabled} aria-invalid={Boolean(errorMessage)} aria-describedby={errorMessage ? errorId : undefined} className={`w-full resize-y rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 ${errorMessage ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200'} ${className}`} {...props} />
    {errorMessage && <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">{errorMessage}</p>}
  </div>
}

export default AppTextarea
