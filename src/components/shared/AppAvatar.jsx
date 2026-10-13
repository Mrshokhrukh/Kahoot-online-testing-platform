const COLORS = ['bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-yellow-100 text-yellow-700', 'bg-red-100 text-red-700']
const SIZES = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-base' }

function AppAvatar({ name = '', size = 'md', className = '' }) {
  const initials = name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || '?'
  const color = [...name].reduce((total, char) => total + char.charCodeAt(0), 0) % COLORS.length
  return <span aria-label={name || 'Foydalanuvchi'} className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${COLORS[color]} ${SIZES[size] || SIZES.md} ${className}`}>{initials}</span>
}

export default AppAvatar
