import AppCard from '../shared/AppCard'

const TYPE_LABELS = {
  quiz: 'Quiz',
  true_false: 'T/F',
  code: 'Kod',
  open: 'Ochiq',
}

const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Oson' },
  { value: 'medium', label: 'O‘rta' },
  { value: 'hard', label: 'Qiyin' },
]

function GenerationSettings({
  generationSettings,
  availableQuestionCount,
  onQuestionCountChange,
  onTypeToggle,
  onDifficultyChange,
}) {
  const selectedTypes = generationSettings?.types || []

  return (
    <AppCard className="h-full p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">Sozlamalar</h2>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          Demo: {availableQuestionCount} ta namuna
        </span>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
            <span>Namunaviy savollar soni</span>
            <span className="font-semibold text-gray-900">{generationSettings?.questionCount || 20}</span>
          </div>
          <input
            type="range"
            min="1"
            max={Math.max(1, availableQuestionCount)}
            step="1"
            value={generationSettings?.questionCount || 20}
            onChange={(event) => onQuestionCountChange(event.target.value)}
            className="h-2 w-full cursor-pointer accent-blue-600"
            aria-label="Savollar soni"
          />
          <div className="mt-2 flex justify-between text-[10px] text-gray-400">
            <span>1</span>
            <span>{availableQuestionCount}</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Hozircha faqat mavjud statik namunalar ishlatiladi; haqiqiy AI generatsiyasi ulanmagan.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">Test turi</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Object.entries(TYPE_LABELS).map(([type, label]) => {
              const isChecked = selectedTypes.includes(type)

              return (
                <label
                  key={type}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    isChecked
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isChecked && selectedTypes.length === 1}
                    onChange={() => onTypeToggle(type)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  {label}
                </label>
              )
            })}
          </div>
        </div>
        <p className="text-xs text-gray-500">Kamida bitta savol turini tanlangan holda qoldiring.</p>

        <div>
          <label htmlFor="difficulty" className="mb-2 block text-sm font-medium text-gray-700">
            Qiyinlik darajasi
          </label>
          <select
            id="difficulty"
            value={generationSettings?.difficulty || 'medium'}
            onChange={(event) => onDifficultyChange(event.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {DIFFICULTY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </AppCard>
  )
}

export default GenerationSettings
