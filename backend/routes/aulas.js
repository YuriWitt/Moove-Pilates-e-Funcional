import express from 'express'
import database from '../database.js'

const router = express.Router()

// GET - Listar todas as aulas
router.get('/', async (req, res) => {
  try {
    const aulas = await database.all('SELECT * FROM aulas')
    res.json(aulas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET - Buscar aula por ID
router.get('/:id', async (req, res) => {
  try {
    const aula = await database.get('SELECT * FROM aulas WHERE id = ?', [req.params.id])
    if (aula) {
      res.json(aula)
    } else {
      res.status(404).json({ error: 'Aula não encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST - Criar nova aula
router.post('/', async (req, res) => {
  try {
    const { nome, horario, professor, local, capacidade } = req.body

    if (!nome || !horario || !professor || !local) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    const sql = `
      INSERT INTO aulas (nome, horario, professor, local, capacidade)
      VALUES (?, ?, ?, ?, ?)
    `

    const result = await database.run(sql, [nome, horario, professor, local, capacidade || 15])

    res.status(201).json({
      id: result.lastID,
      message: 'Aula agendada com sucesso'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT - Atualizar aula
router.put('/:id', async (req, res) => {
  try {
    const { nome, horario, professor, local, capacidade } = req.body

    const sql = `
      UPDATE aulas
      SET nome = ?, horario = ?, professor = ?, local = ?, capacidade = ?
      WHERE id = ?
    `

    await database.run(sql, [nome, horario, professor, local, capacidade, req.params.id])

    res.json({ message: 'Aula atualizada com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE - Deletar aula
router.delete('/:id', async (req, res) => {
  try {
    await database.run('DELETE FROM aulas WHERE id = ?', [req.params.id])
    res.json({ message: 'Aula deletada com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
