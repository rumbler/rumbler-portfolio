# Política de Segurança de Conteúdo (CSP)

## Visão Geral

A Política de Segurança de Conteúdo (CSP) é uma camada adicional de segurança que ajuda a detectar e mitigar certos tipos de ataques, incluindo Cross-Site Scripting (XSS) e ataques de injeção de dados.

## Implementação

Nossa implementação CSP segue as melhores práticas de segurança, com ênfase em:

1. NUNCA usar 'unsafe-inline' ou 'unsafe-eval'
2. Sempre usar nonces para scripts e estilos
3. Implementar relatórios de violações CSP

### Diretrizes de Segurança

1. `default-src 'self'`: Restringe todos os recursos para serem carregados apenas do mesmo domínio
2. `script-src 'self' 'nonce-{random}'`: Scripts permitidos apenas com nonce válido
3. `style-src 'self' 'nonce-{random}' https://fonts.googleapis.com`: Estilos permitidos apenas com nonce válido
4. `font-src 'self' https://fonts.gstatic.com`: Fontes permitidas do mesmo domínio e Google Fonts
5. `img-src 'self' data: https:`: Imagens permitidas do mesmo domínio, data URIs e HTTPS
6. `connect-src 'self'`: Conexões de rede permitidas apenas do mesmo domínio
7. `frame-src 'none'`: Desabilita completamente carregamento de iframes
8. `object-src 'none'`: Desabilita completamente carregamento de objetos
9. `base-uri 'self'`: Restringe URLs base ao mesmo domínio
10. `form-action 'self'`: Ações de formulário permitidas apenas no mesmo domínio
11. `manifest-src 'self'`: Manifestos de aplicativo permitidos apenas do mesmo domínio
12. `upgrade-insecure-requests`: Força upgrade de conexões HTTP para HTTPS
13. `block-all-mixed-content`: Bloqueia carregamento de recursos mistos (HTTP/HTTPS)
14. `require-trusted-types-for 'script'`: Requer uso de Trusted Types para scripts
15. `report-uri /csp-report`: Endpoint para relatórios de violações CSP

### Geração de Nonce

- Nonces são gerados usando criptografia forte (crypto.randomBytes)
- Um novo nonce é gerado para cada requisição
- Nonces são únicos e não reutilizáveis
- Comprimento mínimo de 128 bits (16 bytes em base64)

### Monitoramento e Relatórios

1. Implementação de endpoint `/csp-report` para receber violações
2. Logging de todas as violações para análise
3. Alertas em tempo real para violações críticas
4. Análise regular dos relatórios para ajuste da política

### Validação e Testes

1. Testes automatizados para verificar a presença de headers CSP
2. Validação de nonces em todos os recursos inline
3. Monitoramento de violações em ambiente de desenvolvimento
4. Testes de penetração regulares

### Recursos Externos

Apenas os seguintes domínios externos são permitidos:

1. fonts.googleapis.com (estilos Google Fonts)
2. fonts.gstatic.com (arquivos de fonte)

Qualquer novo recurso externo deve passar por:

1. Avaliação de segurança
2. Adição explícita à política CSP
3. Período de teste com report-only
4. Monitoramento contínuo

### Manutenção

1. Revisão mensal das políticas CSP
2. Análise de relatórios de violação
3. Atualização da documentação
4. Treinamento da equipe em segurança CSP
