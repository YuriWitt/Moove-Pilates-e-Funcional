import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, 'moove.db')

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err)
  } else {
    console.log('✓ Conectado ao banco de dados SQLite')
  }
})

const database = {
  init: function () {
    // Tabela de Alunos
    db.run(`
      CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE,
        telefone TEXT NOT NULL,
        cpf TEXT UNIQUE NOT NULL,
        endereco TEXT,
        dataNascimento DATE,
        foto BLOB,
        dataFacial BLOB,
        plano TEXT DEFAULT 'mensal',
        dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
        ativo BOOLEAN DEFAULT 1
      )
    `)

    // Tabela de Aulas
    db.run(`
      CREATE TABLE IF NOT EXISTS aulas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        horario TIME NOT NULL,
        professor TEXT NOT NULL,
        local TEXT NOT NULL,
        capacidade INTEGER DEFAULT 15,
        dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabela de Frequência
    db.run(`
      CREATE TABLE IF NOT EXISTS frequencia (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alunoId INTEGER NOT NULL,
        aulaId INTEGER NOT NULL,
        datPresenca DATE NOT NULL,
        presente BOOLEAN DEFAULT 0,
        FOREIGN KEY (alunoId) REFERENCES alunos(id),
        FOREIGN KEY (aulaId) REFERENCES aulas(id)
      )
    `)

    // Tabela de Cobrança
    db.run(`
      CREATE TABLE IF NOT EXISTS cobranca (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alunoId INTEGER NOT NULL,
        valor REAL NOT NULL,
        vencimento DATE NOT NULL,
        dataPagamento DATE,
        status TEXT DEFAULT 'pendente',
        ultimaMensagem DATE,
        FOREIGN KEY (alunoId) REFERENCES alunos(id)
      )
    `)

    console.log('✓ Tabelas do banco de dados criadas')
  },

  run: function (sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err)
        else resolve(this)
      })
    })
  },

  get: function (sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err)
        else resolve(row)
      })
    })
  },

  all: function (sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  },

  close: function () {
    return new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }
}

export default database
