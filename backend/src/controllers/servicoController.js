const Categoria = require('../models/Categoria');
const Servico = require('../models/Servico');
const Usuario = require('../models/Usuario');
const { mapServico } = require('../utils/mapeadoresResposta');
const { sucesso, erro } = require('../utils/apiResponse');
const { obterCampo } = require('../utils/requisicaoUtils');
const { removerArquivoSeExistir } = require('../utils/arquivoUtils');

async function listarServicos(filtro = {}) {
  return Servico.find(filtro)
    .populate('categoria')
    .populate('freelancer')
    .sort({ createdAt: -1 });
}

exports.listarTodos = async (req, res) => {
  try {
    const servicos = await listarServicos();
    return sucesso(res, 200, 'Serviços carregados com sucesso.', servicos.map(servico => mapServico(req, servico)));
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao buscar serviços.');
  }
};

exports.buscarPorCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findOne({ legacyId: Number(req.params.id) });
    if (!categoria) {
      return sucesso(res, 200, 'Categoria não encontrada.', []);
    }

    const servicos = await listarServicos({ categoria: categoria._id });
    return sucesso(res, 200, 'Serviços da categoria carregados com sucesso.', servicos.map(servico => mapServico(req, servico)));
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao buscar serviços por categoria.');
  }
};

exports.criar = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id_usuario);
    if (!usuario || usuario.tipoConta !== 'Freelancer') {
      if (req.file) removerArquivoSeExistir(`/uploads/servicos/${req.file.filename}`);
      return erro(res, 403, 'Acesso negado. Este usuário não é um freelancer.');
    }

    const nome = obterCampo(req.body, ['nome']);
    const descricao = obterCampo(req.body, ['descricao']);
    const preco = obterCampo(req.body, ['preco']);
    const categoriaIdRecebido = obterCampo(req.body, ['categoriaId', 'genero_id']);
    const extra = obterCampo(req.body, ['extra']);

    if (!nome || !descricao || !preco || !categoriaIdRecebido || !req.file) {
      if (req.file) removerArquivoSeExistir(`/uploads/servicos/${req.file.filename}`);
      return erro(res, 400, 'Campos incompletos.');
    }

    const categoria = await Categoria.findOne({ legacyId: Number(categoriaIdRecebido) });
    if (!categoria) {
      removerArquivoSeExistir(`/uploads/servicos/${req.file.filename}`);
      return erro(res, 400, 'Categoria inválida.');
    }

    const servico = await Servico.create({
      nome: String(nome).trim(),
      descricao: String(descricao).trim(),
      preco: Number(preco),
      extra: String(extra || '').trim(),
      imagemServico: `/uploads/servicos/${req.file.filename}`,
      categoria: categoria._id,
      freelancer: usuario._id
    });

    const servicoCompleto = await Servico.findById(servico._id).populate('categoria').populate('freelancer');
    return sucesso(res, 201, 'Serviço criado com sucesso!', mapServico(req, servicoCompleto));
  } catch (error) {
    console.error(error);
    if (req.file) removerArquivoSeExistir(`/uploads/servicos/${req.file.filename}`);
    return erro(res, 500, error.message || 'Erro ao criar o serviço.');
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const servico = await Servico.findById(req.params.id).populate('categoria').populate('freelancer');
    if (!servico) {
      return erro(res, 404, 'Serviço não encontrado.');
    }

    return sucesso(res, 200, 'Serviço carregado com sucesso.', mapServico(req, servico));
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao buscar serviço.');
  }
};

exports.getAll = exports.listarTodos;
exports.getByCategoria = exports.buscarPorCategoria;
exports.getById = exports.buscarPorId;
exports.create = exports.criar;
