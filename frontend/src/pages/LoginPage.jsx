import { useState } from 'react'
import { Lock, User } from 'lucide-react'

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Informe usuario e senha para acessar.')
      return
    }

    if (username.trim().toLowerCase() !== 'admin' || password !== '123456') {
      setError('Usuario ou senha invalidos. Use admin / 123456.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 500)
  }

  return (
    <div className="gradient-gold-blue flex min-h-screen items-center justify-center p-3 sm:p-4">
      <div className="grid min-w-0 w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl sm:rounded-2xl md:max-w-5xl md:grid-cols-[1fr_420px]">
        <section className="hidden bg-primary-800 p-10 text-cream-100 md:flex md:flex-col md:justify-between">
          <div>
            <div className="max-w-[390px] overflow-hidden rounded-xl border border-gold-500/30 bg-primary-900 shadow-lg shadow-black/10">
              <img
                src="/brand/logomarca.jpg"
                alt="MOOVE Studio Integrado"
                className="h-28 w-full object-cover"
                style={{ objectPosition: 'center 50%' }}
              />
            </div>
            <h1 className="mt-8 text-4xl font-bold leading-tight">Controle de:</h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-cream-200">
              Agenda, alunos, frequência e cobrança em um painel simples para a rotina do studio.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-2xl font-bold text-gold-300">48</p>
              <p className="text-cream-200">alunos</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-2xl font-bold text-gold-300">6</p>
              <p className="text-cream-200">aulas hoje</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-2xl font-bold text-gold-300">92%</p>
              <p className="text-cream-200">presença</p>
            </div>
          </div>
        </section>

        <section className="min-w-0 p-5 sm:p-8 lg:p-10">
          <div className="mb-6 text-center md:hidden">
            <div className="mx-auto max-w-[320px] overflow-hidden rounded-xl border border-gold-500/20 bg-primary-900 shadow-sm">
              <img
                src="/brand/logomarca.jpg"
                alt="MOOVE Studio Integrado"
                className="h-24 w-full object-cover"
                style={{ objectPosition: 'center 50%' }}
              />
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">Acesso interno</p>
            <h2 className="mt-2 text-xl font-bold text-gray-950 sm:text-2xl">Entrar no sistema</h2>
            <p className="mt-2 text-sm text-gray-600">Use os dados demo já preenchidos.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Usuario</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gold-600" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  className="min-w-0 w-full rounded-lg border-2 border-cream-200 py-2.5 pl-10 pr-4 outline-none transition-colors focus:border-gold-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gold-600" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  className="min-w-0 w-full rounded-lg border-2 border-cream-200 py-2.5 pl-10 pr-4 outline-none transition-colors focus:border-gold-600"
                  required
                />
              </div>
            </div>

            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-gold-600" defaultChecked />
              Lembrar de mim
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary-800 py-3 font-bold text-white transition-colors hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
