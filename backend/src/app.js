const express = require('express');
const cors = require('cors');
const path = require('path');
const ambiente = require('./config/ambiente');
const rotasAutenticacao = require('./routes/autenticacaoRoutes');
const rotasServico = require('./routes/servicoRoutes');
const rotasUsuario = require('./routes/usuarioRoutes');
const { erro } = require('./utils/apiResponse');

const app = express();

app.use(cors({ origin: ambiente.frontendUrl === '*' ? true : ambiente.frontendUrl }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.use('/api/autenticacao', rotasAutenticacao);
app.use('/api/servicos', rotasServico);
app.use('/api/usuarios', rotasUsuario);

app.get('/', (_req, res) => {
  res.json({ sucesso: true, mensagem: 'API Workly rodando com MongoDB.', message: 'API Workly rodando com MongoDB.' });
});

app.use((_req, res) => erro(res, 404, 'Rota não encontrada.'));

app.use((error, _req, res, _next) => {
  console.error(error);
  if (error?.name === 'MulterError') {
    return erro(res, 400, 'Erro no upload do arquivo.');
  }
  return erro(res, 500, error.message || 'Erro interno do servidor.');
});

module.exports = app;
