const colorMap = {
  navy: 'bg-primary-800 text-cream-100',
  gold: 'bg-gold-600 text-white',
  green: 'bg-emerald-600 text-white',
  red: 'bg-red-600 text-white',
}

export default function StatCard({ icon: Icon, label, value, helper, color = 'navy', selected = false }) {
  return (
    <div className={`brand-panel card-hover rounded-xl p-5 ${selected ? 'ring-2 ring-gold-500 ring-offset-2' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-950">{value}</p>
          {helper && <p className="mt-2 text-xs text-gray-500">{helper}</p>}
        </div>
        <div className={`rounded-lg p-3 ${colorMap[color] || colorMap.navy}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}
