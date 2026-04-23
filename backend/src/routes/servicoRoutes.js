const express = require('express');
const controller = require('../controllers/servicoController');
const autenticacaoMiddleware = require('../middleware/autenticacaoMiddleware');
const { uploadServico } = require('../middleware/uploadArquivoMiddleware');

const router = express.Router();

// Listagem, filtro, criação e detalhe do serviço.
router.get('/', controller.listarTodos);
router.get('/categoria/:id', controller.buscarPorCategoria);
router.get('/category/:id', controller.buscarPorCategoria);
router.post('/', autenticacaoMiddleware, uploadServico.single('imagem_servico'), controller.criar);
router.get('/:id', controller.buscarPorId);

module.exports = router;
