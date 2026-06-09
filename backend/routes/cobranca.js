import express from 'express'
import database from '../database.js'

const router = express.Router()

// GET - Listar cobrânças
router.get('/', async (req, res) => {
  try {
    const cobrancas = await database.all(
      `SELECT c.*, a.nome, a.telefone
       FROM cobranca c
       JOIN alunos a ON c.alunoId = a.id
       ORDER BY c.vencimento ASC`
    )
    res.json(cobrancas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET - Cobrânças de um aluno
router.get('/aluno/:alunoId', async (req, res) => {
  try {
    const cobrancas = await database.all(
      `SELECT * FROM cobranca WHERE alunoId = ? ORDER BY vencimento DESC`,
      [req.params.alunoId]
    )
    res.json(cobrancas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST - Criar cobrança
router.post('/', async (req, res) => {
  try {
    const { alunoId, valor, vencimento } = req.body

    if (!alunoId || !valor || !vencimento) {
      return res.status(400).json({ error: 'alunoId, valor e vencimento são obrigatórios' })
    }

    const sql = `
      INSERT INTO cobranca (alunoId, valor, vencimento, status)
      VALUES (?, ?, ?, 'pendente')
    `

    const result = await database.run(sql, [alunoId, valor, vencimento])

    res.status(201).json({
      id: result.lastID,
      message: 'Cobrança criada com sucesso'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST - Enviar cobrança via WhatsApp
router.post('/enviar', async (req, res) => {
  try {
    const { alunoIds, mensagem } = req.body

    if (!alunoIds || !Array.isArray(alunoIds) || alunoIds.length === 0) {
      return res.status(400).json({ error: 'alunoIds deve ser um array não vazio' })
    }

    if (!mensagem) {
      return res.status(400).json({ error: 'mensagem é obrigatória' })
    }

    const resultados = []

    for (const alunoId of alunoIds) {
      try {
        const aluno = await database.get('SELECT * FROM alunos WHERE id = ?', [alunoId])
        const cobranca = await database.get(
          'SELECT * FROM cobranca WHERE alunoId = ? AND status = "pendente" LIMIT 1',
          [alunoId]
        )

        if (!aluno || !cobranca) {
          resultados.push({
            alunoId,
            sucesso: false,
            erro: 'Aluno ou cobrança não encontrado'
          })
          continue
        }

        // Aqui você integraria com a API real do WhatsApp (Twilio, etc)
        // Por enquanto, apenas simulamos o envio
        const mensagemPersonalizada = mensagem
          .replace('{NOME}', aluno.nome)
          .replace('{VALOR}', `R$ ${cobranca.valor.toFixed(2)}`)
          .replace('{DATA}', cobranca.vencimento)

        // Simulação: atualizar data da última mensagem
        await database.run(
          'UPDATE cobranca SET ultimaMensagem = DATE("now") WHERE id = ?',
          [cobranca.id]
        )

        console.log(`📱 WhatsApp enviado para ${aluno.telefone}:`, mensagemPersonalizada)

        resultados.push({
          alunoId,
          aluno: aluno.nome,
          telefone: aluno.telefone,
          sucesso: true,
          mensagem: 'Mensagem enviada com sucesso'
        })
      } catch (err) {
        resultados.push({
          alunoId,
          sucesso: false,
          erro: err.message
        })
      }
    }

    res.json({
      message: `${resultados.filter(r => r.sucesso).length} mensagens enviadas com sucesso`,
      resultados
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT - Registrar pagamento
router.put('/:id/pagar', async (req, res) => {
  try {
    const sql = `
      UPDATE cobranca
      SET status = 'pago', dataPagamento = DATE('now')
      WHERE id = ?
    `

    await database.run(sql, [req.params.id])

    res.json({ message: 'Pagamento registrado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET - Relatório de cobranças
router.get('/relatorio/geral', async (req, res) => {
  try {
    const relatorio = await database.get(
      `SELECT
        COUNT(*) as totalCobrancas,
        SUM(CASE WHEN status = 'pago' THEN valor ELSE 0 END) as totalPago,
        SUM(CASE WHEN status = 'pendente' THEN valor ELSE 0 END) as totalPendente,
        SUM(CASE WHEN status = 'vencido' THEN valor ELSE 0 END) as totalVencido,
        SUM(valor) as totalGeral
      FROM cobranca`
    )
    res.json(relatorio)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
