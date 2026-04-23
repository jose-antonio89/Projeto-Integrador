const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true },
    cpf: { type: String, required: true, trim: true },
    telefone: { type: String, default: '', trim: true },
    tipoConta: { type: String, enum: ['Freelancer', 'Contratante'], required: true },
    areaAtuacao: { type: String, default: '', trim: true },
    fotoPerfil: { type: String, default: '/uploads/perfis/perfil_padrao.png' },
    tituloProfissional: { type: String, default: '', trim: true },
    bio: { type: String, default: '', trim: true },
    localizacao: { type: String, default: '', trim: true },
    site: { type: String, default: '', trim: true },
    linkedin: { type: String, default: '', trim: true },
    github: { type: String, default: '', trim: true },
    instagram: { type: String, default: '', trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Usuario', usuarioSchema);
