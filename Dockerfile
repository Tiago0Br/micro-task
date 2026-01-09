FROM node:20-alpine AS base
# Habilita o pnpm via Corepack (nativo do Node moderno)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Fase 1: Prune
FROM base AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
ARG APP_NAME
# O turbo prune gera uma pasta "out" com o lockfile correto
RUN turbo prune --scope=${APP_NAME} --docker

# Fase 2: Instalador
FROM base AS installer
WORKDIR /app

# Copia os arquivos de configuração do workspace gerados pelo prune
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Instala as dependências usando pnpm
RUN pnpm install --frozen-lockfile

# Fase 3: Build/Run
FROM base AS dev
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .

CMD ["pnpm", "run", "dev"]