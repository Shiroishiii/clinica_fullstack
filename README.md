# 🏥 Clínica Fullstack

Sistema completo para gerenciamento de clínicas médicas, desenvolvido com **React**, **Node.js**, **TypeScript**, **Express** e **Prisma ORM**.

O projeto possui autenticação de usuários, controle de permissões, gerenciamento de pacientes, consultas, exames, prontuários e usuários.

---

## 🚀 Tecnologias Utilizadas

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS
* React Toastify

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Bcrypt

---

## 📂 Estrutura do Projeto

```text
clinica_fullstack/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── prisma/
│   └── package.json
│
└── frontend/
    └── clinica/
        ├── src/
        ├── public/
        └── package.json
```

---

## 🔐 Funcionalidades

### Autenticação

* Cadastro de usuários
* Login com JWT
* Middleware de autenticação
* Controle de permissões por função (Role)

### Usuários

* Listar usuários
* Buscar usuário por ID
* Criar usuário
* Atualizar usuário
* Remover usuário

### Pacientes

* Cadastro de pacientes
* Consulta de pacientes
* Atualização de informações
* Exclusão de pacientes

### Consultas

* Agendamento de consultas
* Listagem de consultas
* Atualização de consultas
* Cancelamento de consultas

### Exames

* Cadastro de exames
* Consulta de exames
* Atualização de exames
* Remoção de exames

### Prontuários

* Criação de prontuários
* Consulta de histórico médico
* Atualização de registros

---

## 📡 Endpoints Principais

### Autenticação

```http
POST /cadastro
POST /login
```

### Usuários

```http
GET    /user
GET    /user/:id
POST   /user
PUT    /user/:id
DELETE /user/:id
```

### Pacientes

```http
GET    /paciente
GET    /paciente/:id
POST   /paciente
PUT    /paciente/:id
DELETE /paciente/:id
```

### Consultas

```http
GET    /consulta
GET    /consulta/:id
POST   /consulta
PUT    /consulta/:id
DELETE /consulta/:id
```

### Exames

```http
GET    /exame
GET    /exame/:id
POST   /exame
PUT    /exame/:id
DELETE /exame/:id
```

### Prontuários

```http
GET    /prontuario
GET    /prontuario/:id
POST   /prontuario
PUT    /prontuario/:id
DELETE /prontuario/:id
```

---

## ⚙️ Configuração do Backend

### 1. Instalar dependências

```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/clinica"
JWT_SECRET="sua_chave_secreta"
```

### 3. Executar migrações

```bash
npx prisma migrate dev
```

### 4. Iniciar servidor

```bash
npm start
```

Servidor disponível em:

```text
http://localhost:3000
```

---

## 🎨 Configuração do Frontend

### Instalar dependências

```bash
cd frontend/clinica
npm install
```

### Executar projeto

```bash
npm run dev
```

Frontend disponível em:

```text
http://localhost:5173
```

---

## 🔒 Autenticação

Após realizar login, o backend retorna um token JWT.

As rotas protegidas exigem o header:

```http
Authorization: Bearer TOKEN
```

---

## 🧪 Testes de API

A coleção do Postman está disponível em:

```text
backend/postman/
```

Importe a coleção para testar todos os endpoints da aplicação.

---

## 📚 Objetivo

Este projeto foi desenvolvido com foco educacional para praticar:

* Arquitetura em camadas
* APIs REST
* Autenticação JWT
* Prisma ORM
* React com consumo de APIs
* Controle de acesso baseado em perfis
* Integração Full Stack

---

## 👨‍💻 Autor

Desenvolvido para fins de estudo e prática de desenvolvimento Full Stack utilizando o ecossistema JavaScript/TypeScript.
