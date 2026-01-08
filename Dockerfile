FROM node:20-alpine AS base

# Fase 1: Prune (Separa apenas o necessário para o app específico)
# Isso evita copiar o monorepo inteiro para dentro de cada container
FROM base AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
# Este argumento define qual app vamos montar (ex: @microtask/api-gateway)
ARG APP_NAME
RUN turbo prune --scope=${APP_NAME} --docker

# Fase 2: Instalador (Instala dependências)
FROM base AS installer
WORKDIR /app
# Copia apenas os arquivos de dependência (package.json, lockfile) gerados pelo prune
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm install

# Fase 3: Desenvolvimento (Ou Build)
FROM base AS dev
WORKDIR /app
# Copia as dependências instaladas
COPY --from=installer /app/ .
# Copia o código fonte filtrado
COPY --from=pruner /app/out/full/ .

# Comando padrão (pode ser sobrescrito no docker-compose)
CMD ["npm", "run", "dev"]