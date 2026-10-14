import EmptyState from '../shared/EmptyState'
import StudentStatusCard from './StudentStatusCard'

function StudentStatusGrid({ studentStatusList = [] }) {
  if (studentStatusList.length === 0) {
    return <EmptyState text="Hozircha ko‘rsatiladigan o‘quvchi yo‘q" />
  }

  return (
    <div className="max-h-[42rem] overflow-y-auto rounded-xl">
      <div className="grid grid-cols-2 gap-3 pr-1 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
        {studentStatusList.map((student) => (
          <StudentStatusCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  )
}

export default StudentStatusGrid
