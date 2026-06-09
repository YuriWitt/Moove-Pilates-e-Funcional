import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, Calendar, CheckSquare, MessageSquare, Plus, TrendingUp, Users } from 'lucide-react'
import RecentActivity from '../components/RecentActivity'
import StatCard from '../components/StatCard'
import UpcomingClasses from '../components/UpcomingClasses'

export default function DashboardPage() {
  const [selectedStat, setSelectedStat] = useState('alunos')

  const stats = useMemo(() => [
    {
      id: 'alunos',
      icon: Users,
      label: 'Total de alunos',
      value: 48,
      helper: '+4 novos este mês',
      color: 'navy',
      detail: 'Base ativa do studio, considerando alunos com plano vigente.',
    },
    {
      id: 'aulas',
      icon: Calendar,
      label: 'Aulas hoje',
      value: 6,
      helper: '52 vagas ocupadas',
      color: 'gold',
      detail: 'A agenda do dia está quase cheia; Pilates Matutino e Funcional já estão no limite.',
    },
    {
      id: 'presenca',
      icon: TrendingUp,
      label: 'Presença média',
      value: '92%',
      helper: '+5% vs. semana anterior',
      color: 'green',
      detail: 'Média calculada a partir das chamadas registradas nos últimos 30 dias.',
    },
    {
      id: 'cobranca',
      icon: AlertCircle,
      label: 'Mensalidades vencidas',
      value: 3,
      helper: 'R$ 450,00 em aberto',
      color: 'red',
      detail: 'Priorize contato com alunos vencidos antes da próxima aula agendada.',
    },
  ], [])

  const selected = stats.find((stat) => stat.id === selectedStat) || stats[0]

  const quickActions = [
    { to: '/cadastro', icon: Plus, label: 'Cadastrar aluno' },
    { to: '/agenda', icon: Calendar, label: 'Nova aula' },
    { to: '/frequencia', icon: CheckSquare, label: 'Abrir chamada' },
    { to: '/cobranca', icon: MessageSquare, label: 'Enviar cobrança' },
  ]

  return (
    <div className="brand-surface min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">Painel operacional</p>
          <h1 className="mt-2 text-2xl font-bold text-primary-800 sm:text-3xl lg:text-4xl">Dashboard</h1>
          <p className="mt-2 text-gray-600">Visão rápida da rotina do studio para hoje.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="flex items-center justify-center gap-2 rounded-lg border border-cream-200 bg-white px-3 py-2 text-center text-sm font-semibold text-primary-800 transition-colors hover:border-gold-400 hover:bg-gold-50 sm:px-4"
            >
              <action.icon size={17} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <button key={stat.id} type="button" onClick={() => setSelectedStat(stat.id)} className="text-left">
            <StatCard {...stat} selected={selectedStat === stat.id} />
          </button>
        ))}
      </div>

      <section className="brand-panel mt-5 rounded-xl p-4 sm:mt-6 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-gold-700">{selected.label}</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-950">{selected.value}</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">{selected.detail}</p>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-cream-200 lg:max-w-sm">
            <div className="h-full rounded-full bg-gold-600" style={{ width: selected.id === 'cobranca' ? '35%' : '78%' }} />
          </div>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentActivity />
        </div>
        <UpcomingClasses />
      </div>
    </div>
  )
}
