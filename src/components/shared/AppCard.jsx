function AppCard({ children, className = '' }) {
  return <section className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-150 hover:shadow-md sm:p-6 ${className}`}>{children}</section>
}

export default AppCard
