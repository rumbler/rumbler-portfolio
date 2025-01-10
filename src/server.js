const express = require('express');
const crypto = require('crypto');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// set up rate limiter: maximum of sixteen requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 16, // 16 requisições por minuto
  message: 'Limite de requisições excedido. Tente novamente em um minuto.'
});

// apply rate limiter to all requests
app.use(limiter);

// Configurações básicas de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_DOMAIN : 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para gerar nonce
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

// Middleware CSP
app.use((req, res, next) => {
  const nonce = res.locals.nonce;
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; ` +
    `script-src 'self' 'nonce-${nonce}'; ` +
    `style-src 'self' 'nonce-${nonce}'; ` +
    `font-src 'self'; ` +
    `img-src 'self' data: https:; ` +
    `connect-src 'self'; ` +
    `frame-src 'none'; ` +
    `object-src 'none'; ` +
    `base-uri 'self'; ` +
    `form-action 'self'; ` +
    `manifest-src 'self'; ` +
    `require-trusted-types-for 'script'; ` +
    `upgrade-insecure-requests; ` +
    `block-all-mixed-content; ` +
    `report-uri /csp-report;`
  );
  next();
});

// Endpoint para relatórios CSP
app.post('/csp-report', express.json({ type: 'application/csp-report' }), (req, res) => {
  try {
    console.log('CSP Violation:', req.body);
    res.status(204).end();
  } catch (error) {
    console.error('Error processing CSP report:', error);
    res.status(500).end();
  }
});

// Servir arquivos estáticos
app.use(express.static(path.join('/app/build'), {
  maxAge: '1y',
  etag: true
}));

// Rota principal
app.get('*', (req, res) => {
  try {
    const indexPath = path.join('/app/build/index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error sending index.html:', err);
        res.status(500).send('Error loading page');
      }
    });
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal Server Error');
});

// Iniciar servidor com tratamento de erro
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});

// Tratamento de sinais de encerramento
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
