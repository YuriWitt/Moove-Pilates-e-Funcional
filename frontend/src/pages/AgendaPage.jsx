import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ChevronLeft, ChevronRight, Clock, DollarSign, Edit3, MapPin, Plus, Send, User, X } from 'lucide-react'

const initialAulas = [
  { id: 1, dia: 8, aluno: 'Jose Almeida', whatsapp: '11999991111', modalidade: 'Pilates', horario: '09:00', professor: 'Ana Silva', local: 'Sala A', valor: 320, status: 'Agendada' },
  { id: 2, dia: 8, aluno: 'Maria Santos', whatsapp: '11999992222', modalidade: 'Funcional', horario: '10:30', professor: 'Carlos Santos', local: 'Sala B', valor: 240, status: 'Agendada' },
  { id: 3, dia: 8, aluno: 'Ana Costa', whatsapp: '11999993333', modalidade: 'Pilates', horario: '14:00', professor: 'Beatriz Costa', local: 'Sala A', valor: 400, status: 'Confirmada' },
  { id: 4, dia: 9, aluno: 'Pedro Oliveira', whatsapp: '11999994444', modalidade: 'Funcional', horario: '16:00', professor: 'Lucas Ferreira', local: 'Sala B', valor: 240, status: 'Confirmada' },
  { id: 5, dia: 10, aluno: 'Luiza Martins', whatsapp: '11999995555', modalidade: 'Pilates', horario: '18:00', professor: 'Ana Silva', local: 'Sala A', valor: 400, status: 'Agendada' },
]

const emptyForm = {
  aluno: '',
  whatsapp: '',
  modalidade: 'Pilates',
  horario: '',
  professor: '',
  local: '',
  valor: 320,
  status: 'Agendada',
  mensagemPrimeiraAula: '',
}

const inputClass = 'min-w-0 w-full rounded-lg border-2 border-cream-200 px-4 py-2.5 outline-none transition-colors focus:border-gold-600'
const textareaClass = 'min-h-28 w-full resize-y rounded-lg border-2 border-cream-200 px-4 py-3 text-sm outline-none transition-colors focus:border-gold-600'
const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const cleanWhatsapp = (value) => {
  const digits = String(value || '').replace(/\D/g, '')
  if (!digits) return ''
  return digits.startsWith('55') ? digits : `55${digits}`
}

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 8))
  const [selectedDate, setSelectedDate] = useState(8)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [aulas, setAulas] = useState(initialAulas)
  const [form, setForm] = useState(emptyForm)

  const days = useMemo(() => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    return [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)]
  }, [currentDate])

  const aulasDoDia = aulas
    .filter((aula) => aula.dia === selectedDate)
    .sort((a, b) => a.horario.localeCompare(b.horario))

  const resumo = aulasDoDia.reduce(
    (acc, aula) => {
      acc.total += 1
      acc.faturamento += Number(aula.valor)
      acc[aula.modalidade.toLowerCase()] += 1
      return acc
    },
    { total: 0, pilates: 0, funcional: 0, faturamento: 0 },
  )

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const selectedDateLabel = `${selectedDate} de ${monthName}`

  const getPrimeiraAulaMessage = (appointment = form, dateLabel = selectedDateLabel) => {
    const aluno = appointment.aluno?.trim() || 'aluno(a)'
    const modalidade = appointment.modalidade || 'aula'
    const horario = appointment.horario || 'horario combinado'
    const professor = appointment.professor?.trim() || 'nossa equipe'
    const local = appointment.local?.trim() || 'MOOVE Studio Integrado'

    return `Ola, ${aluno}! Sua primeira aula de ${modalidade} na MOOVE Studio Integrado ficou agendada para ${dateLabel}, as ${horario}, com ${professor}, em ${local}. Qualquer duvida, pode responder por aqui.`
  }

  const getWhatsappUrl = (appointment, dateLabel = selectedDateLabel) => {
    const phone = cleanWhatsapp(appointment.whatsapp)
    if (!phone) return ''
    const message = appointment.mensagemPrimeiraAula?.trim() || getPrimeiraAulaMessage(appointment, dateLabel)
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  const openNewModal = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEditModal = (aula) => {
    setEditingId(aula.id)
    setForm({
      aluno: aula.aluno,
      whatsapp: aula.whatsapp || '',
      modalidade: aula.modalidade,
      horario: aula.horario,
      professor: aula.professor,
      local: aula.local,
      valor: aula.valor,
      status: aula.status,
      mensagemPrimeiraAula: aula.mensagemPrimeiraAula || '',
    })
    setShowModal(true)
  }

  const handleSaveAula = (event) => {
    event.preventDefault()
    const payload = {
      ...form,
      valor: Number(form.valor),
      mensagemPrimeiraAula: form.mensagemPrimeiraAula?.trim() || getPrimeiraAulaMessage(form),
    }

    if (editingId) {
      setAulas((prev) => prev.map((aula) => (aula.id === editingId ? { ...aula, ...payload } : aula)))
    } else {
      setAulas((prev) => [
        ...prev,
        {
          id: Date.now(),
          dia: selectedDate,
          ...payload,
        },
      ])
    }

    setShowModal(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  const changeMonth = (direction) => {
    setCurrentDate((date) => new Date(date.getFullYear(), date.getMonth() + direction, 1))
    setSelectedDate(1)
  }

  const modalidadeStyle = (modalidade) => (
    modalidade === 'Pilates'
      ? 'border-gold-200 bg-gold-50 text-gold-800'
      : 'border-primary-200 bg-primary-50 text-primary-800'
  )

  return (
    <div className="brand-surface min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">Agenda</p>
          <h1 className="mt-2 text-2xl font-bold text-primary-800 sm:text-3xl lg:text-4xl">Agenda por aluno</h1>
          <p className="mt-2 text-gray-600">Agende cada atendimento com aluno, modalidade, professor e valor.</p>
        </div>
        <button
          type="button"
          onClick={openNewModal}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-800 px-5 py-3 font-bold text-white transition-colors hover:bg-primary-900 sm:w-auto"
        >
          <Plus size={20} />
          Novo agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
        <section className="brand-panel h-fit rounded-xl p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <button type="button" onClick={() => changeMonth(-1)} className="rounded-lg p-2 text-primary-800 hover:bg-cream-100" title="Mes anterior">
              <ChevronLeft size={22} />
            </button>
            <h2 className="text-center font-bold capitalize text-gray-950">{monthName}</h2>
            <button type="button" onClick={() => changeMonth(1)} className="rounded-lg p-2 text-primary-800 hover:bg-cream-100" title="Proximo mes">
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="mb-3 grid grid-cols-7 gap-1 sm:gap-2">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((day) => (
              <div key={day} className="text-center text-xs font-bold text-gold-700">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {days.map((day, index) => {
              const hasClass = day && aulas.some((aula) => aula.dia === day)
              return (
                <button
                  key={`${day || 'empty'}-${index}`}
                  type="button"
                  disabled={!day}
                  onClick={() => day && setSelectedDate(day)}
                  className={`aspect-square rounded-lg text-sm font-semibold transition-colors ${
                    !day
                      ? 'cursor-default bg-transparent'
                      : day === selectedDate
                      ? 'bg-primary-800 text-white'
                      : hasClass
                      ? 'bg-gold-50 text-primary-800 hover:bg-gold-100'
                      : 'bg-white text-gray-700 hover:bg-cream-100'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <div className="mt-6 rounded-lg bg-cream-50 p-4">
            <p className="text-sm font-semibold text-gray-950">{selectedDate} de {monthName}</p>
            <p className="mt-1 text-sm text-gray-600">{resumo.total} atendimento(s) agendado(s)</p>
            <p className="mt-2 text-lg font-bold text-primary-800">{formatCurrency(resumo.faturamento)}</p>
          </div>
        </section>

        <section className="brand-panel rounded-xl p-4 sm:p-6">
          <div className="mb-6 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div>
              <h2 className="flex items-center gap-3 text-xl font-bold text-gray-950">
                <Calendar className="text-gold-600" size={24} />
                Atendimentos do dia
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {selectedDate} de {monthName}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm sm:gap-3">
              <ResumoCard label="Pilates" value={resumo.pilates} />
              <ResumoCard label="Funcional" value={resumo.funcional} />
              <ResumoCard label="Previsto" value={formatCurrency(resumo.faturamento)} />
            </div>
          </div>

          <div className="space-y-4">
            {aulasDoDia.length === 0 && (
              <div className="rounded-xl border border-dashed border-cream-200 bg-cream-50 p-8 text-center">
                <p className="font-semibold text-gray-950">Nenhum aluno agendado neste dia.</p>
                <button type="button" onClick={openNewModal} className="mt-4 rounded-lg bg-primary-800 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-900">
                  Agendar aluno
                </button>
              </div>
            )}

            {aulasDoDia.map((aula) => {
              const whatsappUrl = getWhatsappUrl(aula, `${aula.dia} de ${monthName}`)

              return (
              <article key={aula.id} className="rounded-xl border border-cream-200 bg-white p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-950">{aula.aluno}</h3>
                      <span className={`rounded-full border px-3 py-1 text-xs font-bold ${modalidadeStyle(aula.modalidade)}`}>
                        {aula.modalidade}
                      </span>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                        {aula.status}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-2">
                      <span className="flex items-center gap-2"><Clock size={16} className="text-gold-600" />{aula.horario}</span>
                      <span className="flex items-center gap-2"><User size={16} className="text-gold-600" />{aula.professor}</span>
                      <span className="flex items-center gap-2"><MapPin size={16} className="text-gold-600" />{aula.local}</span>
                      <span className="flex items-center gap-2"><DollarSign size={16} className="text-gold-600" />{formatCurrency(aula.valor)}</span>
                      <span className="flex items-center gap-2"><Send size={16} className="text-gold-600" />{aula.whatsapp || 'WhatsApp nao informado'}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:flex">
                    <button type="button" onClick={() => openEditModal(aula)} className="flex items-center justify-center gap-2 rounded-lg border border-cream-200 px-3 py-2 text-sm font-semibold text-primary-800 hover:bg-cream-50">
                      <Edit3 size={16} />
                      Editar
                    </button>
                    <a
                      href={whatsappUrl || undefined}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white ${
                        whatsappUrl ? 'bg-emerald-600 hover:bg-emerald-700' : 'pointer-events-none bg-gray-300'
                      }`}
                    >
                      <Send size={16} />
                      WhatsApp
                    </a>
                    <Link to="/frequencia" className="rounded-lg bg-gold-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-gold-700">
                      Frequencia
                    </Link>
                  </div>
                </div>
              </article>
              )
            })}
          </div>
        </section>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-cream-200 p-5">
              <h2 className="text-xl font-bold text-primary-800">{editingId ? 'Editar agendamento' : 'Agendar aluno'}</h2>
              <button type="button" onClick={() => setShowModal(false)} className="rounded-lg p-2 text-gray-500 hover:bg-cream-50" title="Fechar">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAula} className="space-y-4 p-5">
              <div className="grid gap-4 sm:grid-cols-[1fr_210px]">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Aluno</label>
                  <input value={form.aluno} onChange={(event) => setForm({ ...form, aluno: event.target.value })} placeholder="Ex: Jose Almeida" className={inputClass} required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">WhatsApp</label>
                  <input
                    value={form.whatsapp}
                    onChange={(event) => setForm({ ...form, whatsapp: event.target.value })}
                    placeholder="Ex: 11999999999"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Modalidade</label>
                  <select value={form.modalidade} onChange={(event) => setForm({ ...form, modalidade: event.target.value })} className={inputClass}>
                    <option>Pilates</option>
                    <option>Funcional</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Horario</label>
                  <input type="time" value={form.horario} onChange={(event) => setForm({ ...form, horario: event.target.value })} className={inputClass} required />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Professor</label>
                  <input value={form.professor} onChange={(event) => setForm({ ...form, professor: event.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Local/Sala</label>
                  <input value={form.local} onChange={(event) => setForm({ ...form, local: event.target.value })} className={inputClass} required />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Valor</label>
                  <input type="number" min="0" value={form.valor} onChange={(event) => setForm({ ...form, valor: event.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Status</label>
                  <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className={inputClass}>
                    <option>Agendada</option>
                    <option>Confirmada</option>
                    <option>Realizada</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-cream-200 bg-cream-50 p-4">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <label className="block text-sm font-bold text-gray-800">Mensagem de primeira aula</label>
                    <p className="mt-1 text-xs text-gray-500">Edite o texto e envie pelo WhatsApp do aluno.</p>
                  </div>
                  <a
                    href={getWhatsappUrl(form) || undefined}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-white ${
                      cleanWhatsapp(form.whatsapp) ? 'bg-emerald-600 hover:bg-emerald-700' : 'pointer-events-none bg-gray-300'
                    }`}
                  >
                    <Send size={16} />
                    Enviar previa
                  </a>
                </div>
                <textarea
                  value={form.mensagemPrimeiraAula || getPrimeiraAulaMessage(form)}
                  onChange={(event) => setForm({ ...form, mensagemPrimeiraAula: event.target.value })}
                  className={textareaClass}
                />
              </div>

              <div className="flex gap-3 border-t border-cream-200 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-lg border border-cream-200 py-3 font-semibold text-gray-700 hover:bg-cream-50">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 rounded-lg bg-primary-800 py-3 font-bold text-white hover:bg-primary-900">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function ResumoCard({ label, value }) {
  return (
    <div className="rounded-lg bg-cream-50 px-3 py-3 sm:px-4">
      <p className="truncate font-bold text-primary-800">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}
