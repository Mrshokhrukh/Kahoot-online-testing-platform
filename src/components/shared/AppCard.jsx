function AppCard({ children, className = '' }) {
  return <section className={`rounded-xl bg-white p-6 shadow-md transition-shadow duration-150 hover:shadow-lg ${className}`}>{children}</section>
}

export default AppCard
