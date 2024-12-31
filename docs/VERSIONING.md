# Guia de Versionamento

## Visão Geral

O projeto utiliza um script de versionamento automatizado localizado em `scripts/version-bump.sh` e scripts NPM para gerenciar versões.

## Tipos de Versão

### Semântico

Seguimos o padrão [Semantic Versioning 2.0.0](https://semver.org/):

- `MAJOR.MINOR.PATCH`
  - `MAJOR`: Mudanças incompatíveis na API
  - `MINOR`: Novas funcionalidades compatíveis
  - `PATCH`: Correções de bugs

## Fluxo de Versionamento

### Desenvolvimento

1. Branch: `development`
2. Comandos NPM para incrementar versão:

   ```bash
   # Correção de bug
   npm run version:patch
   
   # Nova funcionalidade
   npm run version:minor
   
   # Mudança significativa
   npm run version:major
   ```

### Release (Homologação)

1. Branch: `main`
2. Preparação para release
   - Merge do `development` para `main`
   - Executar script de versão

   ```bash
   # Gerar changelog e preparar versão
   ./scripts/version-bump.sh tag
   ```

### Produção

1. Tags semânticas: `v[0-9]+.[0-9]+.[0-9]+`
2. Criação de tag de produção

   ```bash
   # Criar tag de produção
   git tag -a v1.2.3 -m "Release version 1.2.3"
   git push --tags
   ```

## Scripts Disponíveis

### NPM

- `version:patch`: Incrementa versão de correção
- `version:minor`: Incrementa versão de funcionalidade
- `version:major`: Incrementa versão principal

### Bash

- `./scripts/version-bump.sh patch`: Incrementa versão de correção
- `./scripts/version-bump.sh minor`: Incrementa versão de funcionalidade
- `./scripts/version-bump.sh major`: Incrementa versão principal
- `./scripts/version-bump.sh tag`: Prepara release e gera changelog

## Opções Adicionais

- `--dry-run`: Simula a operação sem fazer alterações
- `--help` ou `-h`: Exibe ajuda do script

## Commits e Changelog

### Padrão de Commits

```git
feat: descrição da nova funcionalidade
fix: descrição da correção
docs: descrição da mudança na documentação
refactor: descrição da refatoração
```

### Geração Automática

- Changelog gerado automaticamente
- Categoriza commits em:
  - Novas funcionalidades
  - Correções
  - Documentação
  - Outras mudanças

## Boas Práticas

1. Use commits semânticos
2. Faça commits pequenos e focados
3. Descreva claramente as mudanças
4. Utilize os scripts de versionamento
5. Sempre revise o changelog antes de fazer push

## Integração CI/CD

- Commits em `development`: Versões de desenvolvimento
- Merge em `main`: Preparação de release
- Tags `v*.*.*`: Releases de produção

## Segurança

- Apenas mantenedores autorizados podem criar tags
- Revisão obrigatória de pull requests
- Assinatura de commits recomendada

## Troubleshooting

- Se o script falhar, revise manualmente os arquivos
- Verifique se está no branch correto
- Consulte a ajuda com `./scripts/version-bump.sh --help`
