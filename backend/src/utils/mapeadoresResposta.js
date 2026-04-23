function montarUrlImagem(req, caminho) {
  if (!caminho) return '';
  if (caminho.startsWith('http')) return caminho;
  return `${req.protocol}://${req.get('host')}${caminho}`;
}

function mapUsuario(req, usuario) {
  const base = {
    idUsuario: usuario._id.toString(),
    nome: usuario.nome,
    email: usuario.email,
    cpf: usuario.cpf,
    telefone: usuario.telefone || '',
    tipoConta: usuario.tipoConta,
    areaAtuacao: usuario.areaAtuacao || '',
    fotoPerfil: montarUrlImagem(req, usuario.fotoPerfil),
    tituloProfissional: usuario.tituloProfissional || '',
    bio: usuario.bio || '',
    localizacao: usuario.localizacao || '',
    site: usuario.site || '',
    linkedin: usuario.linkedin || '',
    github: usuario.github || '',
    instagram: usuario.instagram || ''
  };

  return {
    ...base,
    id_usuario: base.idUsuario,
    tipo_conta: base.tipoConta,
    area_atuacao: base.areaAtuacao,
    foto_perfil: base.fotoPerfil,
    professional_title: base.tituloProfissional,
    location: base.localizacao,
    website: base.site
  };
}

function mapServico(req, servico) {
  const freelancer = servico.freelancer || {};
  const categoria = servico.categoria || {};

  const base = {
    idServico: servico._id.toString(),
    nome: servico.nome,
    descricao: servico.descricao,
    preco: servico.preco,
    extra: servico.extra || '',
    imagemServico: montarUrlImagem(req, servico.imagemServico),
    categoriaId: categoria.legacyId || null,
    nomeCategoria: categoria.nome || '',
    slugCategoria: categoria.slug || '',
    idUsuario: freelancer._id ? freelancer._id.toString() : null,
    nomeFreelancer: freelancer.nome || '',
    fotoPerfil: montarUrlImagem(req, freelancer.fotoPerfil || '/uploads/perfis/perfil_padrao.png')
  };

  return {
    ...base,
    id_servico: base.idServico,
    id: base.idServico,
    imagem_servico: base.imagemServico,
    genero_id: base.categoriaId,
    nome_genero: base.nomeCategoria,
    id_usuario: base.idUsuario,
    nome_freelancer: base.nomeFreelancer,
    foto_perfil: base.fotoPerfil
  };
}

module.exports = { mapUsuario, mapServico };
