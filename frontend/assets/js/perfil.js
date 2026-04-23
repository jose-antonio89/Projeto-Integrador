document.addEventListener('DOMContentLoaded', function() {
    if (!window.Workly.getToken()) {
        window.location.href = 'login.html';
        return;
    }

    const profileElements = {
        name: document.querySelector('.profile-name'),
        title: document.querySelector('.profile-title'),
        avatar: document.querySelector('.profile-avatar'),
        currentPhoto: document.querySelector('.current-photo'),
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        professionalTitle: document.getElementById('professional-title'),
        bio: document.getElementById('bio'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        location: document.getElementById('location'),
        website: document.getElementById('website'),
        linkedin: document.getElementById('linkedin'),
        github: document.getElementById('github'),
        instagram: document.getElementById('instagram')
    };

    const servicosContainer = document.querySelector('.servicos-container');
    const profileStats = document.querySelector('.profile-stats');

    function splitName(nome = '') {
        const parts = nome.trim().split(/\s+/).filter(Boolean);
        if (!parts.length) return { firstName: '', lastName: '' };
        return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
    }

    function fillProfile(user, services = []) {
        const usuario = window.Workly.normalizeUser(user);
        const { firstName, lastName } = splitName(usuario.nome || '');
        const photo = usuario.fotoPerfil || window.Workly.defaultProfileImage;

        if (profileElements.name) profileElements.name.textContent = usuario.nome || 'Usuário';
        if (profileElements.title) profileElements.title.textContent = usuario.tituloProfissional || 'Complete seu perfil profissional';
        if (profileElements.avatar) profileElements.avatar.src = photo;
        if (profileElements.currentPhoto) profileElements.currentPhoto.src = photo;
        if (profileElements.firstName) profileElements.firstName.value = firstName;
        if (profileElements.lastName) profileElements.lastName.value = lastName;
        if (profileElements.professionalTitle) profileElements.professionalTitle.value = usuario.tituloProfissional || '';
        if (profileElements.bio) profileElements.bio.value = usuario.bio || '';
        if (profileElements.email) profileElements.email.value = usuario.email || '';
        if (profileElements.phone) profileElements.phone.value = usuario.telefone || '';
        if (profileElements.location) profileElements.location.value = usuario.localizacao || '';
        if (profileElements.website) profileElements.website.value = usuario.site || '';
        if (profileElements.linkedin) profileElements.linkedin.value = usuario.linkedin || '';
        if (profileElements.github) profileElements.github.value = usuario.github || '';
        if (profileElements.instagram) profileElements.instagram.value = usuario.instagram || '';

        if (profileStats) {
            profileStats.innerHTML = `
                <div class="stat-item">
                    <span class="stat-number">${services.length}</span>
                    <span class="stat-label">Serviços</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${usuario.tipoConta === 'Freelancer' ? 'Freelancer' : 'Contratante'}</span>
                    <span class="stat-label">Tipo de conta</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${usuario.areaAtuacao || '-'}</span>
                    <span class="stat-label">Área</span>
                </div>
            `;
        }

        if (servicosContainer) {
            servicosContainer.innerHTML = '';
            if (services.length > 0) {
                services.forEach(service => {
                    servicosContainer.innerHTML += window.Workly.serviceCardMarkup(service, 'modern');
                });
            } else {
                servicosContainer.innerHTML = '<p class="empty-state-message">Você ainda não publicou nenhum serviço.</p>';
            }
        }
    }

    async function loadProfile() {
        try {
            const response = await window.Workly.apiFetch('/api/usuarios/perfil');
            const user = window.Workly.normalizeUser(response.user || response.dados?.user);
            const services = (response.services || response.dados?.services || []).map(window.Workly.normalizeService);
            window.Workly.setStoredUser(user);
            fillProfile(user, services);
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            alert(error.message || 'Erro ao carregar perfil.');
        }
    }

    loadProfile();

    const salesCanvas = document.getElementById('salesChart');
    if (salesCanvas && window.Chart) {
        new Chart(salesCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
                datasets: [{
                    label: 'Vendas (R$)',
                    data: [0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(4, 191, 85, 0.1)',
                    borderColor: '#04BF55',
                    borderWidth: 3,
                    pointBackgroundColor: '#04BF55',
                    tension: 0.3
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
        });
    }

    const revenueCanvas = document.getElementById('revenueChart');
    if (revenueCanvas && window.Chart) {
        new Chart(revenueCanvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Serviços publicados'],
                datasets: [{ data: [100], backgroundColor: ['#04BF55'], borderColor: '#ffffff', borderWidth: 2 }]
            },
            options: { responsive: true, maintainAspectRatio: false, cutoutPercentage: 70, legend: { position: 'bottom' } }
        });
    }

    const viewsCanvas = document.getElementById('viewsChart');
    if (viewsCanvas && window.Chart) {
        new Chart(viewsCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{ label: 'Visualizações', data: [0, 0, 0, 0, 0, 0, 0], backgroundColor: '#2196F3', borderRadius: 5 }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
        });
    }

    const tabs = document.querySelectorAll('.profile-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const dashboardGrid = document.querySelector('.dashboard-grid');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.textContent.trim().toLowerCase();
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            if (dashboardGrid) dashboardGrid.style.display = 'none';
            tabContents.forEach(content => { content.style.display = 'none'; });

            if (tabName === 'dashboard' && dashboardGrid) dashboardGrid.style.display = 'grid';
            if (tabName === 'serviços') document.getElementById('services-tab').style.display = 'block';
            if (tabName === 'avaliações') document.getElementById('reviews-tab').style.display = 'block';
            if (tabName === 'configurações') document.getElementById('settings-tab').style.display = 'block';
        });
    });

    tabs.forEach(t => t.classList.remove('active'));
    const defaultTab = document.querySelector('.profile-tab[data-tab="dashboard"]');
    if (defaultTab) defaultTab.classList.add('active');
    if (dashboardGrid) dashboardGrid.style.display = 'grid';
    ['services-tab', 'reviews-tab', 'settings-tab'].forEach((id) => {
        const element = document.getElementById(id);
        if (element) element.style.display = 'none';
    });

    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    const settingsSections = document.querySelectorAll('.settings-section');
    settingsNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            settingsNavItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
            settingsSections.forEach(section => section.classList.remove('active'));
            const targetId = item.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (target) target.classList.add('active');
        });
    });

    const addServicoBtn = document.querySelector('.add-service-btn');
    if (addServicoBtn) {
        addServicoBtn.addEventListener('click', () => {
            window.location.href = 'anuncio.html';
        });
    }

    const updateProfileForm = document.getElementById('update-profile-form');
    if (updateProfileForm) {
        updateProfileForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const nome = `${profileElements.firstName?.value || ''} ${profileElements.lastName?.value || ''}`.trim();
            const data = {
                nome,
                email: profileElements.email?.value || '',
                telefone: profileElements.phone?.value || '',
                tituloProfissional: profileElements.professionalTitle?.value || '',
                bio: profileElements.bio?.value || '',
                localizacao: profileElements.location?.value || '',
                site: profileElements.website?.value || '',
                linkedin: profileElements.linkedin?.value || '',
                github: profileElements.github?.value || '',
                instagram: profileElements.instagram?.value || ''
            };

            try {
                const result = await window.Workly.apiFetch('/api/usuarios/perfil', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                window.Workly.setStoredUser(result.user);
                await window.Workly.showAlert({ icon: 'success', title: 'Perfil atualizado!', text: result.mensagem || 'As informações do seu perfil foram salvas com sucesso.', confirmText: 'Continuar' });
                await loadProfile();
            } catch (error) {
                console.error('Erro ao atualizar perfil:', error);
                window.Workly.showAlert({ icon: 'error', title: 'Erro ao atualizar perfil', text: error.message || 'Não foi possível salvar as alterações do seu perfil.', confirmText: 'Fechar' });
            }
        });
    }

    const updatePhotoForm = document.getElementById('update-photo-form');
    if (updatePhotoForm) {
        updatePhotoForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(updatePhotoForm);
            try {
                const result = await window.Workly.apiFetch('/api/usuarios/perfil/foto', {
                    method: 'POST',
                    body: formData
                });
                if (result.user) window.Workly.setStoredUser(result.user);
                await window.Workly.showAlert({ icon: 'success', title: 'Foto atualizada!', text: result.mensagem || 'Sua foto foi atualizada com sucesso.', confirmText: 'Continuar' });
                await loadProfile();
            } catch (error) {
                console.error('Erro ao atualizar foto:', error);
                window.Workly.showAlert({ icon: 'error', title: 'Erro ao atualizar foto', text: error.message || 'Não foi possível atualizar sua foto agora.', confirmText: 'Fechar' });
            }
        });
    }

    const deleteAccountForm = document.getElementById('delete-account-form');
    if (deleteAccountForm) {
        deleteAccountForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const confirmacaoExclusao = await window.Workly.showConfirm({ title: 'Excluir conta?', text: 'Tem certeza que deseja excluir sua conta? Esta ação é irreversível.', icon: 'warning', confirmText: 'Excluir', cancelText: 'Cancelar' });
            if (!confirmacaoExclusao.isConfirmed) return;
            try {
                const result = await window.Workly.apiFetch('/api/usuarios/perfil', { method: 'DELETE' });
                await window.Workly.showAlert({ icon: 'success', title: 'Conta excluída', text: result.mensagem || 'Sua conta foi excluída com sucesso.', confirmText: 'OK' });
                window.Workly.logout('index.html');
            } catch (error) {
                console.error('Erro ao excluir conta:', error);
                window.Workly.showAlert({ icon: 'error', title: 'Erro ao excluir conta', text: error.message || 'Não foi possível excluir sua conta.', confirmText: 'Fechar' });
            }
        });
    }
});
