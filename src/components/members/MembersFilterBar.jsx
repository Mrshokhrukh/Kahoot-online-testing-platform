import { Search } from 'lucide-react'
import AppInput from '../shared/AppInput'

const SORT_OPTION_LIST = [
  { value: 'name', label: 'Ism bo\'yicha' },
  { value: 'score', label: 'O\'rtacha ball bo\'yicha' },
  { value: 'attendance', label: 'Faollik bo\'yicha' },
]

function MembersFilterBar({ searchQuery, onSearchChange, sortField, onSortChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="relative flex-1">
        <Search aria-hidden="true" className="pointer-events-none absolute bottom-2.5 left-3 h-4 w-4 text-gray-400" />
        <AppInput
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Ism bo'yicha qidirish"
          aria-label="O'quvchini ism bo'yicha qidirish"
          className="pl-9"
        />
      </div>
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 sm:w-64">
        Saralash
        <select
          value={sortField}
          onChange={(event) => onSortChange(event.target.value)}
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {SORT_OPTION_LIST.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default MembersFilterBar
