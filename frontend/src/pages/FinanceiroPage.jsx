import { useMemo, useState } from 'react'
import { BarChart3, CircleDollarSign, TrendingUp, Wallet } from 'lucide-react'

const registrosFinanceiros = [
  { id: 1, aluno: 'Jose Almeida', modalidade: 'Pilates', plano: 'Mensal 2x semana', valor: 320, status: 'Pago', vencimento: '08/06/2026' },
  { id: 2, aluno: 'Maria Santos', modalidade: 'Funcional', plano: 'Mensal funcional', valor: 240, status: 'Pago', vencimento: '08/06/2026' },
  { id: 3, aluno: 'Ana Costa', modalidade: 'Pilates', plano: 'Mensal 3x semana', valor: 400, status: 'Pago', vencimento: '10/06/2026' },
  { id: 4, aluno: 'Pedro Oliveira', modalidade: 'Funcional', plano: 'Mensal funcional', valor: 240, status: 'Pago', vencimento: '12/06/2026' },
  { id: 5, aluno: 'Luiza Martins', modalidade: 'Pilates', plano: 'Mensal 3x semana', valor: 400, status: 'Pago', vencimento: '15/06/2026' },
  { id: 6, aluno: 'Carlos Lima', modalidade: 'Funcional', plano: 'Funcional performance', valor: 260, status: 'Pago', vencimento: '15/06/2026' },
  { id: 7, aluno: 'Beatriz Rocha', modalidade: 'Pilates', plano: 'Mensal 2x semana', valor: 320, status: 'Pendente', vencimento: '20/06/2026' },
  { id: 8, aluno: 'Rafael Nunes', modalidade: 'Funcional', plano: 'Funcional performance', valor: 260, status: 'Vencido', vencimento: '05/06/2026' },
]

const modalidades = ['Pilates', 'Funcional']
const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function FinanceiroPage() {
  const [visao, setVisao] = useState('recebido')

  const resumo = useMemo(() => {
    const base = modalidades.map((modalidade) => {
      const itens = registrosFinanceiros.filter((item) => item.modalidade === modalidade)
      const recebido = itens.filter((item) => item.status === 'Pago').reduce((acc, item) => acc + item.valor, 0)
      const previsto = itens.reduce((acc, item) => acc + item.valor, 0)
      const alunos = new Set(itens.map((item) => item.aluno)).size
      return { modalidade, recebido, previsto, alunos }
    })

    const totalRecebido = base.reduce((acc, item) => acc + item.recebido, 0)
    const totalPrevisto = base.reduce((acc, item) => acc + item.previsto, 0)
    const vencedor = [...base].sort((a, b) => b[visao] - a[visao])[0]
    const segundo = [...base].sort((a, b) => b[visao] - a[visao])[1]

    return {
      modalidades: base,
      totalRecebido,
      totalPrevisto,
      vencedor,
      diferenca: vencedor[visao] - segundo[visao],
    }
  }, [visao])

  const maxValue = Math.max(...resumo.modalidades.map((item) => item[visao]), 1)

  return (
    <div className="brand-surface min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">Financeiro</p>
          <h1 className="mt-2 text-2xl font-bold text-primary-800 sm:text-3xl lg:text-4xl">Faturamento por treino</h1>
          <p className="mt-2 text-gray-600">Compare Pilates e Funcional por receita recebida ou prevista no mes.</p>
        </div>

        <div className="grid grid-cols-2 rounded-lg border border-cream-200 bg-white p-1">
          {[
            ['recebido', 'Recebido'],
            ['previsto', 'Previsto'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setVisao(key)}
              className={`rounded-md px-4 py-2 text-sm font-bold transition-colors ${
                visao === key ? 'bg-primary-800 text-white' : 'text-gray-600 hover:bg-cream-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <MetricCard icon={Wallet} label="Recebido" value={formatCurrency(resumo.totalRecebido)} helper="Pagamentos confirmados" />
        <MetricCard icon={CircleDollarSign} label="Previsto" value={formatCurrency(resumo.totalPrevisto)} helper="Receita do mes" />
        <MetricCard icon={TrendingUp} label="Maior faturamento" value={resumo.vencedor.modalidade} helper={`${formatCurrency(resumo.diferenca)} acima`} />
        <MetricCard icon={BarChart3} label="Alunos ativos" value={registrosFinanceiros.length} helper="Com plano no mes" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <section className="brand-panel rounded-xl p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-950">Grafico comparativo</h2>
              <p className="mt-1 text-sm text-gray-600">
                {visao === 'recebido' ? 'Faturamento ja recebido' : 'Faturamento previsto'} por modalidade.
              </p>
            </div>
            <span className="w-fit rounded-full bg-gold-50 px-3 py-1 text-xs font-bold text-gold-800">
              {resumo.vencedor.modalidade} lidera
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-end">
            <div className="space-y-3">
              {resumo.modalidades.map((item) => {
                const percent = resumo.totalRecebido ? Math.round((item.recebido / resumo.totalRecebido) * 100) : 0
                return (
                  <div key={item.modalidade} className="rounded-xl border border-cream-200 bg-cream-50 p-4">
                    <p className="text-sm font-bold text-gray-950">{item.modalidade}</p>
                    <p className="mt-1 text-2xl font-bold text-primary-800">{formatCurrency(item[visao])}</p>
                    <p className="mt-1 text-xs text-gray-500">{item.alunos} aluno(s) - {percent}% do recebido</p>
                  </div>
                )
              })}
            </div>

            <div className="flex h-72 items-end justify-center gap-8 rounded-xl border border-cream-200 bg-white px-6 pt-8 pb-5 sm:gap-14">
              {resumo.modalidades.map((item) => {
                const height = Math.max((item[visao] / maxValue) * 100, 8)
                const isWinner = item.modalidade === resumo.vencedor.modalidade
                return (
                  <div key={item.modalidade} className="flex h-full min-w-0 flex-1 max-w-[180px] flex-col justify-end">
                    <div className="mb-3 text-center">
                      <p className="text-sm font-bold text-gray-950">{formatCurrency(item[visao])}</p>
                    </div>
                    <div className="flex h-full items-end">
                      <div
                        className={`w-full rounded-t-xl transition-all ${isWinner ? 'bg-gold-600' : 'bg-primary-800'}`}
                        style={{ height: `${height}%` }}
                        aria-label={`${item.modalidade}: ${formatCurrency(item[visao])}`}
                      />
                    </div>
                    <p className="mt-3 truncate text-center text-sm font-bold text-gray-700">{item.modalidade}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="brand-panel rounded-xl p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-950">Leitura rapida</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            No cenario atual, <strong>{resumo.vencedor.modalidade}</strong> esta gerando mais faturamento.
            A diferenca sobre a outra modalidade e de <strong>{formatCurrency(resumo.diferenca)}</strong> na visao selecionada.
          </p>

          <div className="mt-6 space-y-3">
            {resumo.modalidades.map((item) => {
              const total = item.previsto || 1
              const recebidoPercent = Math.round((item.recebido / total) * 100)
              return (
                <div key={item.modalidade}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-bold text-gray-700">{item.modalidade}</span>
                    <span className="font-semibold text-gray-500">{recebidoPercent}% recebido</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                    <div className="h-full rounded-full bg-gold-600" style={{ width: `${recebidoPercent}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <section className="brand-panel mt-6 overflow-hidden rounded-xl">
        <div className="border-b border-cream-200 p-4 sm:p-6">
          <h2 className="text-xl font-bold text-gray-950">Receitas por aluno</h2>
          <p className="mt-1 text-sm text-gray-600">Base demonstrativa usada no grafico.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="bg-primary-800 text-white">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-bold">Aluno</th>
                <th className="px-5 py-4 text-left text-sm font-bold">Treino</th>
                <th className="px-5 py-4 text-left text-sm font-bold">Plano</th>
                <th className="px-5 py-4 text-center text-sm font-bold">Valor</th>
                <th className="px-5 py-4 text-center text-sm font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200 bg-white">
              {registrosFinanceiros.map((registro) => (
                <tr key={registro.id}>
                  <td className="px-5 py-4 font-semibold text-gray-950">{registro.aluno}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      registro.modalidade === 'Pilates' ? 'bg-gold-50 text-gold-800' : 'bg-primary-50 text-primary-800'
                    }`}>
                      {registro.modalidade}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{registro.plano}</td>
                  <td className="px-5 py-4 text-center font-bold text-gray-950">{formatCurrency(registro.valor)}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      registro.status === 'Pago'
                        ? 'bg-emerald-50 text-emerald-800'
                        : registro.status === 'Pendente'
                        ? 'bg-gold-50 text-gold-800'
                        : 'bg-red-50 text-red-800'
                    }`}>
                      {registro.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, helper }) {
  return (
    <div className="brand-panel rounded-xl p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-800 text-cream-100">
        <Icon size={22} />
      </div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-primary-800">{value}</p>
      <p className="mt-2 text-xs text-gray-500">{helper}</p>
    </div>
  )
}
