import { useMemo, useState } from 'react'
import { CheckSquare, Download, Filter, XCircle } from 'lucide-react'

const initialFrequencias = [
  { id: 1, aluno: 'João Silva', aulas: 12, presentes: 11, faltas: 1, ultimaPresenca: '07/06/2026', registradoHoje: false },
  { id: 2, aluno: 'Maria Santos', aulas: 12, presentes: 10, faltas: 2, ultimaPresenca: '06/06/2026', registradoHoje: false },
  { id: 3, aluno: 'Carlos Ferreira', aulas: 12, presentes: 12, faltas: 0, ultimaPresenca: '08/06/2026', registradoHoje: true },
  { id: 4, aluno: 'Ana Costa', aulas: 12, presentes: 8, faltas: 4, ultimaPresenca: '04/06/2026', registradoHoje: false },
  { id: 5, aluno: 'Pedro Oliveira', aulas: 12, presentes: 5, faltas: 7, ultimaPresenca: '01/06/2026', registradoHoje: false },
]

const hoje = '08/06/2026'

function taxaPresenca(freq) {
  return freq.aulas ? Number(((freq.presentes / freq.aulas) * 100).toFixed(1)) : 0
}

function statusFromTaxa(taxa) {
  if (taxa === 100) return 'Perfeito'
  if (taxa >= 90) return 'Excelente'
  if (taxa >= 75) return 'Bom'
  if (taxa >= 60) return 'Regular'
  return 'Baixa'
}

const statusStyle = {
  Perfeito: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Excelente: 'bg-primary-50 text-primary-800 border-primary-200',
  Bom: 'bg-gold-50 text-gold-800 border-gold-200',
  Regular: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  Baixa: 'bg-red-50 text-red-800 border-red-200',
}

export default function FrequenciaPage() {
  const [filtro, setFiltro] = useState('todos')
  const [selectedAula, setSelectedAula] = useState('Pilates Matutino')
  const [frequencias, setFrequencias] = useState(initialFrequencias)

  const enriched = useMemo(() => frequencias.map((freq) => {
    const taxa = taxaPresenca(freq)
    return { ...freq, taxa, status: statusFromTaxa(taxa) }
  }), [frequencias])

  const filtered = enriched.filter((freq) => {
    if (filtro === 'todos') return true
    if (filtro === 'excelente') return freq.taxa >= 90
    if (filtro === 'regular') return freq.taxa >= 60 && freq.taxa < 90
    if (filtro === 'baixa') return freq.taxa < 60
    return true
  })

  const resumo = enriched.reduce(
    (acc, freq) => ({
      media: acc.media + freq.taxa,
      alta: acc.alta + (freq.taxa >= 90 ? 1 : 0),
      regular: acc.regular + (freq.taxa >= 60 && freq.taxa < 90 ? 1 : 0),
      baixa: acc.baixa + (freq.taxa < 60 ? 1 : 0),
    }),
    { media: 0, alta: 0, regular: 0, baixa: 0 },
  )
  const media = enriched.length ? (resumo.media / enriched.length).toFixed(1) : '0.0'

  const registrar = (id, presente) => {
    setFrequencias((prev) => prev.map((freq) => {
      if (freq.id !== id) return freq
      const jaRegistrado = freq.registradoHoje
      return {
        ...freq,
        aulas: jaRegistrado ? freq.aulas : freq.aulas + 1,
        presentes: freq.presentes + (presente && !jaRegistrado ? 1 : 0),
        faltas: freq.faltas + (!presente && !jaRegistrado ? 1 : 0),
        ultimaPresenca: presente ? hoje : freq.ultimaPresenca,
        registradoHoje: true,
      }
    }))
  }

  const exportarCsv = () => {
    const header = ['Aluno', 'Aula', 'Total de aulas', 'Presentes', 'Faltas', 'Taxa', 'Status']
    const rows = enriched.map((freq) => [freq.aluno, selectedAula, freq.aulas, freq.presentes, freq.faltas, `${freq.taxa}%`, freq.status])
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(';')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'frequencia-moove.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="brand-surface min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">Frequência</p>
          <h1 className="mt-2 text-3xl font-bold text-primary-800 lg:text-4xl">Ficha de frequência</h1>
          <p className="mt-2 text-gray-600">Registre presença, acompanhe faltas e exporte o relatório.</p>
        </div>
        <button onClick={exportarCsv} type="button" className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-800 px-5 py-3 font-bold text-white hover:bg-primary-900 sm:w-auto">
          <Download size={20} />
          Exportar CSV
        </button>
      </div>

      <section className="brand-panel mb-5 rounded-xl p-4 sm:mb-6 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <Filter size={20} className="text-gold-600" />
          <h2 className="font-bold text-gray-950">Filtros</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Aula</label>
            <select value={selectedAula} onChange={(event) => setSelectedAula(event.target.value)} className="w-full rounded-lg border-2 border-cream-200 px-4 py-2.5 outline-none focus:border-gold-600">
              <option>Pilates Matutino</option>
              <option>Funcional</option>
              <option>Pilates Solo</option>
              <option>Alongamento</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Período</label>
            <select className="w-full rounded-lg border-2 border-cream-200 px-4 py-2.5 outline-none focus:border-gold-600">
              <option>Últimos 30 dias</option>
              <option>Últimos 60 dias</option>
              <option>Últimos 90 dias</option>
              <option>Tudo</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
            <select value={filtro} onChange={(event) => setFiltro(event.target.value)} className="w-full rounded-lg border-2 border-cream-200 px-4 py-2.5 outline-none focus:border-gold-600">
              <option value="todos">Todos os alunos</option>
              <option value="excelente">Alta frequência</option>
              <option value="regular">Regular</option>
              <option value="baixa">Baixa frequência</option>
            </select>
          </div>
        </div>
      </section>

      <section className="brand-panel overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="bg-primary-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">Aluno</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Total</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Presentes</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Faltas</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Taxa</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Última presença</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Status</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Chamada de hoje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {filtered.map((freq) => (
                <tr key={freq.id} className={freq.registradoHoje ? 'bg-emerald-50/40' : 'bg-white'}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 font-bold text-white">
                        {freq.aluno.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-950">{freq.aluno}</p>
                        <p className="text-xs text-gray-500">ID: {String(freq.id + 1000)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">{freq.aulas}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">{freq.presentes}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-800">{freq.faltas}</span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-primary-800">{freq.taxa}%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{freq.ultimaPresenca}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyle[freq.status]}`}>{freq.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button type="button" onClick={() => registrar(freq.id, true)} disabled={freq.registradoHoje} className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">
                        <CheckSquare size={15} />
                        Presente
                      </button>
                      <button type="button" onClick={() => registrar(freq.id, false)} disabled={freq.registradoHoje} className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">
                        <XCircle size={15} />
                        Falta
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 md:grid-cols-4 md:gap-5">
        <SummaryCard label="Presença média" value={`${media}%`} tone="primary" helper="Entre todos os alunos" />
        <SummaryCard label="Frequência alta" value={resumo.alta} tone="green" helper="Acima de 90%" />
        <SummaryCard label="Frequência regular" value={resumo.regular} tone="gold" helper="Entre 60% e 90%" />
        <SummaryCard label="Frequência baixa" value={resumo.baixa} tone="red" helper="Abaixo de 60%" />
      </div>
    </div>
  )
}

function SummaryCard({ label, value, tone, helper }) {
  const toneMap = {
    primary: 'border-primary-800 text-primary-800',
    green: 'border-emerald-600 text-emerald-700',
    gold: 'border-gold-600 text-gold-700',
    red: 'border-red-600 text-red-700',
  }

  return (
    <div className={`brand-panel rounded-xl border-t-4 p-5 ${toneMap[tone]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-xs text-gray-500">{helper}</p>
    </div>
  )
}
