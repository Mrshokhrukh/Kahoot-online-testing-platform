import { AppCard, AppButton } from '../shared'
import TestStatusBadge from './TestStatusBadge'

const MONTHS = [
    'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
    'iyul', 'avgust', 'sentyabr', 'oktabr', 'noyabr', 'dekabr',
]

function formatDateTime(iso) {
    const d = new Date(iso)
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    return `${d.getDate()}-${MONTHS[d.getMonth()]}, ${hh}:${mm}`
}


export default function TestListCard({ test, onConfigure, onMonitor, onResults }) {
    return (
        <AppCard className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-semibold text-gray-900">{test.name}</h3>
                    <TestStatusBadge status={test.status} />
                </div>
                <p className="text-sm text-gray-600">{test.groupName}</p>
                <p className="text-xs text-gray-500">
                    {formatDateTime(test.scheduledAt)} · {test.studentCount} ta o'quvchi
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                <AppButton label="Sozla" variant="secondary" size="sm" onClick={() => onConfigure(test.id)} />
                {test.status === 'active' && (
                    <AppButton label="Monitoring" size="sm" onClick={() => onMonitor(test.id)} />
                )}
                {test.status === 'completed' && (
                    <AppButton label="Natijalar" size="sm" onClick={() => onResults(test.id)} />
                )}
            </div>
        </AppCard>
    )
}