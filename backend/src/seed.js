const bcrypt = require('bcryptjs');
const connectDatabase = require('./config/db');
const Categoria = require('./models/Categoria');
const Servico = require('./models/Servico');
const Usuario = require('./models/Usuario');

async function executarSeed() {
  await connectDatabase();

  await Promise.all([
    Usuario.deleteMany({}),
    Servico.deleteMany({})
  ]);

  const categorias = await Categoria.find({}).sort({ legacyId: 1 });
  const categoriaPorId = Object.fromEntries(categorias.map(categoria => [categoria.legacyId, categoria]));

  const senha = await bcrypt.hash('12345678', 10);

  const [carlos, marina, vitor] = await Usuario.create([
    {
      nome: 'Carlos Souza',
      email: 'carlos@workly.com',
      senha,
      cpf: '123.456.789-00',
      telefone: '(14) 99999-0001',
      tipoConta: 'Freelancer',
      areaAtuacao: '2',
      tituloProfissional: 'Desenvolvedor Full Stack',
      bio: 'Crio sites, APIs e soluções web sob medida.',
      localizacao: 'Jaú - SP',
      site: 'https://workly.dev/carlos',
      github: 'carlossouza'
    },
    {
      nome: 'Marina Alves',
      email: 'marina@workly.com',
      senha,
      cpf: '987.654.321-00',
      telefone: '(14) 99999-0002',
      tipoConta: 'Freelancer',
      areaAtuacao: '1',
      tituloProfissional: 'Designer de Interfaces',
      bio: 'Especialista em identidade visual e UI.',
      localizacao: 'Bauru - SP',
      instagram: '@marina.design'
    },
    {
      nome: 'Vitor Gabriel',
      email: 'vitor@workly.com',
      senha,
      cpf: '111.222.333-44',
      telefone: '(14) 99999-0003',
      tipoConta: 'Contratante',
      areaAtuacao: ''
    }
  ]);

  await Servico.create([
    {
      nome: 'Landing Page responsiva',
      descricao: 'Criação de landing page com foco em conversão e versão mobile.',
      preco: 650,
      extra: 'Entrega em até 5 dias',
      imagemServico: '/uploads/servicos/exemplo_landing.jpg',
      categoria: categoriaPorId[2]._id,
      freelancer: carlos._id
    },
    {
      nome: 'Identidade visual completa',
      descricao: 'Logo, paleta, tipografia e aplicações para sua marca.',
      preco: 850,
      extra: 'Inclui manual da marca',
      imagemServico: '/uploads/servicos/exemplo_design.jpg',
      categoria: categoriaPorId[1]._id,
      freelancer: marina._id
    }
  ]);

  console.log('Seed executada com sucesso.');
  process.exit(0);
}

executarSeed().catch((error) => {
  console.error('Erro ao executar seed:', error);
  process.exit(1);
});
