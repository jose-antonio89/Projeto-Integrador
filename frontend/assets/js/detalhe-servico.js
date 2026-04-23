document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');
    
    if (!serviceId) {
        window.location.href = 'index.html';
        return;
    }

    const currentUsuario = await window.Workly.fetchCurrentUser(true);

    try {
        const response = await window.Workly.apiFetch(`/api/servicos/${serviceId}`);
        const serviceData = response.dados || response;
        const service = window.Workly.normalizeService(serviceData);
        
        // Basic Info
        document.querySelector('.service-main-image').src = service.imagemServico || '../assets/img/servicos/servico_padrao.png';
        document.querySelector('.service-title').textContent = service.nome;
        document.querySelector('.service-price').textContent = window.Workly.formatCurrency(serviceData.preco);
        document.title = `Workly - ${service.nome}`;

        // Category & Breadcrumb
        const categoryBadge = document.querySelector('.service-category-badge');
        if (categoryBadge) {
            categoryBadge.textContent = service.nomeCategoria;
            // Se quisermos tornar o badge clicável para ir para a categoria:
            const breadcrumb = categoryBadge.closest('.breadcrumb');
            if (breadcrumb && service.categoriaId) {
                const catLink = document.createElement('a');
                catLink.href = `categorias.html?id=${service.categoriaId}`;
                catLink.textContent = service.nomeCategoria;
                catLink.className = 'service-category-badge';
                categoryBadge.replaceWith(catLink);
            }
        }

        // Freelancer Info
        const avatar = document.querySelector('.freelancer-avatar-small');
        if (avatar) avatar.src = service.fotoPerfil || window.Workly.defaultProfileImage;
        
        const name = document.querySelector('.freelancer-name');
        if (name) name.textContent = service.nomeFreelancer;

        // Description
        const description = document.querySelector('.service-description');
        if (description) {
            description.innerHTML = (serviceData.descricao || '').replace(/\n/g, '<br>');
        }

        // Action Buttons
        const contactBtn = document.querySelector('.btn-contact');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                window.Workly.showAlert({
                    title: 'Contatar Freelancer',
                    text: `Em breve você poderá conversar com ${service.nomeFreelancer}!`,
                    icon: 'info'
                });
            });
        }

        const purchaseBtn = document.querySelector('.btn-purchase');
        if (purchaseBtn) {
            purchaseBtn.addEventListener('click', () => {
                window.Workly.showAlert({
                    title: 'Finalizar Compra',
                    text: 'O sistema de pagamentos será implementado em breve.',
                    icon: 'success'
                });
            });
        }

        // Edit Button (if owner)
        if (currentUsuario && (currentUsuario.idUsuario === service.idUsuario)) {
            const editButtonContainer = document.getElementById('edit-button-container');
            if (editButtonContainer) {
                editButtonContainer.innerHTML = `
                    <a href="perfil.html" class="btn-edit">
                        <i class="fas fa-pen"></i> Gerenciar este serviço no Perfil
                    </a>`;
            }
        }
    } catch (error) {
        console.error('Erro ao buscar serviço:', error);
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="container" style="text-align: center; padding: 100px 0;">
                    <i class="fas fa-exclamation-circle" style="font-size: 4rem; color: #cbd5e1; margin-bottom: 20px;"></i>
                    <h1 style="color: #475569;">Serviço não encontrado</h1>
                    <p style="color: #94a3b8; margin-bottom: 30px;">${error.message || 'Não foi possível carregar os detalhes deste serviço.'}</p>
                    <a href="index.html" class="btn btn-primary" style="display: inline-flex; width: auto; padding: 12px 30px;">Voltar para o Início</a>
                </div>
            `;
        }
    }
});
