# 🧪 Guia de Testes - MOOVE API

## Testando com cURL

### 1. Verificar Saúde do Servidor
```bash
curl http://localhost:5000/api/health
```

**Esperado:**
```json
{
  "status": "OK",
  "message": "Servidor rodando com sucesso!"
}
```

---

## 👥 Testando Alunos

### Listar todos os alunos
```bash
curl http://localhost:5000/api/alunos
```

### Buscar aluno específico
```bash
curl http://localhost:5000/api/alunos/1
```

### Criar novo aluno
```bash
curl -X POST http://localhost:5000/api/alunos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Costa",
    "email": "ana@email.com",
    "telefone": "(11) 98888-8888",
    "cpf": "555.666.777-88",
    "endereco": "Rua C, 789",
    "dataNascimento": "1992-07-10",
    "plano": "semestral"
  }'
```

### Atualizar aluno
```bash
curl -X PUT http://localhost:5000/api/alunos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Junior",
    "email": "joao.silva@email.com",
    "telefone": "(11) 99999-1111",
    "cpf": "123.456.789-00",
    "endereco": "Rua A, 456",
    "dataNascimento": "1990-05-15",
    "plano": "anual"
  }'
```

### Deletar aluno
```bash
curl -X DELETE http://localhost:5000/api/alunos/1
```

---

## 📚 Testando Aulas

### Listar aulas
```bash
curl http://localhost:5000/api/aulas
```

### Buscar aula específica
```bash
curl http://localhost:5000/api/aulas/1
```

### Criar aula
```bash
curl -X POST http://localhost:5000/api/aulas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pilates Avançado",
    "horario": "19:00",
    "professor": "Beatriz Costa",
    "local": "Sala B",
    "capacidade": 10
  }'
```

### Atualizar aula
```bash
curl -X PUT http://localhost:5000/api/aulas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pilates Matutino Especial",
    "horario": "09:30",
    "professor": "Ana Silva",
    "local": "Sala A",
    "capacidade": 16
  }'
```

### Deletar aula
```bash
curl -X DELETE http://localhost:5000/api/aulas/1
```

---

## ✔️ Testando Frequência

### Frequência de um aluno
```bash
curl http://localhost:5000/api/frequencia/aluno/1
```

### Estatísticas
```bash
curl http://localhost:5000/api/frequencia/stats/1
```

### Registrar frequência
```bash
curl -X POST http://localhost:5000/api/frequencia \
  -H "Content-Type: application/json" \
  -d '{
    "alunoId": 1,
    "aulaId": 1,
    "presente": true
  }'
```

### Alterar frequência
```bash
curl -X PUT http://localhost:5000/api/frequencia/1 \
  -H "Content-Type: application/json" \
  -d '{
    "presente": false
  }'
```

---

## 💰 Testando Cobrança

### Listar cobranças
```bash
curl http://localhost:5000/api/cobranca
```

### Cobranças de um aluno
```bash
curl http://localhost:5000/api/cobranca/aluno/1
```

### Criar cobrança
```bash
curl -X POST http://localhost:5000/api/cobranca \
  -H "Content-Type: application/json" \
  -d '{
    "alunoId": 1,
    "valor": 150.00,
    "vencimento": "2026-07-08"
  }'
```

### 🔥 Enviar Cobrança via WhatsApp
```bash
curl -X POST http://localhost:5000/api/cobranca/enviar \
  -H "Content-Type: application/json" \
  -d '{
    "alunoIds": [1, 2, 3],
    "mensagem": "Olá {NOME}, sua mensalidade de R$ {VALOR} venceu em {DATA}. Por favor, realize o pagamento. Obrigado! 💪"
  }'
```

### Registrar pagamento
```bash
curl -X PUT http://localhost:5000/api/cobranca/1/pagar
```

### Relatório
```bash
curl http://localhost:5000/api/cobranca/relatorio/geral
```

---

## 🧬 Testando com Postman

### 1. Importar Coleção

Crie um arquivo `MOOVE_API.postman_collection.json`:

```json
{
  "info": {
    "name": "MOOVE API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/health"
      }
    },
    {
      "name": "Alunos",
      "item": [
        {
          "name": "Listar Alunos",
          "request": {
            "method": "GET",
            "url": "http://localhost:5000/api/alunos"
          }
        },
        {
          "name": "Criar Aluno",
          "request": {
            "method": "POST",
            "url": "http://localhost:5000/api/alunos",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nome\": \"Pedro Oliveira\",\n  \"email\": \"pedro@email.com\",\n  \"telefone\": \"(11) 97777-7777\",\n  \"cpf\": \"444.555.666-77\",\n  \"endereco\": \"Rua D, 321\",\n  \"dataNascimento\": \"1988-09-25\",\n  \"plano\": \"mensal\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Aulas",
      "item": [
        {
          "name": "Listar Aulas",
          "request": {
            "method": "GET",
            "url": "http://localhost:5000/api/aulas"
          }
        },
        {
          "name": "Criar Aula",
          "request": {
            "method": "POST",
            "url": "http://localhost:5000/api/aulas",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nome\": \"Yoga Matutino\",\n  \"horario\": \"08:00\",\n  \"professor\": \"Lucas Ferreira\",\n  \"local\": \"Sala D\",\n  \"capacidade\": 20\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Cobrança",
      "item": [
        {
          "name": "Enviar WhatsApp",
          "request": {
            "method": "POST",
            "url": "http://localhost:5000/api/cobranca/enviar",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"alunoIds\": [1, 2],\n  \"mensagem\": \"Olá {NOME}, sua mensalidade de R$ {VALOR} vence em {DATA}. Faça o pagamento: PIX... Obrigado!\"\n}"
            }
          }
        }
      ]
    }
  ]
}
```

### 2. Importar em Postman
- Abra Postman
- File → Import
- Selecione o arquivo JSON
- Clique em "Import"
- Teste os endpoints!

---

## 🧪 Testes com Node.js

Crie arquivo `test-api.js`:

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testarAPI() {
  try {
    // 1. Health check
    console.log('1️⃣ Testando health check...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health:', health.data);

    // 2. Listar alunos
    console.log('\n2️⃣ Listando alunos...');
    const alunos = await axios.get(`${BASE_URL}/alunos`);
    console.log('✅ Alunos:', alunos.data);

    // 3. Criar aluno
    console.log('\n3️⃣ Criando novo aluno...');
    const novoAluno = await axios.post(`${BASE_URL}/alunos`, {
      nome: 'Teste Aluno',
      email: 'teste@email.com',
      telefone: '(11) 96666-6666',
      cpf: '333.444.555-66',
      endereco: 'Rua Teste, 999',
      dataNascimento: '2000-01-01',
      plano: 'mensal'
    });
    console.log('✅ Aluno criado:', novoAluno.data);

    // 4. Enviar WhatsApp
    console.log('\n4️⃣ Enviando cobrança via WhatsApp...');
    const whatsapp = await axios.post(`${BASE_URL}/cobranca/enviar`, {
      alunoIds: [1, 2],
      mensagem: 'Olá {NOME}, sua mensalidade vence em {DATA}. R$ {VALOR}'
    });
    console.log('✅ WhatsApp enviado:', whatsapp.data);

  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
  }
}

testarAPI();
```

**Rodar:**
```bash
node test-api.js
```

---

## 📊 Cenários de Teste Completos

### Cenário 1: Cadastro Completo
```bash
# 1. Criar aluno
curl -X POST http://localhost:5000/api/alunos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Carolina Silva",
    "email": "carolina@email.com",
    "telefone": "(11) 95555-5555",
    "cpf": "222.333.444-55",
    "endereco": "Rua Silva, 456",
    "dataNascimento": "1998-11-30",
    "plano": "trimestral"
  }'

# 2. Criar aula
curl -X POST http://localhost:5000/api/aulas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pilates Iniciante",
    "horario": "10:00",
    "professor": "Gabriela Nascimento",
    "local": "Sala A",
    "capacidade": 12
  }'

# 3. Registrar frequência
curl -X POST http://localhost:5000/api/frequencia \
  -H "Content-Type: application/json" \
  -d '{
    "alunoId": 1,
    "aulaId": 1,
    "presente": true
  }'

# 4. Ver estatísticas
curl http://localhost:5000/api/frequencia/stats/1
```

---

## 🐛 Debug

### Ver logs do servidor
```bash
# No terminal do backend
# Os logs aparecerão em tempo real
```

### Usar console.log
Adicione em `routes/alunos.js`:

```javascript
router.post('/', async (req, res) => {
  console.log('📝 Recebido:', req.body);  // Debug
  // ... resto do código
});
```

---

## ⚠️ Erros Comuns

**Erro: "Cannot find module"**
```bash
npm install
```

**Erro: "EADDRINUSE"** (Porta em uso)
```bash
# Mude a porta no .env
PORT=5001
```

**Erro: "SQLITE_CANTOPEN"**
```bash
# Verifique permissões
chmod 755 backend/
```

---

## 🎯 Checklist de Testes

- [ ] Health check retorna 200
- [ ] Listar alunos retorna array
- [ ] Criar aluno com sucesso
- [ ] Atualizar aluno
- [ ] Deletar aluno
- [ ] Listar aulas
- [ ] Criar aula
- [ ] Registrar frequência
- [ ] Ver estatísticas
- [ ] Enviar WhatsApp

---

Desenvolvido com ❤️ - 2026
