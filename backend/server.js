import express from 'express'
import cors from 'cors'
import database from './database.js'
import alunosRoutes from './routes/alunos.js'
import aulasRoutes from './routes/aulas.js'
import frequenciaRoutes from './routes/frequencia.js'
import cobrancaRoutes from './routes/cobranca.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Inicializa banco de dados
database.init()

// Rotas
app.use('/api/alunos', alunosRoutes)
app.use('/api/aulas', aulasRoutes)
app.use('/api/frequencia', frequenciaRoutes)
app.use('/api/cobranca', cobrancaRoutes)

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor rodando com sucesso!' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
  console.log(`📱 MOOVE - Academia de Pilates e Funcional`)
})

export default app
