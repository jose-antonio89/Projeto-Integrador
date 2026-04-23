const app = require('./app');
const connectDatabase = require('./config/db');
const ambiente = require('./config/ambiente');

// Inicia a conexão com o banco e sobe o servidor.
(async () => {
  try {
    await connectDatabase();
    app.listen(ambiente.port, () => {
      console.log(`Servidor rodando em http://localhost:${ambiente.port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
    process.exit(1);
  }
})();
