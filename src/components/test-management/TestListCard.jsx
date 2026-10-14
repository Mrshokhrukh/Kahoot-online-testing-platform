import { AppCard, AppButton } from '../shared'
import TestStatusBadge from './TestStatusBadge'

function formatDateTime(iso) {
    const d = new Date(iso)
    return d.toLocaleString('uz-UZ', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    })
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