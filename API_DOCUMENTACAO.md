# 📡 API Backend - Documentação Completa

## Base URL
```
http://localhost:5000/api
```

---

## 🔑 Endpoints de Autenticação

### Health Check
```
GET /health
```

**Resposta:**
```json
{
  "status": "OK",
  "message": "Servidor rodando com sucesso!"
}
```

---

## 👥 Alunos (CRUD)

### Listar todos os alunos
```
GET /alunos
```

**Resposta (200):**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "(11) 99999-1111",
    "cpf": "123.456.789-00",
    "endereco": "Rua A, 123",
    "dataNascimento": "1990-05-15",
    "plano": "mensal",
    "ativo": 1,
    "dataCadastro": "2026-06-08T10:00:00Z"
  }
]
```

---

### Buscar aluno específico
```
GET /alunos/:id
```

**Exemplo:**
```
GET /alunos/1
```

**Resposta (200):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-1111",
  "cpf": "123.456.789-00",
  "endereco": "Rua A, 123",
  "dataNascimento": "1990-05-15",
  "plano": "mensal",
  "ativo": 1
}
```

---

### Criar novo aluno
```
POST /alunos
Content-Type: application/json
```

**Body:**
```json
{
  "nome": "Maria Santos",
  "email": "maria@email.com",
  "telefone": "(11) 99999-2222",
  "cpf": "987.654.321-11",
  "endereco": "Rua B, 456",
  "dataNascimento": "1995-03-20",
  "plano": "trimestral"
}
```

**Resposta (201):**
```json
{
  "id": 2,
  "message": "Aluno cadastrado com sucesso"
}
```

---

### Atualizar aluno
```
PUT /alunos/:id
Content-Type: application/json
```

**Body:**
```json
{
  "nome": "Maria Santos Silva",
  "email": "maria.silva@email.com",
  "telefone": "(11) 99999-2222",
  "cpf": "987.654.321-11",
  "endereco": "Rua B, 789",
  "dataNascimento": "1995-03-20",
  "plano": "semestral"
}
```

**Resposta (200):**
```json
{
  "message": "Aluno atualizado com sucesso"
}
```

---

### Deletar (desativar) aluno
```
DELETE /alunos/:id
```

**Resposta (200):**
```json
{
  "message": "Aluno desativado com sucesso"
}
```

---

## 📚 Aulas

### Listar todas as aulas
```
GET /aulas
```

**Resposta (200):**
```json
[
  {
    "id": 1,
    "nome": "Pilates Matutino",
    "horario": "09:00",
    "professor": "Ana Silva",
    "local": "Sala A",
    "capacidade": 15,
    "dataCriacao": "2026-06-08T10:00:00Z"
  }
]
```

---

### Criar nova aula
```
POST /aulas
Content-Type: application/json
```

**Body:**
```json
{
  "nome": "Funcional Avançado",
  "horario": "18:00",
  "professor": "Carlos Ferreira",
  "local": "Sala C",
  "capacidade": 12
}
```

**Resposta (201):**
```json
{
  "id": 5,
  "message": "Aula agendada com sucesso"
}
```

---

### Atualizar aula
```
PUT /aulas/:id
Content-Type: application/json
```

**Body:**
```json
{
  "nome": "Funcional Avançado",
  "horario": "18:30",
  "professor": "Carlos Ferreira",
  "local": "Sala C",
  "capacidade": 14
}
```

---

### Deletar aula
```
DELETE /aulas/:id
```

---

## ✔️ Frequência

### Listar frequência de um aluno
```
GET /frequencia/aluno/:alunoId
```

**Resposta (200):**
```json
[
  {
    "id": 1,
    "alunoId": 1,
    "aulaId": 1,
    "datPresenca": "2026-06-08",
    "presente": 1,
    "alunoNome": "João Silva",
    "aulaNome": "Pilates Matutino"
  }
]
```

---

### Estatísticas de frequência
```
GET /frequencia/stats/:alunoId
```

**Resposta (200):**
```json
{
  "totalAulas": 12,
  "presentes": 10,
  "faltas": 2,
  "taxaPresenca": 83.3
}
```

---

### Registrar frequência
```
POST /frequencia
Content-Type: application/json
```

**Body:**
```json
{
  "alunoId": 1,
  "aulaId": 1,
  "presente": true
}
```

**Resposta (201):**
```json
{
  "id": 15,
  "message": "Frequência registrada com sucesso"
}
```

---

### Atualizar frequência
```
PUT /frequencia/:id
Content-Type: application/json
```

**Body:**
```json
{
  "presente": false
}
```

---

## 💰 Cobrança

### Listar todas as cobranças
```
GET /cobranca
```

**Resposta (200):**
```json
[
  {
    "id": 1,
    "alunoId": 1,
    "valor": 150.00,
    "vencimento": "2026-06-30",
    "dataPagamento": null,
    "status": "pendente",
    "ultimaMensagem": null,
    "nome": "João Silva",
    "telefone": "(11) 99999-1111"
  }
]
```

---

### Cobranças de um aluno
```
GET /cobranca/aluno/:alunoId
```

---

### Criar cobrança
```
POST /cobranca
Content-Type: application/json
```

**Body:**
```json
{
  "alunoId": 1,
  "valor": 150.00,
  "vencimento": "2026-07-30"
}
```

**Resposta (201):**
```json
{
  "id": 5,
  "message": "Cobrança criada com sucesso"
}
```

---

### 🔥 Enviar Cobrança via WhatsApp
```
POST /cobranca/enviar
Content-Type: application/json
```

**Body:**
```json
{
  "alunoIds": [1, 2, 3],
  "mensagem": "Olá {NOME}, sua mensalidade de R$ {VALOR} vence em {DATA}. Por favor, realize o pagamento. Obrigado! 💪"
}
```

**Resposta (200):**
```json
{
  "message": "3 mensagens enviadas com sucesso",
  "resultados": [
    {
      "alunoId": 1,
      "aluno": "João Silva",
      "telefone": "(11) 99999-1111",
      "sucesso": true,
      "mensagem": "Mensagem enviada com sucesso"
    },
    {
      "alunoId": 2,
      "aluno": "Maria Santos",
      "telefone": "(11) 99999-2222",
      "sucesso": true,
      "mensagem": "Mensagem enviada com sucesso"
    }
  ]
}
```

---

### Registrar Pagamento
```
PUT /cobranca/:id/pagar
```

**Resposta (200):**
```json
{
  "message": "Pagamento registrado com sucesso"
}
```

---

### Relatório de Cobranças
```
GET /cobranca/relatorio/geral
```

**Resposta (200):**
```json
{
  "totalCobrancas": 5,
  "totalPago": 300.00,
  "totalPendente": 450.00,
  "totalVencido": 300.00,
  "totalGeral": 1050.00
}
```

---

## 🔧 Exemplos em JavaScript

### Usando Fetch API

```javascript
// Obter token (se implementado)
const token = localStorage.getItem('token');

// Buscar todos os alunos
async function obterAlunos() {
  const response = await fetch('http://localhost:5000/api/alunos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) throw new Error('Erro ao buscar alunos');
  const alunos = await response.json();
  return alunos;
}

// Criar novo aluno
async function criarAluno(dados) {
  const response = await fetch('http://localhost:5000/api/alunos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  });
  
  if (!response.ok) throw new Error('Erro ao criar aluno');
  return await response.json();
}

// Enviar cobrança via WhatsApp
async function enviarCobrancaWhatsApp(alunoIds, mensagem) {
  const response = await fetch('http://localhost:5000/api/cobranca/enviar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      alunoIds,
      mensagem
    })
  });
  
  if (!response.ok) throw new Error('Erro ao enviar cobrança');
  return await response.json();
}
```

### Usando Axios

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Buscar alunos
const alunos = await axios.get(`${API_URL}/alunos`);

// Criar aluno
const novoAluno = await axios.post(`${API_URL}/alunos`, {
  nome: 'Novo Aluno',
  email: 'novo@email.com',
  telefone: '(11) 99999-3333',
  cpf: '111.222.333-44',
  plano: 'mensal'
});

// Enviar WhatsApp
const resultado = await axios.post(`${API_URL}/cobranca/enviar`, {
  alunoIds: [1, 2],
  mensagem: 'Olá {NOME}, sua mensalidade de R$ {VALOR} vence em {DATA}'
});
```

---

## 🚨 Códigos de Erro

| Código | Significado |
|--------|------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | CREATED - Recurso criado |
| 400 | BAD REQUEST - Dados inválidos |
| 404 | NOT FOUND - Recurso não encontrado |
| 500 | SERVER ERROR - Erro no servidor |

---

## 🔐 Melhorias de Segurança (TODO)

- [ ] Adicionar JWT Token
- [ ] Validação de entrada
- [ ] Rate limiting
- [ ] CORS restritivo
- [ ] Hash de senhas (bcrypt)
- [ ] Logs de auditoria
- [ ] Criptografia de dados sensíveis

---

## 📚 Referências

- [Express.js](https://expressjs.com)
- [SQLite Docs](https://www.sqlite.org/docs.html)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Axios](https://axios-http.com)
- [Twilio WhatsApp](https://www.twilio.com/en-us/messaging/channels/whatsapp)

---

Desenvolvido com ❤️ - 2026
