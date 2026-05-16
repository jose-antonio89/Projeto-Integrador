/* script para página de edição de serviço: valida acesso, carrega dados do serviço, 
lida com upload de imagem, formata dados e envia para api */


// cuidado se for mexer nesse arquivo - ele tem bastante código repetido com anuncio.js 

document.addEventListener('DOMContentLoaded', async function() {
    const serviceId = new URLSearchParams(location.search).get('id');
    const user = await window.Workly.fetchCurrentUser(true);
    if (!window.Workly.getToken() || !user) { location.href = 'login.html'; return; }
    if (!serviceId) { location.href = 'perfil.html'; return; }

    // elementos do DOM essenciais para a funcionalidade da página
    const form = document.querySelector('.ad-form');
    const title = document.querySelector('.page-title');
    const category = document.getElementById('genero_servico');
    const nameInput = document.getElementById('adDescription');
    const descInput = document.getElementById('serviceDetails');
    const priceInput = document.getElementById('servicePrice');
    const priceNegotiableInput = document.querySelector('input[name="priceNegotiable"]');
    const priceByContactInput = document.querySelector('input[name="priceByContact"]');
    const coverImageInput = document.getElementById('coverImage');
    const uploadArea = document.getElementById('uploadArea');
    const imagePreview = document.getElementById('imagePreview');
    const charCount = document.getElementById('charCount');
    const cancelBtn = document.querySelector('.draft-btn');
    const submitBtn = document.querySelector('.submit-btn');
    const defaultServiceImage = window.Workly?.defaultServiceImage || '../assets/img/servicos/servico_padrao.svg';

    function renderCoverPreview(src = defaultServiceImage, alt = 'Capa do serviço') {
        if (!imagePreview) return;
        imagePreview.innerHTML = `<img src="${src}" alt="${alt}" onerror="this.src='${defaultServiceImage}'">`;
        imagePreview.classList.toggle('default-preview', src === defaultServiceImage);
        imagePreview.style.display = 'flex';
    }

    function syncPriceOptions() {
        if (!priceInput || !priceByContactInput) return;
        if (priceByContactInput.checked) {
            priceInput.value = '';
            priceInput.disabled = true;
            priceInput.placeholder = 'Valor a combinar';
            if (priceNegotiableInput) priceNegotiableInput.checked = false;
        } else {
            priceInput.disabled = false;
            priceInput.placeholder = '5000';
        }
    }

    uploadArea?.addEventListener('click', () => coverImageInput?.click());
    coverImageInput?.addEventListener('change', (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => renderCoverPreview(e.target.result, 'Nova capa');
        reader.readAsDataURL(file);
    });
    priceByContactInput?.addEventListener('change', syncPriceOptions);
    priceNegotiableInput?.addEventListener('change', () => {
        if (priceNegotiableInput.checked && priceByContactInput) priceByContactInput.checked = false;
        syncPriceOptions();
    });
    nameInput?.addEventListener('input', function(){ if (charCount) charCount.textContent = this.value.length; });
    cancelBtn?.addEventListener('click', () => location.href = `detalhe-servico.html?id=${serviceId}`);

    try {
        if (title) title.textContent = 'Carregando serviço...';
        const response = await window.Workly.apiFetch(`/api/servicos/${serviceId}`);
        const service = window.Workly.normalizeService(response.dados || response);
        if (String(service.idUsuario) !== String(user.idUsuario)) {
            await window.Workly.showAlert({ icon: 'error', title: 'Acesso negado', text: 'Você só pode editar serviços criados por você.' });
            location.href = `detalhe-servico.html?id=${serviceId}`;
            return;
        }
        if (title) title.textContent = 'Editar Serviço';
        if (category) category.value = service.categoriaId || '';
        if (nameInput) { nameInput.value = service.nome || ''; if (charCount) charCount.textContent = nameInput.value.length; }
        if (descInput) descInput.value = service.descricao || '';
        if (priceInput) priceInput.value = service.preco || '';
        if (priceNegotiableInput) priceNegotiableInput.checked = Boolean(service.precoNegociavel);
        if (priceByContactInput) priceByContactInput.checked = Boolean(service.valorCombinar);
        renderCoverPreview(service.imagemServico || defaultServiceImage);
        syncPriceOptions();
    } catch (error) {
        await window.Workly.showAlert({ icon: 'error', title: 'Erro ao carregar', text: error.message || 'Não foi possível carregar o serviço.' });
        location.href = 'perfil.html';
    }

    form?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const old = submitBtn?.innerHTML;
        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...'; }
        const formData = new FormData(form);
        if (formData.get('genero_id') && !formData.get('categoriaId')) formData.append('categoriaId', formData.get('genero_id'));
        try {
            await window.Workly.apiFetch(`/api/servicos/${serviceId}`, { method: 'PUT', body: formData });
            await window.Workly.showAlert({ icon: 'success', title: 'Serviço atualizado!', text: 'As alterações foram salvas com sucesso.' });
            location.href = `detalhe-servico.html?id=${serviceId}`;
        } catch (error) {
            window.Workly.showAlert({ icon: 'error', title: 'Erro ao salvar', text: error.message || 'Não foi possível atualizar o serviço.' });
        } finally {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = old; }
        }
    });
});
