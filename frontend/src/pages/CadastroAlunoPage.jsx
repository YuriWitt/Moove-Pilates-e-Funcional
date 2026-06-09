import { useEffect, useRef, useState } from 'react'
import { Camera, Check, Fingerprint, Printer, RotateCcw, Save, Trash2, X } from 'lucide-react'

const sublogoUrl = `${import.meta.env.BASE_URL}brand/sublogo.jpg`

const initialForm = {
  nomeCompleto: '',
  dataNascimento: '',
  sexo: '',
  idade: '',
  profissao: '',
  estadoCivil: '',
  endereco: '',
  bairro: '',
  cidade: '',
  numero: '',
  cep: '',
  estado: '',
  telefone: '',
  email: '',
  objetivo: '',
  qp: '',
  hda: '',
  hpp: '',
  gestacoes: '',
  filhos: '',
  alergias: '',
  procedimentoCirurgico: '',
  cigarrosDia: '',
  parouFumarHa: '',
  habitosAlimentares: '',
  transitoIntestinal: '',
  consumoAgua: '',
  atividadeFisica: '',
  atividadeQualFrequencia: '',
  peso: '',
  altura: '',
  circunferenciaAbdominal: '',
  mobilidadeFlexibilidade: '',
  dataAvaliacao: '',
  dataInicio: '',
  quantSemana: '',
  planoTerapeutico: '',
  doencas: {},
  postural: {},
}

const diseaseGroups = [
  ['Labirintite', 'labirintite'],
  ['Depressão', 'depressao'],
  ['Ansiedade', 'ansiedade'],
  ['Obesidade', 'obesidade'],
  ['Anorexia', 'anorexia'],
  ['Doença cardíaca', 'doencaCardiaca'],
  ['HAS', 'has'],
  ['Diabetes', 'diabetes'],
  ['Bronquite asmática', 'bronquiteAsmatica'],
]

const posturalGroups = [
  { label: 'Cabeça', key: 'cabeca', options: ['Alinhada', 'Inclinada', 'Rodada', 'Anteriorizada', 'Retraída'] },
  { label: 'Ombros', key: 'ombros', options: ['Alinhado', 'Elevado', 'Anteriorizado', 'Retraído'] },
  { label: 'Escápulas', key: 'escapulas', options: ['Alinhada', 'Alada', 'Elevada', 'Aduzida', 'Abduzida'] },
  { label: 'Caída MMSS', key: 'caidaMmss', options: ['1/3 médio coxa', '1/3 ant. coxa', '1/3 post. coxa', 'À frente coxa'] },
  { label: 'Abdômen', key: 'abdomen', options: ['Normal', 'Protuso', 'Diástase'] },
  { label: 'Coluna vertebral', key: 'coluna', options: ['Alinhada', 'Escoliótica'] },
  { label: 'Cervical', key: 'cervical', options: ['Normal', 'Retificada', 'Hiperlordose'] },
  { label: 'Torácica', key: 'toracica', options: ['Normal', 'Retificada', 'Hipercifose'] },
  { label: 'Lombar', key: 'lombar', options: ['Normal', 'Retificada', 'Hiperlordose'] },
  { label: 'Quadril', key: 'quadril', options: ['Alinhado', 'Anteversão', 'Retroversão', 'Elevado', 'Rotação'] },
  { label: 'Joelhos', key: 'joelhos', options: ['Valgo', 'Varo', 'Hiperextensão', 'Flexo', 'Elevado'] },
  { label: 'Patela', key: 'patela', options: ['Lateralizada', 'Medializada'] },
  { label: 'Tornozelo (pés)', key: 'tornozelo', options: ['Valgo', 'Varo', 'Plano', 'Cavo', 'Aduto', 'Abduto'] },
]

const fieldClass = 'min-w-0 flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-1 text-sm text-gray-900 outline-none transition-colors focus:border-gold-600'
const textareaClass = 'min-h-24 w-full resize-y rounded-lg border border-cream-200 bg-white/70 p-3 text-sm text-gray-900 outline-none transition-colors focus:border-gold-600'

export default function CadastroAlunoPage() {
  const [formData, setFormData] = useState(initialForm)
  const [saved, setSaved] = useState(false)
  const [fotoFacial, setFotoFacial] = useState(null)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const [faceDetected, setFaceDetected] = useState(false)
  const [digitalCadastrada, setDigitalCadastrada] = useState(false)
  const [capturandoDigital, setCapturandoDigital] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    return () => stopCamera()
  }, [])

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const updateField = (field, value) => {
    setSaved(false)
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const setExclusive = (group, key, value) => {
    setSaved(false)
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: prev[group]?.[key] === value ? '' : value,
      },
    }))
  }

  const togglePostural = (key, option) => {
    setSaved(false)
    setFormData((prev) => {
      const current = prev.postural[key] || []
      const next = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]

      return {
        ...prev,
        postural: {
          ...prev.postural,
          [key]: next,
        },
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSaved(true)
  }

  const handleReset = () => {
    stopCamera()
    setFormData(initialForm)
    setFotoFacial(null)
    setShowCamera(false)
    setCameraError('')
    setFaceDetected(false)
    setDigitalCadastrada(false)
    setCapturandoDigital(false)
    setSaved(false)
  }

  const handleStartCamera = async () => {
    setCameraError('')

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Câmera não disponível neste navegador.')
      return
    }

    setShowCamera(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 960 }, height: { ideal: 720 } },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      setCameraError(`Não foi possível acessar a câmera: ${error.message}`)
      setShowCamera(false)
    }
  }

  const handleCapturarFoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const context = canvasRef.current.getContext('2d')
    context.drawImage(videoRef.current, 0, 0, 360, 270)
    setFotoFacial(canvasRef.current.toDataURL('image/jpeg'))
    setFaceDetected(false)
    setTimeout(() => setFaceDetected(true), 350)
    stopCamera()
    setShowCamera(false)
    setSaved(false)
  }

  const handleRemoverFoto = () => {
    setFotoFacial(null)
    setFaceDetected(false)
    setSaved(false)
  }

  const handleCapturarDigital = () => {
    setCapturandoDigital(true)
    setDigitalCadastrada(false)
    setTimeout(() => {
      setCapturandoDigital(false)
      setDigitalCadastrada(true)
      setSaved(false)
    }, 900)
  }

  return (
    <div className="brand-surface min-h-full p-4 sm:p-6 lg:p-8">
      <div className="no-print mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">Alunos</p>
          <h1 className="mt-2 text-2xl font-bold text-primary-800 sm:text-3xl lg:text-4xl">Ficha de cadastro</h1>
          <p className="mt-2 text-gray-600">Anamnese para Pilates, avaliação postural e plano terapêutico.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 rounded-lg border border-cream-200 bg-white px-4 py-2 text-sm font-semibold text-primary-800 hover:bg-cream-50"
          >
            <Printer size={17} />
            Imprimir
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 rounded-lg border border-cream-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-cream-50"
          >
            <RotateCcw size={17} />
            Limpar
          </button>
        </div>
      </div>

      {saved && (
        <div className="no-print mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <Check size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Ficha salva no protótipo.</p>
            <p className="text-sm">Os dados permanecem preenchidos para revisão ou impressão.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-6">
        <section className="sheet-page relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm sm:p-7 lg:p-9">
          <Watermark />
          <div className="relative">
            <div className="mb-6 flex justify-center">
              <div className="rounded-2xl bg-[#c8afd5] px-8 py-4 text-center text-2xl font-bold leading-tight text-white shadow-sm sm:text-3xl">
                Ficha de Anamnese<br className="hidden sm:block" /> para Pilates
              </div>
            </div>

            <SectionTitle>Identificação Pessoal</SectionTitle>
            <div className="space-y-2 text-sm text-gray-700">
              <LineInput label="Nome completo" value={formData.nomeCompleto} onChange={(value) => updateField('nomeCompleto', value)} wide />
              <div className="grid gap-2 md:grid-cols-[1fr_160px_120px]">
                <LineInput label="Data de nascimento" value={formData.dataNascimento} onChange={(value) => updateField('dataNascimento', value)} />
                <InlineChoice label="Sexo" value={formData.sexo} options={['F', 'M']} onChange={(value) => updateField('sexo', value)} />
                <LineInput label="Idade" value={formData.idade} onChange={(value) => updateField('idade', value)} />
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <LineInput label="Profissão" value={formData.profissao} onChange={(value) => updateField('profissao', value)} />
                <LineInput label="Estado Civil" value={formData.estadoCivil} onChange={(value) => updateField('estadoCivil', value)} />
              </div>
              <LineInput label="Endereço" value={formData.endereco} onChange={(value) => updateField('endereco', value)} wide />
              <div className="grid gap-2 md:grid-cols-[1fr_1fr_100px]">
                <LineInput label="Bairro" value={formData.bairro} onChange={(value) => updateField('bairro', value)} />
                <LineInput label="Cidade" value={formData.cidade} onChange={(value) => updateField('cidade', value)} />
                <LineInput label="Nº" value={formData.numero} onChange={(value) => updateField('numero', value)} />
              </div>
              <div className="grid gap-2 md:grid-cols-3">
                <LineInput label="CEP" value={formData.cep} onChange={(value) => updateField('cep', value)} />
                <LineInput label="Estado" value={formData.estado} onChange={(value) => updateField('estado', value)} />
                <LineInput label="Telefone" value={formData.telefone} onChange={(value) => updateField('telefone', value)} />
              </div>
              <LineInput label="E-mail" value={formData.email} onChange={(value) => updateField('email', value)} wide />
            </div>

            <Divider />

            <SectionTitle>Cadastro Facial e Digital</SectionTitle>
            <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
              <div className="rounded-xl border border-[#c8afd5]/50 bg-white/75 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-gray-700">Reconhecimento facial</p>
                    <p className="text-xs text-gray-500">Capture uma foto para vincular ao cadastro do aluno.</p>
                  </div>
                  <Camera size={22} className="text-[#a985bb]" />
                </div>

                {!showCamera && !fotoFacial && (
                  <button
                    type="button"
                    onClick={handleStartCamera}
                    className="no-print flex h-40 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#c8afd5] bg-[#f7f0fa] text-sm font-semibold text-primary-800 transition-colors hover:bg-[#efe1f4]"
                  >
                    <Camera size={34} className="mb-2 text-[#a985bb]" />
                    Iniciar câmera
                  </button>
                )}

                {showCamera && (
                  <div className="space-y-3">
                    <video ref={videoRef} autoPlay className="h-48 w-full rounded-lg bg-black object-cover" />
                    <canvas ref={canvasRef} className="hidden" width="360" height="270" />
                    <div className="no-print grid grid-cols-[1fr_auto] gap-2">
                      <button type="button" onClick={handleCapturarFoto} className="rounded-lg bg-primary-800 px-4 py-2 text-sm font-bold text-white hover:bg-primary-900">
                        Capturar foto
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          stopCamera()
                          setShowCamera(false)
                        }}
                        className="rounded-lg border border-cream-200 px-3 py-2 text-gray-700 hover:bg-cream-50"
                        title="Cancelar câmera"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {fotoFacial && (
                  <div className="space-y-3">
                    <img src={fotoFacial} alt="Foto facial capturada" className="h-48 w-full rounded-lg object-cover" />
                    <button type="button" onClick={handleRemoverFoto} className="no-print flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2 text-sm font-bold text-red-700 hover:bg-red-50">
                      <Trash2 size={17} />
                      Recapturar foto
                    </button>
                  </div>
                )}

                {cameraError && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{cameraError}</p>}
              </div>

              <div className="rounded-xl border border-[#c8afd5]/50 bg-white/75 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-gray-700">Biometria digital</p>
                    <p className="text-xs text-gray-500">Registre a digital do aluno no sistema.</p>
                  </div>
                  <Fingerprint size={24} className="text-[#a985bb]" />
                </div>

                <button
                  type="button"
                  onClick={handleCapturarDigital}
                  disabled={capturandoDigital}
                  className="no-print flex h-40 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#c8afd5] bg-[#f7f0fa] text-sm font-semibold text-primary-800 transition-colors hover:bg-[#efe1f4] disabled:cursor-wait disabled:opacity-70"
                >
                  <Fingerprint size={42} className="mb-2 text-[#a985bb]" />
                  {capturandoDigital ? 'Lendo digital...' : digitalCadastrada ? 'Cadastrar novamente' : 'Capturar digital'}
                </button>

                <div className="mt-4 space-y-2 text-sm">
                  <BiometricStatus label="Foto facial" active={Boolean(fotoFacial)} />
                  <BiometricStatus label="Rosto detectado" active={faceDetected} />
                  <BiometricStatus label="Digital cadastrada" active={digitalCadastrada} />
                </div>
              </div>
            </div>

            <Divider />

            <SectionTitle>Anamnese</SectionTitle>
            <div className="space-y-3">
              <LineInput label="Objetivo" value={formData.objetivo} onChange={(value) => updateField('objetivo', value)} wide />
              <LinedTextarea label="QP" value={formData.qp} onChange={(value) => updateField('qp', value)} />
              <LinedTextarea label="HDA" value={formData.hda} onChange={(value) => updateField('hda', value)} />
              <LinedTextarea label="HPP" value={formData.hpp} onChange={(value) => updateField('hpp', value)} />
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-bold text-gray-600">Doenças Associadas:</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {diseaseGroups.map(([label, key]) => (
                  <YesNoChoice
                    key={key}
                    label={label}
                    value={formData.doencas[key] || ''}
                    onChange={(value) => setExclusive('doencas', key, value)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="grid gap-3 md:grid-cols-3">
                <LineInput label="Nº de gestações" value={formData.gestacoes} onChange={(value) => updateField('gestacoes', value)} />
                <LineInput label="Nº filhos" value={formData.filhos} onChange={(value) => updateField('filhos', value)} />
                <LineInput label="Alergias" value={formData.alergias} onChange={(value) => updateField('alergias', value)} />
              </div>
              <LineInput label="Procedimentos cirúrgico/tempo" value={formData.procedimentoCirurgico} onChange={(value) => updateField('procedimentoCirurgico', value)} wide />
              <div className="grid gap-3 md:grid-cols-[170px_1fr_1fr]">
                <InlineChoice label="Tabagista" value={formData.tabagista} options={['S', 'N']} onChange={(value) => updateField('tabagista', value)} />
                <LineInput label="Nº de cigarros/dia" value={formData.cigarrosDia} onChange={(value) => updateField('cigarrosDia', value)} />
                <LineInput label="Parou de fumar há" value={formData.parouFumarHa} onChange={(value) => updateField('parouFumarHa', value)} />
              </div>
              <LineInput label="Hábitos Alimentares" value={formData.habitosAlimentares} onChange={(value) => updateField('habitosAlimentares', value)} wide />
              <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
                <InlineChoice label="Trânsito intestinal" value={formData.transitoIntestinal} options={['Regular', 'Irregular']} onChange={(value) => updateField('transitoIntestinal', value)} />
                <LineInput label="Consumo de água/dia" value={formData.consumoAgua} onChange={(value) => updateField('consumoAgua', value)} />
              </div>
              <div className="grid gap-3 md:grid-cols-[190px_1fr]">
                <InlineChoice label="Atividade Física" value={formData.atividadeFisica} options={['S', 'N']} onChange={(value) => updateField('atividadeFisica', value)} />
                <LineInput label="Qual / frequência" value={formData.atividadeQualFrequencia} onChange={(value) => updateField('atividadeQualFrequencia', value)} />
              </div>
            </div>
          </div>
        </section>

        <section className="sheet-page relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm sm:p-7 lg:p-9">
          <Watermark />
          <div className="relative">
            <SectionTitle>Exame Físico</SectionTitle>
            <div className="grid gap-3 md:grid-cols-2">
              <LineInput label="Peso" value={formData.peso} onChange={(value) => updateField('peso', value)} />
              <LineInput label="Altura" value={formData.altura} onChange={(value) => updateField('altura', value)} />
            </div>
            <LineInput label="Circunferência Abdominal" value={formData.circunferenciaAbdominal} onChange={(value) => updateField('circunferenciaAbdominal', value)} wide />

            <Divider />

            <SectionTitle>Avaliação Postural</SectionTitle>
            <div className="space-y-2">
              {posturalGroups.map((group) => (
                <PosturalRow
                  key={group.key}
                  label={group.label}
                  options={group.options}
                  values={formData.postural[group.key] || []}
                  onToggle={(option) => togglePostural(group.key, option)}
                />
              ))}
            </div>

            <Divider />

            <SectionTitle>Mobilidade e Flexibilidade</SectionTitle>
            <textarea
              value={formData.mobilidadeFlexibilidade}
              onChange={(event) => updateField('mobilidadeFlexibilidade', event.target.value)}
              className={`${textareaClass} min-h-32`}
              aria-label="Mobilidade e flexibilidade"
            />

            <Divider />

            <SectionTitle>Plano Terapêutico</SectionTitle>
            <div className="grid gap-3 md:grid-cols-3">
              <LineInput label="Data avaliação" value={formData.dataAvaliacao} onChange={(value) => updateField('dataAvaliacao', value)} />
              <LineInput label="Data início" value={formData.dataInicio} onChange={(value) => updateField('dataInicio', value)} />
              <LineInput label="Quant. X Semana" value={formData.quantSemana} onChange={(value) => updateField('quantSemana', value)} />
            </div>
            <textarea
              value={formData.planoTerapeutico}
              onChange={(event) => updateField('planoTerapeutico', event.target.value)}
              className={`${textareaClass} mt-4 min-h-40`}
              aria-label="Plano terapêutico"
            />
          </div>
        </section>

        <div className="no-print sticky bottom-20 z-20 flex justify-end md:bottom-4">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-800 px-5 py-3 font-bold text-white shadow-lg shadow-primary-900/20 transition-colors hover:bg-primary-900 sm:w-auto"
          >
            <Save size={20} />
            Salvar ficha
          </button>
        </div>
      </form>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 className="mb-3 inline-flex rounded-md bg-[#c8afd5] px-3 py-1 text-sm font-bold uppercase tracking-wide text-white">
      {children}
    </h2>
  )
}

function Divider() {
  return <div className="my-6 h-px bg-[#c8afd5]/70" />
}

function LineInput({ label, value, onChange, wide = false }) {
  return (
    <label className={`flex min-w-0 items-end gap-2 ${wide ? 'w-full' : ''}`}>
      <span className="shrink-0 text-sm font-semibold text-gray-600">{label}:</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className={fieldClass} />
    </label>
  )
}

function LinedTextarea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-gray-600">{label}:</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} className={textareaClass} />
    </label>
  )
}

function InlineChoice({ label, value, options, onChange }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-sm font-semibold text-gray-600">{label}:</span>
      {options.map((option) => (
        <CheckboxLike key={option} checked={value === option} onClick={() => onChange(value === option ? '' : option)}>
          {option}
        </CheckboxLike>
      ))}
    </div>
  )
}

function YesNoChoice({ label, value, onChange }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-sm">
      <span className="min-w-0 flex-1 font-semibold text-gray-600">{label}:</span>
      <CheckboxLike checked={value === 'S'} onClick={() => onChange('S')}>S</CheckboxLike>
      <CheckboxLike checked={value === 'N'} onClick={() => onChange('N')}>N</CheckboxLike>
    </div>
  )
}

function PosturalRow({ label, options, values, onToggle }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
      <span className="font-bold text-gray-600">{label}:</span>
      {options.map((option) => (
        <CheckboxLike key={option} checked={values.includes(option)} onClick={() => onToggle(option)}>
          {option}
        </CheckboxLike>
      ))}
    </div>
  )
}

function BiometricStatus({ label, active }) {
  return (
    <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${active ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-cream-200 bg-white text-gray-500'}`}>
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${active ? 'bg-emerald-600 text-white' : 'bg-cream-200 text-gray-500'}`}>
        {active ? <Check size={13} /> : '-'}
      </span>
      <span className="font-semibold">{label}</span>
    </div>
  )
}

function CheckboxLike({ checked, onClick, children }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-w-0 items-center gap-1 text-left text-sm text-gray-600">
      <span className={`h-3.5 w-3.5 shrink-0 rounded-[3px] border border-[#c8afd5] ${checked ? 'bg-[#c8afd5]' : 'bg-[#d9c5e1]'}`} />
      <span className="min-w-0">{children}</span>
    </button>
  )
}

function Watermark() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]">
      <img src={sublogoUrl} alt="" className="h-[72%] max-h-[560px] w-auto rotate-[-18deg] rounded-full object-cover" />
    </div>
  )
}
