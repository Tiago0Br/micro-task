# Auth Service

O **Auth Service** é responsável pelo gerenciamento de usuários e segurança do sistema.

## Informações Técnicas

- **Framework:** NestJS
- **Banco de Dados:** PostgreSQL (TypeORM)
- **Porta:** 3002
- **Schema do BD:** `auth`

## Funcionalidades

- Registro de novos usuários (`/register`).
- Autenticação via E-mail e Senha (`/login`).
- Geração de tokens JWT (validade de 1 dia).

## Variáveis de Ambiente

O arquivo `.env` deve conter:

- `DATABASE_URL`: String de conexão com o PostgreSQL.
- `JWT_SECRET`: Chave secreta para assinatura dos tokens.

## Entidades

- **User**: Armazena e-mail, hash da senha e nome completo.

## Scripts

- `pnpm dev`: Inicia em modo watch.
- `pnpm build`: Gera o bundle de produção.
- `pnpm lint`: Executa o linter Biome.
