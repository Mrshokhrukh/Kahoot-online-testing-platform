function AppCard({ children, className = '' }) {
  return <section className={`rounded-2xl bg-white p-6 shadow-[0_8px_30px_-20px_rgba(20,83,45,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-20px_rgba(20,83,45,0.35)] ${className}`}>{children}</section>
}

export default AppCard
