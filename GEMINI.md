# MicroTask - Monorepo Documentation

Este projeto é uma aplicação de gerenciamento de tarefas baseada em uma arquitetura de microsserviços, organizada em um monorepo utilizando **Turborepo** e **pnpm workspaces**.

## Estrutura do Projeto

O projeto está dividido em aplicações (apps) e pacotes compartilhados (packages).

### Aplicações (`apps/`)

- [**API Gateway**](./apps/api-gateway/GEMINI.md): Ponto de entrada único para o ecossistema de microsserviços.
- [**Auth Service**](./apps/auth-service/GEMINI.md): Gerenciamento de usuários e autenticação (JWT).
- [**Tasks Service**](./apps/tasks-service/GEMINI.md): Gerenciamento de tarefas e comentários.
- [**Notifications Service**](./apps/notifications-service/GEMINI.md): Serviço para envio de notificações (em desenvolvimento).
- [**Web**](./apps/web/GEMINI.md): Frontend em React (Vite) para interação com o usuário.

### Pacotes (`packages/`)

- `typescript-config`: Configurações base de TypeScript para os diferentes tipos de projetos (Node, React, NestJS).

## Stack Tecnológica Global

- **Runtime:** Node.js
- **Gerenciador de Pacotes:** pnpm
- **Monorepo:** Turborepo
- **Linting/Formatting:** Biome
- **Banco de Dados:** PostgreSQL (utilizado via Docker)

## Comandos Principais

Executados na raiz do projeto:

```bash
# Instalar dependências
pnpm install

# Rodar todos os apps em modo desenvolvimento
pnpm dev

# Build de todos os projetos
pnpm build

# Lint de todo o monorepo
pnpm lint

# Formatação de todo o monorepo
pnpm format
```

## Guia de Desenvolvimento

Sempre consulte o arquivo `GEMINI.md` específico de cada app antes de realizar alterações naquela área do projeto.
