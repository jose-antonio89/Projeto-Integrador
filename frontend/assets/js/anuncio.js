// script para página de criação de anúncio: valida acesso, lida com upload de imagem, formata dados e envia para api
document.addEventListener('DOMContentLoaded', async function() {
    const user = await window.Workly.fetchCurrentUser(true);

    if (!window.Workly.getToken() || !user) {
        await window.Workly.showAlert({
            icon: 'warning',
            title: 'Faça login primeiro',
            text: 'Você precisa estar logado para publicar um anúncio.',
            confirmText: 'Ir para login'
        });
        window.location.href = 'login.html';
        return;
    }

    if (user.tipoConta !== 'Freelancer') {
        await window.Workly.showAlert({
            icon: 'error',
            title: 'Acesso restrito',
            text: 'Somente contas Freelancer podem publicar serviços.',
            confirmText: 'Ir para perfil'
        });
        window.location.href = 'perfil.html';
        return;
    }

    const profileImg = document.querySelector('.img-profile');
    if (profileImg) {
        profileImg.src = user.fotoPerfil;
    }

    const uploadArea = document.getElementById('uploadArea');
    const coverImageInput = document.getElementById('coverImage');
    const imagePreview = document.getElementById('imagePreview');
    const defaultServiceImage = window.Workly?.defaultServiceImage || '../assets/img/servicos/servico_padrao.svg';

    function renderCoverPreview(src = defaultServiceImage, alt = 'Capa padrão do serviço') {
        if (!imagePreview) return;
        imagePreview.innerHTML = `<img src="${src}" alt="${alt}" onerror="this.src='${defaultServiceImage}'">`;
        imagePreview.classList.toggle('default-preview', src === defaultServiceImage);
        imagePreview.style.display = 'flex';
    }

    if (uploadArea && coverImageInput && imagePreview) {
        renderCoverPreview();

        uploadArea.addEventListener('click', () => coverImageInput.click());
        coverImageInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    renderCoverPreview(event.target.result, 'Preview da capa');
                };
                reader.readAsDataURL(file);
            } else {
                renderCoverPreview();
            }
        });
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            if (e.dataTransfer.files.length > 0) {
                coverImageInput.files = e.dataTransfer.files;
                coverImageInput.dispatchEvent(new Event('change'));
            }
        });
    }

    const priceInput = document.getElementById('servicePrice');
    const priceNegotiableInput = document.querySelector('input[name="priceNegotiable"]');
    const priceByContactInput = document.querySelector('input[name="priceByContact"]');

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
    priceByContactInput?.addEventListener('change', syncPriceOptions);
    priceNegotiableInput?.addEventListener('change', () => {
        if (priceNegotiableInput.checked && priceByContactInput) priceByContactInput.checked = false;
        syncPriceOptions();
    });
    syncPriceOptions();

    const adDescription = document.getElementById('adDescription');
    const charCount = document.getElementById('charCount');
    if (adDescription && charCount) {
        adDescription.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    const adForm = document.querySelector('.ad-form');
    if (adForm) {
        adForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(adForm);
            if (formData.get('genero_id') && !formData.get('categoriaId')) {
                formData.append('categoriaId', formData.get('genero_id'));
            }

            try {
                const response = await window.Workly.apiFetch('/api/servicos', {
                    method: 'POST',
                    body: formData
                });

                const servicoCriado = response?.dados || response?.servico || response;
                const servicoId = servicoCriado?.idServico || servicoCriado?._id || servicoCriado?.id;

                await window.Workly.showAlert({
                    icon: 'success',
                    title: 'Serviço publicado!',
                    text: 'Seu serviço foi criado com sucesso.',
                    confirmText: 'Ver serviço'
                });

                window.location.href = servicoId
                    ? `detalhe-servico.html?id=${servicoId}`
                    : 'perfil.html#services';
            } catch (error) {
                console.error('Erro ao criar serviço:', error);
                window.Workly.showAlert({
                    icon: 'error',
                    title: 'Erro ao publicar',
                    text: error.message || 'Ocorreu um erro ao criar o serviço.',
                    confirmText: 'Fechar'
                });
            }
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.Workly.logout('index.html');
        });
    }
});
