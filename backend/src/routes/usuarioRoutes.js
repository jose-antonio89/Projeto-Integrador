const express = require('express');
const controller = require('../controllers/usuarioController');
const autenticacaoMiddleware = require('../middleware/autenticacaoMiddleware');
const { uploadPerfil } = require('../middleware/uploadArquivoMiddleware');

const router = express.Router();

// Rotas do perfil do usuário.
router.get('/perfil', autenticacaoMiddleware, controller.buscarPerfil);
router.put('/perfil', autenticacaoMiddleware, controller.atualizarPerfil);
router.post('/perfil/foto', autenticacaoMiddleware, uploadPerfil.single('nova_foto'), controller.atualizarFoto);
router.delete('/perfil', autenticacaoMiddleware, controller.excluirPerfil);

// Alias antigos para manter compatibilidade com código anterior.
router.get('/profile', autenticacaoMiddleware, controller.buscarPerfil);
router.put('/profile', autenticacaoMiddleware, controller.atualizarPerfil);
router.post('/profile/photo', autenticacaoMiddleware, uploadPerfil.single('nova_foto'), controller.atualizarFoto);
router.delete('/profile', autenticacaoMiddleware, controller.excluirPerfil);

module.exports = router;
