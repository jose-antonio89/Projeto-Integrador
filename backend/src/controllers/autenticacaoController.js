const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const ambiente = require('../config/ambiente');
const { mapUsuario } = require('../utils/mapeadoresResposta');
const { sucesso, erro } = require('../utils/apiResponse');
const { obterCampo, normalizarTipoConta } = require('../utils/requisicaoUtils');

exports.cadastrar = async (req, res) => {
  try {
    const nome = obterCampo(req.body, ['nome']);
    const email = obterCampo(req.body, ['email']);
    const senha = obterCampo(req.body, ['senha']);
    const cpf = obterCampo(req.body, ['cpf']);
    const telefone = obterCampo(req.body, ['telefone']);
    const tipoContaRecebido = obterCampo(req.body, ['tipoConta', 'tipo_conta']);
    const areaAtuacaoRecebida = obterCampo(req.body, ['areaAtuacao', 'area_atuacao']);

    if (!nome || !email || !senha || !cpf || !tipoContaRecebido) {
      return erro(res, 400, 'Todos os campos obrigatórios devem ser preenchidos.');
    }

    const tipoContaNormalizado = normalizarTipoConta(tipoContaRecebido);
    if (!tipoContaNormalizado) {
      return erro(res, 400, 'Tipo de conta inválido.');
    }

    if (tipoContaNormalizado === 'Freelancer' && !areaAtuacaoRecebida) {
      return erro(res, 400, 'Área de atuação é obrigatória para freelancers.');
    }

    const usuarioExistente = await Usuario.findOne({ email: String(email).toLowerCase().trim() });
    if (usuarioExistente) {
      return erro(res, 409, 'Já existe um usuário cadastrado com este e-mail.');
    }

    await Usuario.create({
      nome: String(nome).trim(),
      email: String(email).toLowerCase().trim(),
      senha: await bcrypt.hash(String(senha), 10),
      cpf: String(cpf).trim(),
      telefone: telefone ? String(telefone).trim() : '',
      tipoConta: tipoContaNormalizado,
      areaAtuacao: tipoContaNormalizado === 'Freelancer' ? String(areaAtuacaoRecebida || '').trim() : ''
    });

    return sucesso(res, 201, 'Cadastro realizado com sucesso!');
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro ao cadastrar usuário.');
  }
};

exports.entrar = async (req, res) => {
  try {
    const email = obterCampo(req.body, ['email']);
    const senha = obterCampo(req.body, ['senha']);

    if (!email || !senha) {
      return erro(res, 400, 'Email e senha são obrigatórios.');
    }

    const usuario = await Usuario.findOne({ email: String(email).toLowerCase().trim() });
    if (!usuario) {
      return erro(res, 404, 'Usuário não encontrado.');
    }

    const senhaCorreta = await bcrypt.compare(String(senha), usuario.senha);
    if (!senhaCorreta) {
      return erro(res, 401, 'Senha incorreta.');
    }

    const token = jwt.sign(
      {
        id_usuario: usuario._id.toString(),
        nome: usuario.nome,
        tipo: usuario.tipoConta
      },
      ambiente.jwtSecret,
      { expiresIn: '7d' }
    );

    return sucesso(res, 200, 'Login realizado com sucesso.', null, {
      token,
      user: mapUsuario(req, usuario)
    });
  } catch (error) {
    console.error(error);
    return erro(res, 500, 'Erro no servidor.');
  }
};

exports.register = exports.cadastrar;
exports.login = exports.entrar;
