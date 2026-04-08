document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    fetch('http://localhost:3000/api/users/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const { user, services } = data;

        // Populate profile header
        document.querySelector('.profile-name').textContent = user.nome;
        document.querySelector('.profile-avatar').src = user.foto_perfil || 'img/perfis/perfil_padrao.png';
        document.querySelector('.current-photo').src = user.foto_perfil || 'img/perfis/perfil_padrao.png';

        // Populate services tab
        const servicosContainer = document.querySelector('.servicos-container');
        servicosContainer.innerHTML = '';
        if (services) {
            services.forEach(service => {
                const serviceCard = `
                    <div class="servico-card-modern">
                        <div class="servico-card-modern-header">
                            <img src="${user.foto_perfil || 'img/perfis/perfil_padrao.png'}" alt="Foto do usuário" class="servico-card-modern-user-photo">
                            <span class="servico-card-modern-user-name">${user.nome}</span>
                        </div>
                        <img src="${service.imagem_servico}" alt="Imagem do serviço" class="servico-card-modern-image">
                        <div class="servico-card-modern-content">
                            <span class="servico-card-modern-category">${service.nome_genero}</span>
                            <h3 class="servico-card-modern-title">${service.nome}</h3>
                            <p class="servico-card-modern-price">R$ ${Number(service.preco).toFixed(2).replace('.', ',')}</p>
                            <button class="servico-card-modern-edit-button" onclick="window.location.href='service.html?id=${service.id_servico}'">
                                <i class="fas fa-pen"></i> Editar
                            </button>
                        </div>
                    </div>
                `;
                servicosContainer.innerHTML += serviceCard;
            });
        }
    })
    .catch(error => {
        console.error('Erro ao carregar perfil:', error);
        // window.location.href = 'login.html';
    });


    // Grafico de Vendas Mensais
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'line',
        data: { 
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
            datasets: [{
                label: 'Vendas (R$)',
                data: [1200, 1900, 1500, 2800, 3200],
                backgroundColor: 'rgba(4, 191, 85, 0.1)',
                borderColor: '#04BF55',
                borderWidth: 3,
                pointBackgroundColor: '#04BF55',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Grafico de Distribuição de Receita
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
            labels: ['Design', 'Desenvolvimento Web', 'SEO', 'Marketing'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: [
                    '#04BF55',
                    '#2196F3',
                    '#FFEB3B',
                    '#9E9E9E'
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutoutPercentage: 70,
            legend: {
                position: 'bottom'
            }
        }
    });

    // Grafico de Visualizações do Perfil
    const viewsCtx = document.getElementById('viewsChart').getContext('2d');
    const viewsChart = new Chart(viewsCtx, {
        type: 'bar',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Visualizações',
                data: [65, 90, 75, 120, 155, 80, 55],
                backgroundColor: '#2196F3',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Alterna entre abas principais
    const tabs = document.querySelectorAll('.profile-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const dashboardGrid = document.querySelector('.dashboard-grid');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.textContent.trim().toLowerCase();
            
            // Remover classe ativa de todas as abas
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Ocultar todos os conteudos de aba
            dashboardGrid.style.display = 'none';
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Mostrar o conteudo da aba selecionada
            if (tabName === 'dashboard') {
                dashboardGrid.style.display = 'grid';
            } else if (tabName === 'serviços') {
                document.getElementById('services-tab').style.display = 'block';
            } else if (tabName === 'avaliações') {
                document.getElementById('reviews-tab').style.display = 'block';
            } else if (tabName === 'configurações') {
                document.getElementById('settings-tab').style.display = 'block';
            }
        });
    });

    // Inicializar dashboard como ativo
    window.addEventListener("DOMContentLoaded", () => {
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector('.profile-tab[data-tab="dashboard"]').classList.add('active');

        dashboardGrid.style.display = 'grid';
        document.getElementById('services-tab').style.display = 'none';
        document.getElementById('reviews-tab').style.display = 'none';
        document.getElementById('settings-tab').style.display = 'none';
    });


    // Navegaçao nas configuraçoes
    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    const settingsSections = document.querySelectorAll('.settings-section');

    settingsNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            settingsNavItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
            
            settingsSections.forEach(section => section.classList.remove('active'));
            
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    //Modo Escuro
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
          icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('darkMode', 'enabled');
        } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('darkMode', 'disabled');
      }
    });

    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
 
    // Funcionalidade do botao de adicionar servico
    const addServiceBtn = document.querySelector('.add-service-btn');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', () => {
           window.location.href = 'anuncio.html'
        });
    }

    // Update profile form
    const updateProfileForm = document.getElementById('update-profile-form');
    updateProfileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(updateProfileForm);
        const data = Object.fromEntries(formData.entries());

        fetch('http://localhost:3000/api/users/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
            location.reload();
        })
        .catch(error => {
            console.error('Erro ao atualizar perfil:', error);
            alert('Erro ao atualizar perfil.');
        });
    });

    // Update photo form
    const updatePhotoForm = document.getElementById('update-photo-form');
    updatePhotoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(updatePhotoForm);

        fetch('http://localhost:3000/api/users/profile/photo', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            location.reload();
        })
        .catch(error => {
            console.error('Erro ao atualizar foto:', error);
            alert('Erro ao atualizar foto.');
        });
    });

    // Delete account form
    const deleteAccountForm = document.getElementById('delete-account-form');
    deleteAccountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível!')) {
            fetch('http://localhost:3000/api/users/profile', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.text())
            .then(result => {
                alert(result);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Erro ao excluir conta:', error);
                alert('Erro ao excluir conta.');
            });
        }
    });
});