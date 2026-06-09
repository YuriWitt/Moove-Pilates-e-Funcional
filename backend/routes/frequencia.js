import express from 'express'
import database from '../database.js'

const router = express.Router()

// GET - Listar frequência de um aluno
router.get('/aluno/:alunoId', async (req, res) => {
  try {
    const frequencia = await database.all(
      `SELECT f.*, a.nome as alunoNome, au.nome as aulaNome
       FROM frequencia f
       JOIN alunos a ON f.alunoId = a.id
       JOIN aulas au ON f.aulaId = au.id
       WHERE f.alunoId = ?
       ORDER BY f.datPresenca DESC`,
      [req.params.alunoId]
    )
    res.json(frequencia)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET - Estatísticas de frequência
router.get('/stats/:alunoId', async (req, res) => {
  try {
    const stats = await database.get(
      `SELECT
        COUNT(*) as totalAulas,
        SUM(CASE WHEN presente = 1 THEN 1 ELSE 0 END) as presentes,
        SUM(CASE WHEN presente = 0 THEN 1 ELSE 0 END) as faltas,
        ROUND(SUM(CASE WHEN presente = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) as taxaPresenca
      FROM frequencia
      WHERE alunoId = ?`,
      [req.params.alunoId]
    )
    res.json(stats)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST - Registrar frequência
router.post('/', async (req, res) => {
  try {
    const { alunoId, aulaId, presente } = req.body

    if (!alunoId || !aulaId) {
      return res.status(400).json({ error: 'alunoId e aulaId são obrigatórios' })
    }

    const sql = `
      INSERT INTO frequencia (alunoId, aulaId, datPresenca, presente)
      VALUES (?, ?, DATE('now'), ?)
    `

    const result = await database.run(sql, [alunoId, aulaId, presente ? 1 : 0])

    res.status(201).json({
      id: result.lastID,
      message: 'Frequência registrada com sucesso'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT - Atualizar frequência
router.put('/:id', async (req, res) => {
  try {
    const { presente } = req.body

    await database.run('UPDATE frequencia SET presente = ? WHERE id = ?', [presente ? 1 : 0, req.params.id])

    res.json({ message: 'Frequência atualizada com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
