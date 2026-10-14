function PageHeader({ title, subtitle, action }) {
  return <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-green-700">EDUTEST <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-green-500 align-middle" /></p><h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h1>{subtitle && <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>}</div>{action && <div className="shrink-0">{action}</div>}</header>
}

export default PageHeader
