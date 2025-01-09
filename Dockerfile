FROM node:20-alpine

# Instalar pnpm
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm

# Criar usuário não-root
RUN addgroup -S -g 1001 appgroup && adduser -S -u 1001 -G appgroup appuser

# Configurar diretórios e permissões
WORKDIR /app
ENV PNPM_HOME="/usr/local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN mkdir -p ${PNPM_HOME} && \
    chown -R appuser:appgroup ${PNPM_HOME} /usr/local/bin

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências de produção
RUN pnpm install --prod --frozen-lockfile

# Copiar os arquivos necessários
COPY build ./build
COPY src/server.js .

# Definir permissões corretas
RUN chmod 555 ./build ./server.js

# Alternar para usuário não-root
USER appuser

# Variáveis de ambiente padrão
ENV NODE_ENV=production \
    PORT=3000 \
    PRODUCTION_DOMAIN=""

# Expor porta e iniciar servidor
EXPOSE 3000
CMD ["node", "server.js"]