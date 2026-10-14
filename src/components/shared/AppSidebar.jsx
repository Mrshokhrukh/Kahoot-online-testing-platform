import { BookOpen, ChartNoAxesColumn, CircleHelp, GraduationCap, Home, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react'

const ICONS = { dashboard: Home, groups: Users, tests: BookOpen, results: ChartNoAxesColumn, students: GraduationCap, settings: Settings, help: CircleHelp }

function AppSidebar({ navItems = [], activeRoute = '', onNavigate, onLogout, userName = 'Foydalanuvchi', userRole, className = '' }) {
  const displayedRole = userRole || (activeRoute.startsWith('/student/') ? 'O‘quvchi' : 'O‘qituvchi')
  return <aside className={`flex w-full flex-col bg-gray-900 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-60 ${className}`}>
    <a href="/" className="flex items-center gap-3 px-5 py-6"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600"><GraduationCap className="h-5 w-5" /></span><span className="text-lg font-bold tracking-tight">EduTest</span></a>
    <p className="px-5 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Asosiy menyu</p>
    <nav aria-label="Asosiy navigatsiya" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col">{navItems.map((item) => {
      const Icon = ICONS[item.icon] || LayoutDashboard
      const isActive = item.route === activeRoute
      return <a key={item.route} href={item.href || item.route} onClick={(event) => { if (onNavigate) { event.preventDefault(); onNavigate(item.route) } }} aria-current={isActive ? 'page' : undefined} className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:bg-gray-600 hover:text-white'}`}><Icon className="h-4 w-4" aria-hidden="true" />{item.label}{isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />}</a>
    })}</nav>
    <div className="mt-auto hidden items-center gap-3 border-t border-gray-600 px-4 py-4 lg:flex"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-600 text-xs font-bold">{userName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || '?'}</span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold">{userName}</span><span className="text-[10px] text-gray-400">{displayedRole}</span></span><button type="button" onClick={onLogout} aria-label="Tizimdan chiqish" title="Tizimdan chiqish" className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"><LogOut className="h-4 w-4" /></button></div>
  </aside>
}

export default AppSidebar
