# 🏋️ Moove — Pilates e Funcional

Sistema web desenvolvido para facilitar e centralizar a gestão de uma academia de **Pilates e treinamento funcional**, reunindo informações sobre alunos, aulas, frequência e cobranças em uma única aplicação.

## 🎯 Objetivo do Projeto

O **Moove** surgiu a partir da necessidade de tornar mais simples a administração das atividades do dia a dia de uma academia.

A proposta foi desenvolver uma aplicação capaz de reunir em um único ambiente processos que normalmente são realizados de maneira separada ou manual, facilitando o acesso às informações e a organização da academia.

Entre os principais objetivos estão:

* Centralizar o cadastro e gerenciamento de alunos;
* Organizar a agenda de aulas;
* Registrar e acompanhar a frequência dos alunos;
* Facilitar o controle de mensalidades e cobranças;
* Possibilitar o envio de mensagens relacionadas às cobranças;
* Explorar recursos como fotografia, reconhecimento facial e biometria;
* Disponibilizar informações importantes por meio de um dashboard.

---

## ✨ Principais Funcionalidades

### 👤 Gestão de Alunos

Permite cadastrar e gerenciar informações dos alunos, incluindo:

* Dados pessoais;
* Contato;
* Plano contratado;
* Fotografia;
* Informações relacionadas à biometria;
* Estrutura para reconhecimento facial.

Os recursos de reconhecimento facial e biometria fazem parte da proposta experimental do projeto e estão preparados para futuras integrações com equipamentos e serviços específicos.

### 📅 Agenda de Aulas

O sistema possui uma área destinada à organização das aulas, permitindo visualizar informações como:

* Data;
* Horário;
* Professor;
* Local;
* Capacidade da turma;
* Quantidade de alunos presentes.

Também é possível cadastrar e gerenciar as aulas disponíveis.

### ✅ Controle de Frequência

A aplicação permite acompanhar a presença dos alunos nas aulas e consultar informações como:

* Total de aulas;
* Presenças;
* Faltas;
* Percentual de frequência;
* Situação de frequência de cada aluno.

### 💰 Gestão de Cobranças

O sistema organiza as mensalidades dos alunos de acordo com diferentes situações:

* Pago;
* Pendente;
* Vencido.

Também possui funcionalidades voltadas à preparação e envio de mensagens de cobrança pelo WhatsApp.

### 📊 Dashboard

O painel principal apresenta uma visão geral da academia, permitindo acompanhar informações importantes como:

* Total de alunos;
* Aulas do dia;
* Taxa de presença;
* Mensalidades vencidas;
* Próximas aulas;
* Atividades recentes.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando uma arquitetura **Full Stack**, com front-end e back-end separados.

### Front-end

* **React** — construção da interface;
* **JavaScript** — lógica da aplicação;
* **Vite** — ambiente de desenvolvimento e build;
* **React Router** — navegação entre as páginas;
* **Axios** — comunicação com a API;
* **Tailwind CSS** — estilização da interface;
* **Lucide React** — biblioteca de ícones.

### Back-end

* **Node.js** — execução do servidor;
* **Express.js** — desenvolvimento da API REST;
* **SQLite** — armazenamento dos dados;
* **Axios** — requisições HTTP;
* **CORS** — comunicação entre front-end e back-end;
* **dotenv** — gerenciamento de variáveis de ambiente;
* **Nodemon** — auxílio durante o desenvolvimento.

### Ferramentas

* **Git** — controle de versão;
* **GitHub** — hospedagem e documentação do projeto;
* **npm** — gerenciamento das dependências.

---

## 🧠 O que aprendi com o projeto

O desenvolvimento do Moove permitiu colocar em prática diferentes conhecimentos relacionados à **Engenharia de Software e ao desenvolvimento Full Stack**.

Um dos principais aprendizados foi compreender melhor a separação entre **front-end, back-end e banco de dados**, entendendo como essas partes se comunicam para formar uma aplicação completa.

Durante o desenvolvimento, pude praticar e aprofundar conhecimentos em:

* Desenvolvimento de interfaces utilizando React;
* Criação e organização de componentes;
* Desenvolvimento de APIs REST com Node.js e Express;
* Comunicação entre front-end e back-end;
* Operações de cadastro, consulta, edição e exclusão de dados;
* Persistência de informações utilizando SQLite;
* Organização de rotas e endpoints;
* Uso de requisições HTTP;
* Criação de interfaces responsivas;
* Organização da estrutura de um projeto Full Stack;
* Uso de Git e GitHub para versionamento;
* Documentação de uma aplicação.

O projeto também possibilitou trabalhar com conceitos relacionados a integrações externas, como **WhatsApp, câmera, reconhecimento facial e biometria**, mostrando a importância de preparar a arquitetura para recursos que podem ser adicionados ou aprimorados futuramente.

Além do aprendizado técnico, o projeto reforçou a importância de primeiro entender um **problema real** para depois desenvolver uma solução, buscando criar uma aplicação que seja funcional e fácil de utilizar.

---

## 📂 Estrutura do Projeto

```text
Moove-Pilates-e-Funcional/
│
├── frontend/           # Aplicação React
│   ├── public/
│   └── src/
│
├── backend/            # API Node.js / Express
│   ├── routes/
│   ├── database.js
│   └── server.js
│
├── assets/             # Arquivos e recursos do projeto
├── brand/              # Identidade visual
│
├── API_DOCUMENTACAO.md
├── GUIA_COMPLETO.md
├── INSTRUCOES.md
├── TESTES_API.md
└── README.md
```

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de iniciar, é necessário possuir:

* Node.js;
* npm;
* Git.

### 1. Clone o repositório

```bash
git clone https://github.com/YuriWitt/Moove-Pilates-e-Funcional.git
```

Entre na pasta:

```bash
cd Moove-Pilates-e-Funcional
```

### 2. Execute o Back-end

```bash
cd backend
npm install
npm run dev
```

### 3. Execute o Front-end

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Após iniciar o Vite, acesse no navegador o endereço apresentado pelo terminal.

---

## 🔮 Possíveis melhorias futuras

O projeto pode continuar evoluindo com funcionalidades como:

* Integração real com leitores biométricos;
* Implementação completa de reconhecimento facial;
* Integração com uma API oficial para envio de mensagens;
* Sistema de autenticação e diferentes níveis de acesso;
* Geração de relatórios administrativos e financeiros;
* Melhorias de segurança da API;
* Notificações automáticas;
* Aplicativo mobile integrado ao sistema.

---

## 👨‍💻 Autor

**Yuri Witt Kovalevich**

Estudante de Engenharia de Software e Técnico em Informática, com interesse em desenvolvimento **Mobile, Back-end e soluções de software voltadas para problemas reais**.

* [GitHub](https://github.com/YuriWitt)
* [LinkedIn](https://www.linkedin.com/in/yuri-witt-b9a778282)

---

⭐ Este projeto foi desenvolvido como uma oportunidade de aplicar conhecimentos de desenvolvimento Full Stack e aprofundar habilidades relacionadas à Engenharia de Software.

