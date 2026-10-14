import { X } from 'lucide-react'

function TopicTagList({ topicList, onRemove }) {
  if (!topicList || topicList.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Dars mavzulari">
      {topicList.map((topic) => (
        <li
          key={topic}
          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
        >
          #{topic}
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(topic)}
              aria-label={`"${topic}" tegini o'chirish`}
              className="rounded-full p-0.5 text-blue-600 transition-colors duration-150 hover:bg-blue-100 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

export default TopicTagList
