# 💈 BarberFlow — Sistema de Barbearia SaaS

## 👥 Integrantes do grupo
- Marina Guimarães
-

---

## 💡 Descrição do projeto

O **BarberFlow** é um sistema SaaS para gerenciamento de barbearias, permitindo o controle de serviços, barbeiros e visualização de informações em uma interface moderna e intuitiva.

O projeto simula um sistema real de mercado, com foco em experiência premium, layout escuro e organização baseada em componentes reutilizáveis e Context API.

---

## 🚀 Tecnologias utilizadas

## 🚀 Tecnologias Utilizadas

### Frontend
- **React.js** (com Vite)
- **TypeScript**
- **React Router DOM** (Navegação)
- **Context API** (Gerenciamento de estado global)
- **Axios** (Consumo de API HTTP)
- **CSS3** (Estilização global e inline)

### Backend
- **Node.js**
- **TypeScript** (Ambiente de desenvolvimento e tipagem)
- **Express** (Framework web para a API REST)
- **wppconnect** (Biblioteca de integração com o WhatsApp / Chatbot)
- **MongoDB** (Banco de dados NoSQL)
- **Zod / Validator** (Validação de esquemas e dados)

---

## 🧩 Funcionalidades e telas

### 🏠 Home
- Hero carousel com imagens automáticas
- Apresentação da barbearia
- Listagem de serviços
- Listagem de barbeiros
- Mapa integrado com Google Maps
- Botão de agendamento via WhatsApp

---

### 💈 Barbeiros
- Listagem de barbeiros
- Filtro por nome
- Criar barbeiro (modal)
- Editar barbeiro (modal)
- Deletar barbeiro
- Atualização em tempo real com Context API

---

### ✂️ Serviços
- Listagem de serviços
- Criar serviço
- Editar serviço
- Deletar serviço
- Controle de preço e duração
- Modais de CRUD

---

### 📍 Localização
- Mapa integrado com Google Maps
- Localização: Partage Shopping Campina Grande

---

### 🎨 Interface (UI/UX)
- Tema escuro (dark premium)
- Layout moderno estilo SaaS
- Cards responsivos
- Destaques em dourado (#c8a24a)
- Interface responsiva (mobile-first)

---


## ▶️ Como rodar o projeto

### 1. Clonar o repositório
##### git clone [https://github.com/marinagv95/barbearia-schedule.git](https://github.com/marinagv95/barbearia-schedule.git)

## 2. Entrar na pasta

##### cd barbearia-schedule
## 3. Instalar dependências

##### npm install
## 4. Rodar o projeto

##### npm run dev

---

## 📁 Estrutura do Projeto

O projeto está dividido em uma arquitetura monorepo, separando as responsabilidades do Front-end e do Back-end:

```text
barbearia-app/
├── backend/                  # Servidor Node.js (API REST & Chatbot)
│   └── src/
│       ├── bot/              # Configuração e inicialização do wppconnect
│       ├── config/           # Configurações de banco de dados e ambiente
│       ├── controllers/      # Regras de orquestração de rotas (HTTP)
│       ├── models/           # Definição dos modelos e entidades de dados
│       ├── repositories/     # Camada de persistência e manipulação do banco
│       ├── routes/           # Definição dos endpoints da API
│       ├── schemas/          # Validações de esquemas de dados
│       ├── services/         # Regras de negócio da aplicação (Regendamentos, Chatbot...)
│       └── utils/            # Funções utilitárias e tratamento de erros
│
├── frontend/                 # Interface Web em React (Vite + TypeScript)
│   └── src/
│       ├── assets/           # Imagens, logos e arquivos estáticos
│       ├── components/       # Componentes reaproveitáveis da interface
│       │   ├── AppointmentForm/
│       │   ├── BarberCard/
│       │   ├── BarberModal/
│       │   ├── CreateBarberModal/
│       │   ├── CreateServiceModal/
│       │   ├── Header/
│       │   ├── HeroCarousel/
│       │   ├── LocationMap/
│       │   ├── ServiceCard/
│       │   ├── ServiceModal/
│       │   └── Sidebar/
│       ├── pages/            # Páginas principais da aplicação
│       ├── providers/        # Contextos globais da aplicação (Context API)
│       ├── routes/           # Gerenciamento de rotas e navegação da SPA
│       ├── services/         # Integração com a API (Axios)
│       └── validators/       # Esquemas de validação de formulários (Zod/Yup)



