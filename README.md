# Sistema de Academia Moove - Pilates e Funcional

Protótipo funcional de um sistema completo para gerenciamento de academia com foco em Pilates e Funcional.

## Funcionalidades

✅ Cadastro de alunos com captura de foto (reconhecimento facial simulado)
✅ Agenda de aulas e agendamentos
✅ Ficha de frequência
✅ Envio de cobrança via WhatsApp
✅ Dashboard administrativo
✅ Design moderno com cores azul e dourado

## Estrutura do Projeto

```
├── frontend/          # Aplicação React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
│
├── backend/          # API Node.js + Express
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── database.js
│   └── server.js
│
└── README.md
```

## Como Executar

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm start
```

## Tecnologias Utilizadas

- **Frontend**: React 18, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Banco de Dados**: SQLite
- **Integração**: WhatsApp API (Twilio)
- **Autenticação**: JWT

## Cores do Tema

- Azul Principal: #1E3A8A
- Dourado: #D97706
- Branco: #FFFFFF
- Cinza Claro: #F3F4F6

## Autor

- 2026
