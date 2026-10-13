const VARIANTS = {
  success: 'bg-green-100 text-green-700', danger: 'bg-red-100 text-red-700',
  warning: 'bg-yellow-100 text-yellow-700', info: 'bg-blue-100 text-blue-700', neutral: 'bg-gray-100 text-gray-600',
}

function AppBadge({ label, variant = 'neutral', className = '' }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${VARIANTS[variant] || VARIANTS.neutral} ${className}`}>{label}</span>
}

export default AppBadge
