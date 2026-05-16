
document.addEventListener('DOMContentLoaded', async () => {
  const id = new URLSearchParams(location.search).get('id');
  const $ = (s) => document.querySelector(s);
  const form = $('#proposal-form');
  const msg = $('#mensagem');
  const count = $('#char-count');
  let service = null;

  if (!window.Workly.getToken()) { location.href = 'login.html'; return; }
  if (!id) { location.href = 'todos-servicos.html'; return; }
  $('#back-to-service').href = `detalhe-servico.html?id=${encodeURIComponent(id)}`;

  try {
    const currentUser = await window.Workly.fetchCurrentUser(true).catch(() => null);
    const res = await window.Workly.apiFetch(`/api/servicos/${id}`);
    service = window.Workly.normalizeService(res.dados || res);
    if (currentUser && String(currentUser.idUsuario) === String(service.idUsuario)) {
      toast('Você não pode contratar o próprio serviço.');
      setTimeout(() => location.href = 'perfil.html', 900);
      return;
    }
    render(service);
  } catch (e) {
    toast(e.message || 'Erro ao carregar serviço.');
    setTimeout(() => location.href = 'todos-servicos.html', 1100);
  }

  msg?.addEventListener('input', () => { if (count) count.textContent = msg.value.length; });

  form?.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!service) return;
    const fd = new FormData(form);
    const mensagem = String(fd.get('mensagem') || '').trim();
    const precoProposto = fd.get('precoProposto');

    if (!mensagem) { toast('Escreva uma mensagem para o freelancer.'); return; }
    const btn = form.querySelector('button[type="submit"]');
    const old = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    try {
      await window.Workly.apiFetch('/api/contratos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servicoId: id, precoProposto, mensagem })
      });
      toast('Proposta enviada com sucesso!');
      setTimeout(() => location.href = 'contratos.html', 900);
    } catch (e) {
      toast(e.message || 'Não foi possível enviar a proposta.');
      btn.disabled = false;
      btn.innerHTML = old;
    }
  });

  function render(s) {
    $('#service-image').src = s.imagemServico || '../assets/img/servicos/servico_padrao.svg';
    $('#service-image').onerror = () => $('#service-image').src = '../assets/img/servicos/servico_padrao.svg';
    $('#service-title').textContent = s.nome || 'Serviço';
    $('#service-description').textContent = s.descricao || 'Sem descrição.';
    $('#service-category').innerHTML = `<i class="fas fa-layer-group"></i> ${esc(s.nomeCategoria || 'Categoria')}`;
    $('#freelancer-photo').src = s.fotoPerfil || window.Workly.defaultProfileImage;
    $('#freelancer-photo').onerror = () => $('#freelancer-photo').src = window.Workly.defaultProfileImage;
    $('#freelancer-name').textContent = s.nomeFreelancer || 'Freelancer';
    $('#service-price-label').textContent = s.valorCombinar ? 'Valor a combinar' : `Base: ${window.Workly.formatCurrency(s.preco || 0)}`;
    if (s.valorCombinar) {
      $('#proposal-title').textContent = 'Combinar valor do serviço';
      $('#proposal-helper').textContent = 'Este serviço não tem preço fechado. Envie sua necessidade para o freelancer montar uma proposta.';
      $('#price-help').textContent = 'Opcional: informe um valor se quiser sugerir um orçamento inicial.';
    }
  }

  function toast(message) {
    let t = document.querySelector('.module-toast');
    if (!t) { t = document.createElement('div'); t.className = 'module-toast'; document.body.appendChild(t); }
    t.textContent = message;
    t.classList.add('show');
    clearTimeout(window.__negotiationToast);
    window.__negotiationToast = setTimeout(() => t.classList.remove('show'), 2600);
  }

  function esc(t='') { return String(t).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }
});
