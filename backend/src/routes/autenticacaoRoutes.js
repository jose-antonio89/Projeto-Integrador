const express = require('express');
const controller = require('../controllers/autenticacaoController');

const router = express.Router();

// Cadastro e login.
router.post('/cadastro', controller.cadastrar);
router.post('/login', controller.entrar);

// Alias antigos para não quebrar integrações já existentes.
router.post('/register', controller.cadastrar);

module.exports = router;
