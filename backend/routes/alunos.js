import express from 'express'
import database from '../database.js'

const router = express.Router()

// GET - Listar todos os alunos
router.get('/', async (req, res) => {
  try {
    const alunos = await database.all('SELECT * FROM alunos WHERE ativo = 1')
    res.json(alunos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET - Buscar aluno por ID
router.get('/:id', async (req, res) => {
  try {
    const aluno = await database.get('SELECT * FROM alunos WHERE id = ?', [req.params.id])
    if (aluno) {
      res.json(aluno)
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST - Criar novo aluno
router.post('/', async (req, res) => {
  try {
    const { nome, email, telefone, cpf, endereco, dataNascimento, plano } = req.body

    // Validação
    if (!nome || !telefone || !cpf) {
      return res.status(400).json({ error: 'Nome, telefone e CPF são obrigatórios' })
    }

    const sql = `
      INSERT INTO alunos (nome, email, telefone, cpf, endereco, dataNascimento, plano)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    const result = await database.run(sql, [nome, email, telefone, cpf, endereco, dataNascimento, plano])

    res.status(201).json({
      id: result.lastID,
      message: 'Aluno cadastrado com sucesso'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT - Atualizar aluno
router.put('/:id', async (req, res) => {
  try {
    const { nome, email, telefone, cpf, endereco, dataNascimento, plano } = req.body

    const sql = `
      UPDATE alunos
      SET nome = ?, email = ?, telefone = ?, cpf = ?, endereco = ?, dataNascimento = ?, plano = ?
      WHERE id = ?
    `

    await database.run(sql, [nome, email, telefone, cpf, endereco, dataNascimento, plano, req.params.id])

    res.json({ message: 'Aluno atualizado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE - Desativar aluno
router.delete('/:id', async (req, res) => {
  try {
    await database.run('UPDATE alunos SET ativo = 0 WHERE id = ?', [req.params.id])
    res.json({ message: 'Aluno desativado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
