const path = require('path');
const dotenv = require('dotenv');

// Carrega as variáveis do arquivo .env do backend.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/workly',
  jwtSecret: process.env.JWT_SECRET || 'workly_dev_secret',
  frontendUrl: process.env.FRONTEND_URL || '*'
};
