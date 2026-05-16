
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const ambiente = require('../config/ambiente');
const { mapUsuario } = require('../utils/mapeadoresResposta');
const { sucesso, erro } = require('../utils/apiResponse');
const { obterCampo, normalizarTipoConta } = require('../utils/requisicaoUtils');

// regex simples para e-mail — valida formato básico sem consulta externa.
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// valida cpf: apenas dígitos, 11 caracteres, e verifica os dois dígitos verificadores.
function validarCpf(cpf) {
  const digits = String(cpf).replace(/\D/g, '');
  if (digits.length !== 11) return false;
  // rejeita sequências como 111.111.111-11
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calc = (fator) => {
    let soma = 0;
    for (let i = 0; i < fator - 1; i++) {
      soma += Number(digits[i]) * (fator - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 || resto === 11 ? 0 : resto;
  };

  return calc(10) === Number(digits[9]) && calc(11) === Number(digits[10]);
}

function normalizarCpf(cpf) {
  return String(cpf).replace(/\D/g, '');
}

// cadastro: valida campos, verifica e-mail e cpf únicos, cria o usuário.
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

    if (!REGEX_EMAIL.test(String(email).trim())) {
      return erro(res, 400, 'Informe um endereço de e-mail válido.');
    }

    if (String(senha).length < 8) {
      return erro(res, 400, 'A senha deve ter pelo menos 8 caracteres.');
    }

    const cpfNormalizado = normalizarCpf(cpf);
    if (!validarCpf(cpfNormalizado)) {
      return erro(res, 400, 'CPF inválido. Verifique os dígitos informados.');
    }

    const tipoContaNormalizado = normalizarTipoConta(tipoContaRecebido);
    if (!tipoContaNormalizado) {
      return erro(res, 400, 'Tipo de conta inválido.');
    }

    if (tipoContaNormalizado === 'Freelancer' && !areaAtuacaoRecebida) {
      return erro(res, 400, 'Área de atuação é obrigatória para freelancers.');
    }

    // verifica e-mail e cpf ao mesmo tempo para evitar duas queries sequenciais.
    const [emailExistente, cpfExistente] = await Promise.all([
      Usuario.findOne({ email: String(email).toLowerCase().trim() }),
      Usuario.findOne({ cpf: cpfNormalizado })
    ]);

    if (emailExistente) return erro(res, 409, 'Já existe um usuário cadastrado com este e-mail.');
    if (cpfExistente) return erro(res, 409, 'Já existe um usuário cadastrado com este CPF.');

    await Usuario.create({
      nome: String(nome).trim(),
      email: String(email).toLowerCase().trim(),
      senha: await bcrypt.hash(String(senha), 10),
      cpf: cpfNormalizado,
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

// login: retorna 401 genérico em ambos os casos (e-mail não encontrado ou senha errada)
// para não revelar se o e-mail existe no sistema.
exports.entrar = async (req, res) => {
  try {
    const email = obterCampo(req.body, ['email']);
    const senha = obterCampo(req.body, ['senha']);

    if (!email || !senha) {
      return erro(res, 400, 'E-mail e senha são obrigatórios.');
    }

    const usuario = await Usuario.findOne({ email: String(email).toLowerCase().trim() });
    const senhaCorreta = usuario ? await bcrypt.compare(String(senha), usuario.senha) : false;

    if (!usuario || !senhaCorreta) {
      return erro(res, 401, 'Credenciais inválidas.');
    }

    const token = jwt.sign(
      { id_usuario: usuario._id.toString(), nome: usuario.nome, tipo: usuario.tipoConta },
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
