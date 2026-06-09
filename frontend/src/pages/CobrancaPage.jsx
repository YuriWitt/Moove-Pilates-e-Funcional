import { useMemo, useState } from 'react'
import { AlertCircle, CheckCircle, Clock, MessageSquare, Send, Wallet } from 'lucide-react'

const initialCobrancas = [
  { id: 1, aluno: 'João Silva', valor: 150, vencimento: '30/06/2026', status: 'Pago', dataPagamento: '28/06/2026', telefone: '(11) 99999-1111', ultimaMensagem: '28/06/2026' },
  { id: 2, aluno: 'Maria Santos', valor: 150, vencimento: '08/06/2026', status: 'Vencido', dataPagamento: null, telefone: '(11) 99999-2222', ultimaMensagem: '07/06/2026' },
  { id: 3, aluno: 'Carlos Ferreira', valor: 150, vencimento: '15/06/2026', status: 'Vencido', dataPagamento: null, telefone: '(11) 99999-3333', ultimaMensagem: '14/06/2026' },
  { id: 4, aluno: 'Ana Costa', valor: 400, vencimento: '30/06/2026', status: 'Pendente', dataPagamento: null, telefone: '(11) 99999-4444', ultimaMensagem: null },
  { id: 5, aluno: 'Pedro Oliveira', valor: 150, vencimento: '30/06/2026', status: 'Pendente', dataPagamento: null, telefone: '(11) 99999-5555', ultimaMensagem: null },
]

const templates = {
  cobranca: 'Olá {NOME}, sua mensalidade de R$ {VALOR} venceu em {DATA}. Posso te ajudar com o pagamento?',
  lembrete: 'Oi {NOME}! Passando para lembrar que sua mensalidade vence em {DATA}.',
  desconto: 'Bom dia, {NOME}. Temos condição especial para pagamento antecipado este mês.',
}

const statusStyle = {
  Pago: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Pendente: 'bg-gold-50 text-gold-800 border-gold-200',
  Vencido: 'bg-red-50 text-red-800 border-red-200',
}

const statusIcon = {
  Pago: CheckCircle,
  Pendente: Clock,
  Vencido: AlertCircle,
}

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const hoje = '08/06/2026'

export default function CobrancaPage() {
  const [cobrancas, setCobrancas] = useState(initialCobrancas)
  const [showModal, setShowModal] = useState(false)
  const [selectedAlunos, setSelectedAlunos] = useState([])
  const [mensagem, setMensagem] = useState(templates.cobranca)
  const [enviando, setEnviando] = useState(false)
  const [feedback, setFeedback] = useState('')

  const resumo = useMemo(() => cobrancas.reduce(
    (acc, item) => {
      acc.total += item.valor
      if (item.status === 'Pago') acc.pago += item.valor
      if (item.status === 'Pendente') acc.pendente += item.valor
      if (item.status === 'Vencido') acc.vencido += item.valor
      return acc
    },
    { pago: 0, pendente: 0, vencido: 0, total: 0 },
  ), [cobrancas])

  const totalSelecionado = selectedAlunos.reduce((acc, id) => {
    const cobranca = cobrancas.find((item) => item.id === id)
    return acc + (cobranca?.valor || 0)
  }, 0)

  const toggleAluno = (id) => {
    setSelectedAlunos((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const openModal = (ids = selectedAlunos) => {
    setSelectedAlunos(ids)
    setMensagem(templates.cobranca)
    setShowModal(true)
  }

  const handleEnviarMensagens = (event) => {
    event.preventDefault()
    if (selectedAlunos.length === 0 || !mensagem.trim()) return

    setEnviando(true)
    setTimeout(() => {
      setCobrancas((prev) => prev.map((cobranca) => (
        selectedAlunos.includes(cobranca.id)
          ? { ...cobranca, ultimaMensagem: hoje }
          : cobranca
      )))
      setFeedback(`${selectedAlunos.length} mensagem(ns) preparada(s) para WhatsApp.`)
      setEnviando(false)
      setShowModal(false)
      setSelectedAlunos([])
    }, 700)
  }

  const registrarPagamento = (id) => {
    setCobrancas((prev) => prev.map((cobranca) => (
      cobranca.id === id
        ? { ...cobranca, status: 'Pago', dataPagamento: hoje }
        : cobranca
    )))
    setFeedback('Pagamento registrado no protótipo.')
  }

  const toggleAll = (checked) => {
    setSelectedAlunos(checked ? cobrancas.filter((item) => item.status !== 'Pago').map((item) => item.id) : [])
  }

  return (
    <div className="brand-surface min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">Financeiro</p>
          <h1 className="mt-2 text-3xl font-bold text-primary-800 lg:text-4xl">Gestão de cobrança</h1>
          <p className="mt-2 text-gray-600">Selecione alunos, envie lembretes e registre pagamentos.</p>
        </div>
        <button
          type="button"
          onClick={() => openModal(selectedAlunos)}
          disabled={selectedAlunos.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-800 px-5 py-3 font-bold text-white hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <MessageSquare size={20} />
          Enviar cobrança
        </button>
      </div>

      {feedback && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <CheckCircle size={20} />
          <p className="font-semibold">{feedback}</p>
        </div>
      )}

      <div className="mb-5 grid grid-cols-1 gap-4 sm:mb-6 md:grid-cols-4 md:gap-5">
        <FinanceCard label="Recebidos" value={formatCurrency(resumo.pago)} helper="Pagamentos confirmados" tone="green" />
        <FinanceCard label="Pendentes" value={formatCurrency(resumo.pendente)} helper="Ainda no prazo" tone="gold" />
        <FinanceCard label="Vencidos" value={formatCurrency(resumo.vencido)} helper="Priorizar contato" tone="red" />
        <FinanceCard label="Total do mês" value={formatCurrency(resumo.total)} helper={`${cobrancas.length} cobranças`} tone="primary" />
      </div>

      <section className="brand-panel overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="bg-primary-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={selectedAlunos.length > 0 && selectedAlunos.length === cobrancas.filter((item) => item.status !== 'Pago').length}
                    onChange={(event) => toggleAll(event.target.checked)}
                    className="h-5 w-5 cursor-pointer rounded accent-gold-600"
                    title="Selecionar pendentes"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold">Aluno</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Valor</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Vencimento</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Status</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Último contato</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {cobrancas.map((cobranca) => {
                const StatusIcon = statusIcon[cobranca.status]
                return (
                  <tr key={cobranca.id} className={selectedAlunos.includes(cobranca.id) ? 'bg-gold-50/60' : 'bg-white'}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedAlunos.includes(cobranca.id)}
                        disabled={cobranca.status === 'Pago'}
                        onChange={() => toggleAluno(cobranca.id)}
                        className="h-5 w-5 cursor-pointer rounded accent-gold-600 disabled:cursor-not-allowed disabled:opacity-40"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 font-bold text-white">
                          {cobranca.aluno.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-950">{cobranca.aluno}</p>
                          <p className="text-xs text-gray-500">{cobranca.telefone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-950">{formatCurrency(cobranca.valor)}</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">{cobranca.vencimento}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${statusStyle[cobranca.status]}`}>
                        <StatusIcon size={15} />
                        {cobranca.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      {cobranca.ultimaMensagem || <span className="text-gray-400">Sem contato</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button type="button" onClick={() => openModal([cobranca.id])} disabled={cobranca.status === 'Pago'} className="flex items-center gap-1 rounded-lg bg-gold-600 px-3 py-2 text-xs font-semibold text-white hover:bg-gold-700 disabled:cursor-not-allowed disabled:opacity-40">
                          <Send size={15} />
                          Enviar
                        </button>
                        <button type="button" onClick={() => registrarPagamento(cobranca.id)} disabled={cobranca.status === 'Pago'} className="flex items-center gap-1 rounded-lg border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40">
                          <Wallet size={15} />
                          Pagar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleEnviarMensagens} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-cream-200 bg-white p-5">
              <h2 className="flex items-center gap-2 text-xl font-bold text-primary-800">
                <MessageSquare size={24} />
                Enviar cobrança
              </h2>
              <button type="button" onClick={() => setShowModal(false)} className="rounded-lg px-3 py-1 text-2xl leading-none text-gray-500 hover:bg-cream-50">
                ×
              </button>
            </div>

            <div className="space-y-6 p-5">
              <section>
                <h3 className="font-bold text-gray-950">Alunos selecionados</h3>
                <p className="mt-1 text-sm text-gray-600">Total: {formatCurrency(totalSelecionado)}</p>
                <div className="mt-3 max-h-44 space-y-2 overflow-y-auto">
                  {cobrancas.filter((item) => item.status !== 'Pago').map((cobranca) => (
                    <label key={cobranca.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-cream-200 p-3 hover:bg-cream-50">
                      <input type="checkbox" checked={selectedAlunos.includes(cobranca.id)} onChange={() => toggleAluno(cobranca.id)} className="h-5 w-5 rounded accent-gold-600" />
                      <span className="flex-1">
                        <span className="block font-semibold text-gray-950">{cobranca.aluno}</span>
                        <span className="text-sm text-gray-600">{formatCurrency(cobranca.valor)} - vence em {cobranca.vencimento}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-3 font-bold text-gray-950">Template</h3>
                <div className="grid gap-2">
                  {Object.entries(templates).map(([key, value]) => (
                    <button key={key} type="button" onClick={() => setMensagem(value)} className="rounded-lg border border-cream-200 p-3 text-left transition-colors hover:border-gold-400 hover:bg-gold-50">
                      <p className="font-semibold capitalize text-gray-950">{key}</p>
                      <p className="mt-1 text-sm text-gray-600">{value}</p>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <label className="mb-2 block font-bold text-gray-950">Mensagem</label>
                <p className="mb-3 text-xs text-gray-600">Use {'{NOME}'}, {'{VALOR}'} e {'{DATA}'} para personalizar.</p>
                <textarea
                  value={mensagem}
                  onChange={(event) => setMensagem(event.target.value)}
                  className="h-28 w-full resize-none rounded-lg border-2 border-cream-200 px-4 py-3 outline-none focus:border-gold-600"
                  required
                />
              </section>

              <div className="flex gap-3 border-t border-cream-200 pt-5">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-lg border border-cream-200 py-3 font-semibold text-gray-700 hover:bg-cream-50">
                  Cancelar
                </button>
                <button disabled={enviando || selectedAlunos.length === 0 || !mensagem.trim()} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-800 py-3 font-bold text-white hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-50">
                  <Send size={18} />
                  {enviando ? 'Enviando...' : `Enviar para ${selectedAlunos.length}`}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function FinanceCard({ label, value, helper, tone }) {
  const toneMap = {
    primary: 'border-primary-800 text-primary-800',
    green: 'border-emerald-600 text-emerald-700',
    gold: 'border-gold-600 text-gold-700',
    red: 'border-red-600 text-red-700',
  }

  return (
    <div className={`brand-panel rounded-xl border-t-4 p-5 ${toneMap[tone]}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-2 text-2xl font-bold lg:text-3xl">{value}</p>
      <p className="mt-2 text-xs text-gray-500">{helper}</p>
    </div>
  )
}
