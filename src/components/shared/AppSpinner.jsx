const SIZES = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' }

function AppSpinner({ size = 'md', label = 'Yuklanmoqda' }) {
  return <span role="status" aria-label={label} className={`inline-block animate-spin rounded-full border-2 border-blue-600 border-r-transparent ${SIZES[size] || SIZES.md}`} />
}

export default AppSpinner
