
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true },
    // cpf armazenado apenas com dígitos (sem formatação) e único por cadastro.
    cpf: { type: String, required: true, unique: true, trim: true },
    telefone: { type: String, default: '', trim: true },
    tipoConta: { type: String, enum: ['Freelancer', 'Contratante'], required: true },
    areaAtuacao: { type: String, default: '', trim: true },
    fotoPerfil: { type: String, default: '/uploads/perfis/perfil_padrao.svg' },
    tituloProfissional: { type: String, default: '', trim: true },
    bio: { type: String, default: '', trim: true },
    localizacao: { type: String, default: '', trim: true },
    site: { type: String, default: '', trim: true },
    linkedin: { type: String, default: '', trim: true },
    github: { type: String, default: '', trim: true },
    instagram: { type: String, default: '', trim: true },
    portfolioTitulo: { type: String, default: '', trim: true },
    portfolioDescricao: { type: String, default: '', trim: true },
    portfolioUrl: { type: String, default: '', trim: true },
    disponibilidade: { type: String, default: '', trim: true },
    precoHora: { type: String, default: '', trim: true },
    metodoPagamento: { type: String, default: '', trim: true },
    chavePix: { type: String, default: '', trim: true },
    banco: { type: String, default: '', trim: true },
    notificacoesEmail: { type: Boolean, default: true },
    notificacoesPropostas: { type: Boolean, default: true },
    notificacoesMarketing: { type: Boolean, default: false },
    doisFatores: { type: Boolean, default: false },
    avaliacaoMedia: { type: Number, default: 0 },
    totalAvaliacoes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Usuario', usuarioSchema);
