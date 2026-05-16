
document.addEventListener('DOMContentLoaded', async () => {
  const id = new URLSearchParams(location.search).get('id');
  const $ = (selector) => document.querySelector(selector);
  if (!id) { location.href = 'todos-servicos.html'; return; }

  function stars(value) {
    const rating = Number(value || 0);
    return Array.from({ length: 5 }, (_, i) => `<i class="${i < Math.round(rating) ? 'fas' : 'far'} fa-star"></i>`).join('');
  }

  try {
    $('#publicServices').innerHTML = window.Workly.loadingMarkup('Carregando perfil público...');
    const response = await window.Workly.apiFetch(`/api/usuarios/publico/${id}`);
    const user = window.Workly.normalizeUser(response.user || response.dados?.user);
    const services = (response.services || response.dados?.services || []).map(window.Workly.normalizeService);
    const reviews = response.reviews || response.dados?.reviews || [];
    const summary = response.reviewSummary || response.dados?.reviewSummary || {};
    const isContractor = String(user.tipoConta || '').toLowerCase().includes('contratante') && !services.length;

    document.title = `Workly - ${user.nome || 'Perfil público'}`;
    $('#publicAvatar').src = user.fotoPerfil || window.Workly.defaultProfileImage;
    $('#publicName').textContent = user.nome || 'Usuário Workly';
    $('#publicTitle').textContent = user.tituloProfissional || `${user.tipoConta || 'Usuário'}${user.areaAtuacao ? ' • ' + user.areaAtuacao : ''}`;
    $('#publicBio').textContent = user.bio || (isContractor ? 'Contratante da plataforma Workly.' : 'Este usuário ainda não adicionou uma biografia.');
    $('#publicServicesCount').textContent = services.length;
    $('#publicRating').textContent = summary.total ? `${Number(summary.mediaFreelancer || 0).toFixed(1).replace('.', ',')}` : '--';
    $('#publicAccountType').textContent = user.tipoConta || '--';

    $('#publicContractorBox').hidden = !isContractor;
    $('#publicServicesSection').hidden = isContractor;
    $('#publicServices').innerHTML = services.length
      ? services.map(service => window.Workly.serviceCardMarkup(service)).join('')
      : '<div class="empty-state-card"><h3>Nenhum serviço publicado</h3><p>Este usuário ainda não possui serviços públicos.</p></div>';

    $('#publicReviews').innerHTML = reviews.length
      ? reviews.map(review => `
        <article class="review-item">
          <div class="review-header"><strong>${review.autor?.nome || 'Cliente'}</strong><span>${stars(review.notaFreelancer)}</span></div>
          <p>${review.comentario || 'Sem comentário.'}</p>
          <small>${review.servico?.nome || 'Serviço avaliado'}</small>
        </article>
      `).join('')
      : '<div class="empty-state-card"><h3>Sem avaliações</h3><p>As avaliações recebidas aparecerão aqui.</p></div>';
  } catch (error) {
    await window.Workly.showAlert({ icon: 'error', title: 'Perfil não encontrado', text: error.message || 'Não foi possível carregar este perfil.' });
    location.href = 'todos-servicos.html';
  }
});
