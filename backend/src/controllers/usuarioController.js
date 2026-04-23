const Servico = require('../models/Servico');
const Usuario = require('../models/Usuario');
const { mapServico, mapUsuario } = require('../utils/mapeadoresResposta');
const { sucesso, erro } = require('../utils/apiResponse');
const { obterCampo } = require('../utils/requisicaoUtils');
const { removerArquivoSeExistir } = require('../utils/arquivoUtils');

exports.buscarPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id_usuario);
    if (!usuario) {
      return erro(res, 404, 'Usuário não encontrado.');
    }

    let servicos = [];
    if (usuario.tipoConta === 'Freelancer') {
      const servicosDoUsuario = await Servico.find({ freelancer: usuario._id })
        .populate('categoria')
        .populate('freelancer')
        .sort({ createdAt: -1 });
      servicos = servicosDoUsuario.map(servico => mapServico(req, servico));
    }

    return sucesso(res, 200, 'Perfil carregado com sucesso.', null, {
      user: mapUsuario(req, usuario),
      services: servicos
    });
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao buscar usuário.');
  }
};

exports.atualizarPerfil = async (req, res) => {
  try {
    const email = obterCampo(req.body, ['email']);
    const nome = obterCampo(req.body, ['nome']);

    const camposPermitidos = {
      nome,
      email: email ? String(email).toLowerCase().trim() : undefined,
      telefone: obterCampo(req.body, ['telefone']),
      tituloProfissional: obterCampo(req.body, ['tituloProfissional', 'professional_title']),
      bio: obterCampo(req.body, ['bio']),
      localizacao: obterCampo(req.body, ['localizacao', 'location']),
      site: obterCampo(req.body, ['site', 'website']),
      linkedin: obterCampo(req.body, ['linkedin']),
      github: obterCampo(req.body, ['github']),
      instagram: obterCampo(req.body, ['instagram'])
    };

    Object.keys(camposPermitidos).forEach((chave) => {
      if (camposPermitidos[chave] === undefined) {
        delete camposPermitidos[chave];
      }
    });

    const usuario = await Usuario.findByIdAndUpdate(req.user.id_usuario, camposPermitidos, { new: true, runValidators: true });
    if (!usuario) {
      return erro(res, 404, 'Usuário não encontrado.');
    }

    return sucesso(res, 200, 'Perfil atualizado com sucesso!', null, {
      user: mapUsuario(req, usuario)
    });
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao atualizar perfil.');
  }
};

exports.atualizarFoto = async (req, res) => {
  try {
    if (!req.file) {
      return erro(res, 400, 'Nenhuma imagem enviada.');
    }

    const usuarioAnterior = await Usuario.findById(req.user.id_usuario);
    if (!usuarioAnterior) {
      removerArquivoSeExistir(`/uploads/perfis/${req.file.filename}`);
      return erro(res, 404, 'Usuário não encontrado.');
    }

    const caminhoBanco = `/uploads/perfis/${req.file.filename}`;
    const usuario = await Usuario.findByIdAndUpdate(req.user.id_usuario, { fotoPerfil: caminhoBanco }, { new: true });

    if (usuarioAnterior.fotoPerfil && !usuarioAnterior.fotoPerfil.endsWith('perfil_padrao.png')) {
      removerArquivoSeExistir(usuarioAnterior.fotoPerfil);
    }

    return sucesso(res, 200, 'Foto de perfil atualizada com sucesso!', null, {
      filePath: `${req.protocol}://${req.get('host')}${caminhoBanco}`,
      user: mapUsuario(req, usuario)
    });
  } catch (error) {
    console.error(error);
    return erro(res, 500, error.message || 'Erro ao atualizar a foto de perfil.');
  }
};

exports.excluirPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id_usuario);
    if (!usuario) {
      return erro(res, 404, 'Usuário não encontrado.');
    }

    const servicos = await Servico.find({ freelancer: req.user.id_usuario });
    servicos.forEach((servico) => removerArquivoSeExistir(servico.imagemServico));
    await Servico.deleteMany({ freelancer: req.user.id_usuario });

    if (usuario.fotoPerfil && !usuario.fotoPerfil.endsWith('perfil_padrao.png')) {
      removerArquivoSeExistir(usuario.fotoPerfil);
    }

    await Usuario.findByIdAndDelete(req.user.id_usuario);
    return sucesso(res, 200, 'Conta excluída com sucesso!');
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao excluir a conta.');
  }
};

exports.getProfile = exports.buscarPerfil;
exports.updateProfile = exports.atualizarPerfil;
exports.updatePhoto = exports.atualizarFoto;
exports.deleteProfile = exports.excluirPerfil;
