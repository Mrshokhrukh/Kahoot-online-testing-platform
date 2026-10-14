import AppSpinner from './AppSpinner'

const VARIANTS = {
  primary: 'bg-green-700 text-white shadow-sm shadow-green-900/10 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md hover:shadow-green-900/15',
  secondary: 'border border-gray-200 bg-white text-gray-900 shadow-sm hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50 hover:text-green-800 hover:shadow-md',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  ghost: 'bg-transparent text-gray-600 hover:bg-green-50 hover:text-green-800',
}
const SIZES = { sm: 'min-h-9 px-3 py-1.5 text-sm', md: 'min-h-11 px-4 py-2 text-base', lg: 'min-h-[52px] px-6 py-3 text-lg' }

function AppButton({ label, onClick, variant = 'primary', size = 'md', isLoading = false, isDisabled = false, className = '', type = 'button' }) {
  return <button type={type} onClick={onClick} disabled={isDisabled || isLoading} className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md} ${className}`}>
    {isLoading ? <AppSpinner size="sm" label="Jarayon davom etmoqda" /> : label}
  </button>
}

export default AppButton
