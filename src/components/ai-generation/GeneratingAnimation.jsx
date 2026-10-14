import { Sparkles } from 'lucide-react'
import AppCard from '../shared/AppCard'

function GeneratingAnimation() {
  return (
    <AppCard className="overflow-hidden border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8 text-center">
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 shadow-inner">
        <Sparkles className="h-9 w-9 animate-pulse" />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-900">AI test tayyorlanmoqda...</h2>
        <p className="mt-2 text-sm text-gray-600">Savollar, variantlar va tahrirlash uchun ma’lumotlar yig‘ilmoqda.</p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {[0, 1, 2].map((dotIndex) => (
          <span
            key={dotIndex}
            className="h-3 w-3 rounded-full bg-blue-600 animate-pulse"
            style={{ animationDelay: `${dotIndex * 180}ms` }}
          />
        ))}
      </div>
    </AppCard>
  )
}

export default GeneratingAnimation
