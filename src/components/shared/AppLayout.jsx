function AppLayout({ children, className = '' }) {
  return <main className={`min-h-screen bg-gray-50 text-gray-900 antialiased ${className}`}><div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div></main>
}

export default AppLayout
