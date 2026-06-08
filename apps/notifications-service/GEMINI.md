# Notifications Service

O **Notifications Service** é responsável pelo processamento e envio de notificações para os usuários.

## Informações Técnicas

- **Framework:** NestJS
- **Banco de Dados:** PostgreSQL (TypeORM)
- **Porta:** 3004
- **Schema do BD:** `notifications`

## Estado Atual

O serviço está configurado com a estrutura básica e conexão ao banco de dados, mas ainda não possui lógica de negócio implementada ou controllers definidos.

## Variáveis de Ambiente

- `DATABASE_URL`: String de conexão com o PostgreSQL.

## Scripts

- `pnpm dev`: Inicia em modo watch.
- `pnpm build`: Gera o bundle de produção.
- `pnpm lint`: Executa o linter Biome.
