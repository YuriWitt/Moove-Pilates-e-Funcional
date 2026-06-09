import { Link } from 'react-router-dom'
import { Clock, Users } from 'lucide-react'

export default function UpcomingClasses() {
  const classes = [
    { name: 'Pilates Matutino', time: '09:00', instructor: 'Ana', students: 12 },
    { name: 'Funcional', time: '10:30', instructor: 'Carlos', students: 8 },
    { name: 'Pilates Solo', time: '14:00', instructor: 'Beatriz', students: 5 },
    { name: 'Alongamento', time: '16:00', instructor: 'Maria', students: 10 },
  ]

  return (
    <section className="brand-panel rounded-xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-950">Próximas aulas</h2>
        <span className="text-xs font-medium text-gold-700">4 hoje</span>
      </div>
      <div className="space-y-3">
        {classes.map((cls) => (
          <div key={`${cls.name}-${cls.time}`} className="border-l-4 border-gold-600 bg-cream-50 py-3 pl-4 pr-3">
            <p className="text-sm font-semibold text-gray-950">{cls.name}</p>
            <div className="mt-2 flex items-center gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {cls.time}
              </span>
              <span className="flex items-center gap-1">
                <Users size={14} />
                {cls.students} alunos
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Prof. {cls.instructor}</p>
          </div>
        ))}
      </div>

      <Link to="/agenda" className="mt-5 flex w-full items-center justify-center rounded-lg bg-primary-800 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-900">
        Ver agenda completa
      </Link>
    </section>
  )
}
