import { Calendar, DollarSign, User } from 'lucide-react'

const iconMap = {
  user: User,
  calendar: Calendar,
  payment: DollarSign,
}

const colorMap = {
  user: 'bg-primary-50 text-primary-800',
  calendar: 'bg-gold-50 text-gold-700',
  payment: 'bg-emerald-50 text-emerald-700',
}

export default function RecentActivity() {
  const activities = [
    {
      type: 'user',
      title: 'Novo aluno cadastrado',
      description: 'Maria Silva entrou no plano mensal',
      time: '2 horas atrás',
    },
    {
      type: 'calendar',
      title: 'Aula concluída',
      description: 'Pilates matutino fechou com 15 presenças',
      time: '1 hora atrás',
    },
    {
      type: 'payment',
      title: 'Cobrança enviada',
      description: '5 lembretes de mensalidade foram preparados',
      time: '30 minutos atrás',
    },
  ]

  return (
    <section className="brand-panel rounded-xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-950">Atividade recente</h2>
        <span className="text-xs font-medium text-gold-700">Hoje</span>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type]
          return (
            <div key={`${activity.type}-${activity.time}`} className="flex gap-4 border-b border-cream-200 pb-4 last:border-0 last:pb-0">
              <div className={`h-fit rounded-lg p-3 ${colorMap[activity.type]}`}>
                <Icon size={19} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-950">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
