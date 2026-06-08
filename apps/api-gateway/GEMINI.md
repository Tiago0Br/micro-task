# API Gateway

O **API Gateway** atua como o ponto central de entrada para todas as requisições externas da MicroTask. Ele é responsável por rotear as chamadas para os microsserviços internos apropriados via proxy.

## Informações Técnicas

- **Framework:** NestJS
- **Porta:** 3001
- **Documentação:** Swagger disponível em `http://localhost:3001/api/docs`

## Roteamento (Proxy)

| Prefixo | Destino | Variável de Ambiente |
|---------|---------|---------------------|
| `/auth` | Auth Service | `AUTH_SERVICE_URL` |
| `/tasks` | Tasks Service | `TASKS_SERVICE_URL` |
| `/notifications` | Notifications Service | `NOTIFICATIONS_SERVICE_URL` |

## Variáveis de Ambiente

O arquivo `.env` deve conter:

- `AUTH_SERVICE_URL`: URL do serviço de autenticação (ex: `http://localhost:3002`)
- `TASKS_SERVICE_URL`: URL do serviço de tarefas (ex: `http://localhost:3003`)
- `NOTIFICATIONS_SERVICE_URL`: URL do serviço de notificações (ex: `http://localhost:3004`)

## Scripts

- `pnpm dev`: Inicia em modo watch.
- `pnpm build`: Gera o bundle de produção.
- `pnpm lint`: Executa o linter Biome.
