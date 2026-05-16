
const Notificacao = require('../models/Notificacao');
const { sucesso, erro } = require('../utils/apiResponse');

function usuarioId(req) {
  return req.user.id_usuario || req.user.idUsuario;
}

// lista as notificações do usuário logado, mais recentes primeiro.
// aceita ?lida=false para trazer apenas as não lidas.
// busca as notificações do usuário logado.
// o front usa isso no dropdown do sino.
exports.listar = async (req, res) => {
  try {
    const userId = usuarioId(req);
    const filtro = { destinatario: userId };

    if (req.query.lida === 'false') filtro.lida = false;
    if (req.query.lida === 'true') filtro.lida = true;

    const pagina = Math.max(Number(req.query.page || 1), 1);
    const limite = Math.min(Number(req.query.limit || 20), 50);

    const [notificacoes, total] = await Promise.all([
      Notificacao.find(filtro)
        .sort({ createdAt: -1 })
        .skip((pagina - 1) * limite)
        .limit(limite),
      Notificacao.countDocuments(filtro)
    ]);

    return sucesso(res, 200, 'Notificações carregadas.', notificacoes, {
      pagination: { page: pagina, limit: limite, total, totalPages: Math.ceil(total / limite) }
    });
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao buscar notificações.');
  }
};

// retorna apenas a contagem de notificações não lidas — útil para o badge no header.
exports.contarNaoLidas = async (req, res) => {
  try {
    const total = await Notificacao.countDocuments({
      destinatario: usuarioId(req),
      lida: false
    });
    return sucesso(res, 200, 'Contagem carregada.', { naoLidas: total });
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao contar notificações.');
  }
};

// marca uma notificação específica como lida.
exports.marcarLida = async (req, res) => {
  try {
    const notificacao = await Notificacao.findOneAndUpdate(
      { _id: req.params.id, destinatario: usuarioId(req) },
      { lida: true },
      { new: true }
    );
    if (!notificacao) return erro(res, 404, 'Notificação não encontrada.');
    return sucesso(res, 200, 'Notificação marcada como lida.', notificacao);
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao atualizar notificação.');
  }
};

// marca todas as notificações do usuário como lidas de uma vez.
exports.marcarTodasLidas = async (req, res) => {
  try {
    const { modifiedCount } = await Notificacao.updateMany(
      { destinatario: usuarioId(req), lida: false },
      { lida: true }
    );
    return sucesso(res, 200, `${modifiedCount} notificação(ões) marcada(s) como lida(s).`, { atualizadas: modifiedCount });
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao atualizar notificações.');
  }
};

// remove uma notificação específica do usuário.
exports.remover = async (req, res) => {
  try {
    const notificacao = await Notificacao.findOneAndDelete({
      _id: req.params.id,
      destinatario: usuarioId(req)
    });
    if (!notificacao) return erro(res, 404, 'Notificação não encontrada.');
    return sucesso(res, 200, 'Notificação removida.', { removida: true });
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao remover notificação.');
  }
};
