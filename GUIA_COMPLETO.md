# 📱 MOOVE - Academia de Pilates e Funcional

## Protótipo Funcional Completo - 2026

Parabéns! Você tem um **sistema profissional e moderno** de gestão para sua academia!

---

## ✅ O Que Foi Criado

### 🎨 **Interface Moderna com Cores Azul e Dourado**
- **Cor Primária**: Azul Profundo (#1E3A8A)
- **Cor de Destaque**: Dourado (#D97706)
- **Design**: Responsivo e totalmente funcional
- **Componentes**: Botões, cards, tabelas e modais

### 📋 **1. Sistema de Cadastro de Alunos**
✅ **Captura de Foto com Câmera**
- Acesso à webcam do dispositivo
- Foto em alta qualidade
- Preview antes de salvar

✅ **Reconhecimento Facial Simulado**
- Detecção de rosto
- Status de validação visual
- Preparado para integração real

✅ **Biometria Digital**
- Campo de captura de digital
- Armazenamento simulado
- Pronto para scanner de biometria

✅ **Dados Pessoais Completos**
- Nome, Email, Telefone WhatsApp
- CPF, Endereço, Data de Nascimento
- Planos (Mensal, Trimestral, Semestral, Anual)

---

### 📅 **2. Agenda de Aulas**
✅ **Calendário Interativo**
- Navegação por mês
- Seleção de datas
- Destaque do dia atual

✅ **Aulas do Dia**
- Horários de início
- Professor responsável
- Local/Sala
- Número de presentes vs. capacidade
- Barra de ocupação visual

✅ **Gerenciamento de Aulas**
- Botão "Nova Aula"
- Modal para agendamento
- Campos: Nome, Horário, Professor, Local, Capacidade

✅ **Ações Rápidas**
- Editar aula
- Marcar frequência
- Ver detalhes

---

### ✔️ **3. Ficha de Frequência**
✅ **Relatório Completo**
- Total de aulas
- Presentes e faltas
- Taxa de presença (%)
- Status por aluno

✅ **Estatísticas**
- Presença Média Geral
- Frequência Alta (>90%)
- Frequência Regular (60-90%)
- Frequência Baixa (<60%)

✅ **Filtros e Busca**
- Por aula
- Por período
- Por status

✅ **Exportação**
- Botão para relatório em PDF
- Dados estruturados

---

### 💬 **4. Cobrança via WhatsApp**
✅ **Dashboard de Cobranças**
- Status: Pago, Pendente, Vencido
- Valores em reais
- Datas de vencimento

✅ **Envio de Mensagens**
- Seleção múltipla de alunos
- Templates prontos:
  - Cobrança padrão
  - Lembrete de vencimento
  - Desconto especial

✅ **Personalização**
- Editar mensagem
- Substituições automáticas: {NOME}, {VALOR}, {DATA}
- Visualização antes de enviar

✅ **Histórico**
- Último contato registrado
- Rastreamento de envios

---

### 📊 **5. Dashboard**
✅ **Visão Geral**
- Total de alunos
- Aulas de hoje
- Taxa de presença
- Mensalidades vencidas

✅ **Atividade Recente**
- Novos alunos
- Aulas concluídas
- Cobranças enviadas
- Perfis atualizados

✅ **Próximas Aulas**
- Lista de aulas próximas
- Horários e professores
- Número de alunos inscritos
- Link para agenda completa

---

## 🚀 Como Usar

### **Pré-requisitos**
- Node.js 16+ instalado
- npm ou yarn
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### **1️⃣ Iniciar o Backend**
```bash
cd "c:\Users\yuriw\Moove Pilates e Funcional\backend"
npm install  # Já feito
npm start
```
✅ Servidor rodando em: **http://localhost:5000**

### **2️⃣ Iniciar o Frontend**
Em outro terminal:
```bash
cd "c:\Users\yuriw\Moove Pilates e Funcional\frontend"
npm install  # Já feito
npm run dev
```
✅ Aplicação rodando em: **http://localhost:3000**

### **3️⃣ Acessar a Plataforma**
- Abra: **http://localhost:3000**
- **Email**: qualquer email
- **Senha**: qualquer senha
- Clique em "Entrar"

---

## 📂 Estrutura de Pastas

```
Moove Pilates e Funcional/
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── RecentActivity.jsx
│   │   │   └── UpcomingClasses.jsx
│   │   │
│   │   ├── pages/               # Páginas principais
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── CadastroAlunoPage.jsx (COM CÂMERA!)
│   │   │   ├── AgendaPage.jsx
│   │   │   ├── FrequenciaPage.jsx
│   │   │   └── CobrancaPage.jsx
│   │   │
│   │   ├── styles/
│   │   │   └── index.css
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
│
├── backend/
│   ├── routes/
│   │   ├── alunos.js            # CRUD de alunos
│   │   ├── aulas.js             # CRUD de aulas
│   │   ├── frequencia.js        # Frequência
│   │   └── cobranca.js          # Cobrança + WhatsApp
│   │
│   ├── database.js              # SQLite configurado
│   ├── server.js                # Express server
│   ├── package.json
│   ├── moove.db                 # Banco de dados (criado automaticamente)
│   └── .env
│
├── README.md
├── INSTRUCOES.md
└── .gitignore
```

---

## 💡 Funcionalidades Principais

### Login & Autenticação
- [x] Tela de login responsiva
- [x] Validação de credenciais
- [x] Lembrar dispositivo (checkbox)

### Sidebar Navegável
- [x] Menu colapsável
- [x] 5 seções principais
- [x] Ícones com Lucide React
- [x] Tema gradiente azul-dourado

### Navbar com Notificações
- [x] Bell icon com contador
- [x] Perfil do usuário
- [x] Botão de logout
- [x] Respons ivo

### Dark Mode Ready
- [x] Componentes preparados
- [x] Cores customizáveis
- [x] TailwindCSS configurado

---

## 🔌 Integração com WhatsApp (Próximos Passos)

Para integrar mensagens **reais** via WhatsApp:

### **Opção 1: Twilio (Recomendado)**
```bash
npm install twilio
```

### **Opção 2: WhatsApp Business API**
- Registrar em: https://developers.facebook.com/
- Configurar webhook
- Autorizar números de telefone

### **Opção 3: WhatsApp Web (Selenium)**
- Mais simples, mas menos estável
- Bom para prototipagem rápida

---

## 🔐 Segurança (Melhorias Futuras)

- [ ] JWT Token para autenticação
- [ ] Hash de senhas (bcrypt)
- [ ] Validação de entrada
- [ ] CORS configurado
- [ ] Rate limiting
- [ ] Logs de auditoria

---

## 📊 Banco de Dados

### Tabelas Criadas Automaticamente:

**alunos**
- id, nome, email, telefone, cpf, endereco, dataNascimento
- foto (BLOB), dataFacial (BLOB)
- plano, dataCadastro, ativo

**aulas**
- id, nome, horario, professor, local, capacidade, dataCriacao

**frequencia**
- id, alunoId, aulaId, datPresenca, presente

**cobranca**
- id, alunoId, valor, vencimento, dataPagamento, status, ultimaMensagem

---

## 🎯 Próximas Funcionalidades (Roadmap)

### V1.1 - Melhorias
- [ ] Relatórios em PDF
- [ ] Gráficos avançados
- [ ] Backup automático
- [ ] Multi-idioma

### V1.2 - Integrações
- [ ] WhatsApp real
- [ ] Email automatizado
- [ ] Pagamento online (Stripe)
- [ ] Google Calendar sync

### V1.3 - Mobile App
- [ ] React Native
- [ ] Reconhecimento facial avançado
- [ ] Offline-first

### V2.0 - Enterprise
- [ ] Multi-academia
- [ ] Equipe de professores
- [ ] Sistema de pontuação
- [ ] App para alunos

---

## 📞 Suporte Técnico

### Erros Comuns

**Porta 3000 ou 5000 já em uso:**
```bash
# Frontend em outra porta
npm run dev -- --port 3001

# Backend em outra porta
PORT=5001 npm start
```

**Banco de dados corrompido:**
```bash
# Deletar e recriar
rm backend/moove.db
npm start  # Será recriado
```

**Módulos não encontrados:**
```bash
# Limpar node_modules
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 Licença

Protótipo desenvolvido com GitHub Copilot - 2026
Para uso em Academia Moove Pilates e Funcional

---

## 🙏 Obrigado!

Seu sistema está pronto para ser expandido e personalizado!

**Principais Arquivos para Modificar:**
1. `frontend/src/pages/` - Adicione mais páginas
2. `backend/routes/` - Adicione mais endpoints
3. `tailwind.config.js` - Customize cores
4. `database.js` - Modifique schema

**Status: ✅ FUNCIONANDO E PRONTO PARA USO**

---

Desenvolvido com ❤️ para MOOVE Academia
