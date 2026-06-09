# MOOVE - Academia de Pilates e Funcional 💪

Um protótipo funcional completo de um sistema de gestão para academia com foco em Pilates e Funcional.

## 🎯 Funcionalidades Implementadas

### ✅ Cadastro de Alunos
- Preenchimento de dados pessoais
- **Captura de foto com câmera** 📸
- **Reconhecimento facial simulado** 👤
- **Biometria digital** 🔐
- Múltiplos planos de mensalidade

### ✅ Agenda de Aulas
- Visualização em calendário interativo
- Aulas do dia com detalhes
- Registro de presença por aula
- Gerenciamento de capacidade
- Agendamento de novas aulas

### ✅ Ficha de Frequência
- Visualização de presença por aluno
- Taxa de presença com gráficos
- Status de frequência (Perfeito, Excelente, Bom, Regular, Baixa)
- Filtros avançados
- Exportação de relatórios

### ✅ Cobrança via WhatsApp
- Lista de todas as cobranças
- Status de pagamento (Pago, Pendente, Vencido)
- **Envio de mensagens via WhatsApp** 📱
- Templates personalizáveis
- Histórico de contatos
- Relatórios de recebimento

### ✅ Dashboard
- Visão geral com estatísticas
- Atividade recente
- Próximas aulas agendadas
- Alertas importantes

## 🎨 Design

- **Cores**: Azul (#1E3A8A) e Dourado (#D97706)
- **Tema**: Moderno e minimalista
- **Responsivo**: Funciona em desktop e mobile
- **Ícones**: Lucide React icons

## 🛠️ Tecnologias

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - CSS framework
- **React Router** - Routing
- **Lucide React** - Ícones
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **SQLite** - Banco de dados
- **CORS** - Cross-origin requests
- **Twilio** - WhatsApp integration (opcional)

## 📦 Estrutura do Projeto

```
moove-academia/
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas principais
│   │   ├── styles/          # Estilos globais
│   │   ├── App.jsx          # Componente principal
│   │   └── main.jsx         # Entrada
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── routes/              # Rotas da API
│   ├── database.js          # Configuração SQLite
│   ├── server.js            # Servidor Express
│   └── package.json
│
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### 1. Clone ou extraia o projeto

```bash
cd "c:\Users\yuriw\Moove Pilates e Funcional"
```

### 2. Instale o Backend

```bash
cd backend
npm install
npm start
```

O servidor rodará em: `http://localhost:5000`

### 3. Em outro terminal, instale o Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend rodará em: `http://localhost:3000`

## 🔑 Login Demo

Use qualquer email e senha para acessar a plataforma.

Exemplo:
- **Email**: admin@moove.com
- **Senha**: 123456

## 📱 Funcionalidades em Destaque

### Captura Biométrica
1. Acesse "Cadastro Aluno"
2. Clique em "Iniciar Câmera"
3. A câmera será ativada
4. Clique em "Capturar Foto"
5. Confirme a detecção facial
6. Complete o cadastro

### Envio de Cobrança via WhatsApp
1. Acesse "Cobrança"
2. Clique em "Enviar Cobrança"
3. Selecione os alunos
4. Escolha um template ou escreva uma mensagem
5. Use {NOME}, {VALOR}, {DATA} para personalizações
6. Clique em "Enviar para X"

### Gerenciamento de Frequência
1. Acesse "Frequência"
2. Visualize a taxa de presença
3. Filtre por aula ou período
4. Exporte relatórios em PDF

## 🔌 Integração Real (Próximos Passos)

Para integrar com a API real do WhatsApp:

1. Instale Twilio:
```bash
npm install twilio
```

2. Configure no `.env`:
```
TWILIO_ACCOUNT_SID=seu_sid
TWILIO_AUTH_TOKEN=seu_token
TWILIO_PHONE_NUMBER=seu_numero
```

3. Implemente em `routes/cobranca.js`:
```javascript
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.messages.create({
  body: mensagem,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: telefone
});
```

## 🎓 Recursos Educacionais

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Express Docs](https://expressjs.com)
- [SQLite Docs](https://www.sqlite.org/docs.html)

## 📞 Suporte

Para dúvidas ou sugestões sobre o protótipo, consulte a documentação ou revise o código-fonte.

## 📄 Licença

Protótipo desenvolvido com Copilot em 2026.

---

**Desenvolvido com ❤️ para MOOVE Academia**
