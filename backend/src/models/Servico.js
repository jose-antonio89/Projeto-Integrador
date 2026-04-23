const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    descricao: { type: String, required: true, trim: true },
    preco: { type: Number, required: true },
    extra: { type: String, default: '', trim: true },
    imagemServico: { type: String, required: true },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Servico', servicoSchema);
