
const path = require('path');
const dotenv = require('dotenv');

// carrega o .env do backend. se não tiver .env, ele usa os valores de desenvolvimento logo abaixo.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/workly',

  // em projeto local esse fallback ajuda, mas no .env real é melhor trocar por uma chave grande.
  jwtSecret: process.env.JWT_SECRET || 'workly_dev_secret',

  // com * fica tranquilo testar com live server. em produção, coloque o domínio do frontend.
  frontendUrl: process.env.FRONTEND_URL || '*',

  // controla se o banco vai receber os dados demo automaticamente ao iniciar o servidor.
  autoSeed: String(process.env.AUTO_SEED || 'false').toLowerCase() === 'true'
};
