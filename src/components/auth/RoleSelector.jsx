const ROLES = [
  { value: 'teacher', title: "O'qituvchiman", description: 'Testlar yarataman va natijalarni kuzataman', icon: '👨‍🏫' },
  { value: 'student', title: "O'quvchiman", description: 'Testlarni yechaman va natijamni ko\'raman', icon: '🎓' },
]

export default function RoleSelector({ value, onChange, disabled = false }) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-gray-700">Siz kimsiz?</span>
      <div className="grid grid-cols-2 gap-3">
        {ROLES.map((role) => {
          const isActive = value === role.value
          return (
            <button
              key={role.value}
              type="button"
              disabled={disabled}
              aria-pressed={isActive}
              onClick={() => onChange(role.value)}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-5 text-center transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isActive
                  ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-indigo-300'
              }`}
            >
              <span className="text-4xl">{role.icon}</span>
              <span className={`text-base font-semibold ${isActive ? 'text-indigo-700' : 'text-gray-800'}`}>
                {role.title}
              </span>
              <span className="text-xs text-gray-500">{role.description}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}