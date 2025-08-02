# SEST SENAT - Universidade do Transporte

Plataforma corporativa de cursos online focada em desenvolvimento comportamental, transporte e liderança.

## 🚀 Funcionalidades

- **Autenticação completa**: Login e cadastro de usuários
- **Dashboard interativo**: Visualização de todos os cursos disponíveis
- **Sistema de inscrições**: Inscreva-se em cursos de interesse
- **Área administrativa**: Criação de novos cursos (apenas admins)
- **Categorização**: Cursos organizados por Liderança, Comportamental e Transporte
- **Busca e filtros**: Encontre cursos facilmente
- **Design responsivo**: Interface moderna e atrativa

## 🛠️ Tecnologias

### Backend
- Node.js + Express
- SQLite (banco de dados)
- JWT (autenticação)
- bcryptjs (criptografia)

### Frontend
- React 18
- React Router (navegação)
- Axios (requisições HTTP)
- Lucide React (ícones)

## 📦 Instalação

### Instalação Rápida
```bash
# Instalar todas as dependências
npm run install-all

# Executar aplicação completa
npm run dev
```

### Instalação Manual
```bash
# Backend (porta 3005)
cd backend
npm install
npm run dev

# Frontend (porta 3002)
cd frontend
npm install
npm start
```

## 🔐 Credenciais de Teste

**Administrador:**
- Email: admin@sestsenat.org.br
- Senha: admin123

## 🎨 Design

A aplicação segue as cores e identidade visual do SEST SENAT:
- Azul corporativo (#1e40af, #3b82f6)
- Verde para ações positivas (#10b981)
- Design moderno com gradientes e sombras
- Interface responsiva e intuitiva

## 📱 Funcionalidades por Perfil

### Estudante
- Visualizar todos os cursos
- Inscrever-se em cursos
- Acompanhar cursos inscritos
- Buscar e filtrar cursos

### Administrador
- Todas as funcionalidades do estudante
- Criar novos cursos
- Gerenciar conteúdo da plataforma

## 🌐 Estrutura do Projeto

```
├── backend/
│   ├── server.js          # Servidor principal
│   ├── database.js        # Configuração do banco
│   ├── middleware/        # Middlewares de autenticação
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── services/      # Serviços de API
│   │   ├── context/       # Context API
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🚀 Deploy

Para produção, configure as variáveis de ambiente adequadas e utilize serviços como:
- Backend: Heroku, Railway, DigitalOcean
- Frontend: Vercel, Netlify
- Banco: PostgreSQL ou MySQL para produção