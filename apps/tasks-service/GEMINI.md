# Tasks Service

O **Tasks Service** gerencia o core business da aplicação: a criação e manutenção de tarefas e comentários.

## Informações Técnicas

- **Framework:** NestJS
- **Banco de Dados:** PostgreSQL (TypeORM)
- **Porta:** 3003
- **Schema do BD:** `tasks`
- **Autenticação:** Validação de JWT via Passport.

## Funcionalidades

- CRUD de tarefas (`/`).
- Gerenciamento de status e prioridades.
- Suporte a comentários vinculados a tarefas.
- Validação de entrada via Pipes customizados.

## Variáveis de Ambiente

O arquivo `.env` deve conter:

- `DATABASE_URL`: String de conexão com o PostgreSQL.
- `JWT_SECRET`: Chave secreta para validação dos tokens (deve ser a mesma do Auth Service).

## Modelos de Dados

### Task
- **Prioridades:** LOW, MEDIUM, HIGH, URGENT.
- **Status:** TODO, IN_PROGRESS, DONE.

### Comment
- Conteúdo em texto vinculado a uma Task e a um usuário.

## Scripts

- `pnpm dev`: Inicia em modo watch.
- `pnpm build`: Gera o bundle de produção.
- `pnpm lint`: Executa o linter Biome.
