# Variáveis de Ambiente

## Visão Geral

Este documento descreve as variáveis de ambiente utilizadas no projeto e configurações para diferentes ambientes.

## Variáveis Globais

### Node.js

- `NODE_ENV`: Define o ambiente de execução
  - `development`: Ambiente de desenvolvimento
  - `release`: Ambiente de homologação
  - `production`: Ambiente de produção

### Servidor

- `PORT`: Porta em que o servidor irá rodar
  - Desenvolvimento: `3001`
  - Homologação: `3002`
  - Produção: `3000`

### Domínio

- `PRODUCTION_DOMAIN`: Domínio principal para configurações de CORS
  - Desenvolvimento: `dev.example-portfolio.com`
  - Homologação: `release.example-portfolio.com`
  - Produção: `example-portfolio.com`

## Variáveis de Infraestrutura

### Nexus

- `NEXUS_URL`: URL do repositório Nexus
- `NEXUS_CREDENTIALS`: Credenciais para autenticação no Nexus
- `NEXUS_REPOSITORY`: Nome do repositório

### Docker Registry

- `REGISTRY_URL`: URL do registry Docker
- `REGISTRY_CREDENTIALS`: Credenciais para autenticação no Docker Registry

## Recursos Computacionais

### Recursos de Desenvolvimento

- `DEV_CPU_LIMIT`: Limite de CPU (0.5)
- `DEV_MEMORY_LIMIT`: Limite de memória (256M)
- `DEV_CPU_RESERVE`: Reserva de CPU (0.25)
- `DEV_MEMORY_RESERVE`: Reserva de memória (128M)

### Recursos de Homologação

- `RELEASE_CPU_LIMIT`: Limite de CPU (0.75)
- `RELEASE_MEMORY_LIMIT`: Limite de memória (384M)
- `RELEASE_CPU_RESERVE`: Reserva de CPU (0.5)
- `RELEASE_MEMORY_RESERVE`: Reserva de memória (256M)

### Recursos de Produção

- `PROD_CPU_LIMIT`: Limite de CPU (1.0)
- `PROD_MEMORY_LIMIT`: Limite de memória (512M)
- `PROD_CPU_RESERVE`: Reserva de CPU (0.75)
- `PROD_MEMORY_RESERVE`: Reserva de memória (384M)

## Links de Contato

### Redes Sociais

#### LinkedIn

- **Variável**: `REACT_APP_LINKEDIN_URL`
- **Descrição**: URL do perfil do LinkedIn
- **Exemplo**: `www.linkedin.com/in/usuario`

#### GitHub

- **Variável**: `REACT_APP_GITHUB_URL`
- **Descrição**: URL do perfil do GitHub
- **Exemplo**: `https://github.com/usuario`

#### WhatsApp

- **Variável**: `REACT_APP_WHATSAPP_URL`
- **Descrição**: URL de contato do WhatsApp
- **Exemplo**: `https://wa.me/5511999999999`

#### Email

- **Variável**: `REACT_APP_EMAIL_URL`
- **Descrição**: URL de e-mail para contato
- **Exemplo**: `mailto:usuario@email.com`

### Configuração de Ambiente de Desenvolvimento

```bash
# .env.development
NODE_ENV=development
PORT=3001
PRODUCTION_DOMAIN=dev.example-portfolio.com
```

### Configuração de Ambiente de Homologação

```bash
# .env.release
NODE_ENV=release
PORT=3002
PRODUCTION_DOMAIN=release.example-portfolio.com
```

### Configuração de Ambiente de Produção

```bash
# .env.production
NODE_ENV=production
PORT=3000
PRODUCTION_DOMAIN=example-portfolio.com
```

## Boas Práticas

1. **Nunca** commite arquivos `.env` com credenciais
2. Use GitHub Secrets para variáveis sensíveis
3. Configure variáveis de ambiente no CI/CD
4. Use valores padrão seguros
5. Documente todas as variáveis necessárias

## Segurança

- Utilize variáveis de ambiente para configurações sensíveis
- Implemente validação de variáveis no código
- Limite o escopo das variáveis
- Utilize princípio do menor privilégio
- **Nunca exponha credenciais em documentação**
- Use mecanismos seguros de gerenciamento de secrets

## Troubleshooting

- Verifique se todas as variáveis necessárias estão configuradas
- Use logs para depuração de problemas de configuração
- Consulte a documentação de cada serviço

## Referências

- [12 Factor App - Config](https://12factor.net/config)
- [Docker Environment Variables](https://docs.docker.com/compose/environment-variables/)
- [Node.js Environment Variables](https://nodejs.org/en/learn/environment-variables/)
