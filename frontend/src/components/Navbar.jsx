import { Bell, LogOut, Search, User } from 'lucide-react'

export default function Navbar({ onLogout }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-cream-200 bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary-900 ring-1 ring-gold-300/30 sm:block">
            <img src="/brand/sublogo.jpg" alt="MOOVE" className="h-full w-full scale-[1.6] object-cover" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase text-gold-600 sm:text-xs">MOOVE</p>
            <h1 className="truncate text-lg font-bold text-primary-800 sm:text-xl">Gestão do studio</h1>
          </div>
        </div>

        <div className="hidden min-w-0 max-w-md flex-1 items-center gap-2 rounded-lg border border-cream-200 bg-cream-50 px-3 py-2 text-sm text-gray-500 lg:flex">
          <Search size={18} className="text-gold-600" />
          <span>Buscar aluno, aula ou cobrança</span>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <button type="button" className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-cream-100 hover:text-primary-800" title="Notificações">
            <Bell size={21} />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-600 px-1 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <div className="hidden items-center gap-3 border-l border-cream-200 pl-3 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800">
              <User size={19} className="text-cream-100" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
            title="Sair"
          >
            <LogOut size={21} />
          </button>
        </div>
      </div>
    </nav>
  )
}
