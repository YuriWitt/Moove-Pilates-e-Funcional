import { NavLink } from 'react-router-dom'
import {
  Calendar,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  UserPlus,
  Wallet,
} from 'lucide-react'

const sublogoUrl = `${import.meta.env.BASE_URL}brand/sublogo.jpg`

export default function Sidebar({ isOpen, onToggle }) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: UserPlus, label: 'Cadastro', path: '/cadastro' },
    { icon: Calendar, label: 'Agenda', path: '/agenda' },
    { icon: CheckSquare, label: 'Freq.', path: '/frequencia' },
    { icon: Wallet, label: 'Financeiro', path: '/financeiro' },
    { icon: MessageSquare, label: 'Cobrança', path: '/cobranca' },
  ]

  return (
    <>
      <aside className={`${isOpen ? 'w-64' : 'w-20'} gradient-blue-dark hidden flex-col text-white shadow-xl transition-all duration-300 md:flex`}>
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          {isOpen && (
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-primary-900 ring-1 ring-gold-300/30">
                <img src={sublogoUrl} alt="MOOVE" className="h-full w-full scale-[1.65] object-cover" />
              </span>
              <div>
                <p className="text-lg font-bold leading-none tracking-wide">MOOVE</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-gold-300">Studio Integrado</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="rounded-lg p-2 text-gold-100 transition-colors hover:bg-white/10"
            title={isOpen ? 'Recolher menu' : 'Expandir menu'}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold-600 text-white shadow-lg shadow-black/10'
                    : 'text-cream-100 hover:bg-white/10 hover:text-white'
                }`
              }
              title={!isOpen ? item.label : undefined}
            >
              <item.icon size={20} className="shrink-0" />
              {isOpen && <span className="truncate">{item.label === 'Freq.' ? 'Frequência' : item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className={`flex items-center gap-3 ${isOpen ? 'justify-start' : 'justify-center'}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 font-bold text-primary-800">
              A
            </div>
            {isOpen && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Admin</p>
                <p className="truncate text-xs text-gold-300">Operação ativa</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <nav className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-cream-200 bg-white/95 px-2 pt-2 shadow-[0_-12px_30px_-24px_rgba(0,16,59,0.55)] backdrop-blur md:hidden">
        <div className="grid grid-cols-6 gap-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] font-semibold leading-tight transition-colors ${
                  isActive
                    ? 'bg-primary-800 text-white'
                    : 'text-gray-600 hover:bg-cream-100 hover:text-primary-800'
                }`
              }
            >
              <item.icon size={20} className="shrink-0" />
              <span className="max-w-full truncate">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}
