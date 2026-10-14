import { AppBadge } from '../shared'

const STATUS_CONFIG = {
    scheduled: { label: 'Rejalashtirilgan', variant: 'warning' },
    active: { label: 'Aktiv', variant: 'success' },
    completed: { label: 'Tugagan', variant: 'neutral' },
}

export default function TestStatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.completed
    return <AppBadge label={config.label} variant={config.variant} />
}