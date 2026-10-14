const STATUS_CONFIG = {
    scheduled: { label: 'Rejalashtirilgan', className: 'bg-yellow-100 text-yellow-800' },
    active: { label: 'Aktiv', className: 'bg-green-100 text-green-800' },
    completed: { label: 'Tugagan', className: 'bg-gray-100 text-gray-600' },
}

export default function TestStatusBadge({ status }) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.completed
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}>
            {config.label}
        </span>
    )
}