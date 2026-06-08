# Web Application

Frontend da aplicação MicroTask, focado em uma experiência de usuário moderna e responsiva.

## Informações Técnicas

- **Framework:** React 19 (Vite)
- **Linguagem:** TypeScript
- **Roteamento:** TanStack Router
- **Estado Global:** Zustand
- **Estilização:** Tailwind CSS v4 + shadcn/ui
- **Consumo de API:** Axios com interceptores para injeção de token e tratamento de erros 401.

## Estrutura de Pastas

- `src/components/ui`: Componentes base (shadcn/ui).
- `src/hooks`: Hooks de lógica, incluindo integração com formulários (React Hook Form + Zod).
- `src/routes`: Definição de rotas (incluindo layouts privados).
- `src/stores`: Gerenciamento de estado (Auth).

## Funcionalidades

- Fluxo de Login e Cadastro.
- Listagem de tarefas em DataTable (TanStack Table).
- Proteção de rotas privadas.
- Feedback visual via Sonner (Toasts).

## Variáveis de Ambiente

O arquivo `.env` deve conter:

- `VITE_API_URL`: URL do API Gateway (ex: `http://localhost:3001`)

## Scripts

- `pnpm dev`: Inicia o servidor de desenvolvimento Vite (Porta 5173).
- `pnpm build`: Gera a build de produção.
- `pnpm lint`: Executa o linter Biome.
