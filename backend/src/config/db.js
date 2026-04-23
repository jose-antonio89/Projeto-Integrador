const mongoose = require('mongoose');
const ambiente = require('./ambiente');
const Categoria = require('../models/Categoria');

// Categorias padrão usadas nas páginas do projeto.
const categoriasPadrao = [
  { legacyId: 1, nome: 'Design', slug: 'design' },
  { legacyId: 2, nome: 'Programação', slug: 'programacao' },
  { legacyId: 3, nome: 'Vídeo/Edição', slug: 'video-edicao' },
  { legacyId: 4, nome: 'Inteligência Artificial', slug: 'inteligencia-artificial' },
  { legacyId: 5, nome: 'Tradução/Escritor', slug: 'traducao-escritor' },
  { legacyId: 6, nome: 'Fotografia', slug: 'fotografia' },
  { legacyId: 7, nome: 'Áudio/Música', slug: 'audio-musica' }
];

async function garantirCategorias() {
  for (const categoria of categoriasPadrao) {
    await Categoria.updateOne(
      { legacyId: categoria.legacyId },
      { $setOnInsert: categoria },
      { upsert: true }
    );
  }
}

async function connectDatabase() {
  await mongoose.connect(ambiente.mongoUri);
  await garantirCategorias();
  console.log('MongoDB conectado com sucesso.');
}

module.exports = connectDatabase;
