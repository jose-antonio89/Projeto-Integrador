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
// Inicializa mostrando a aba Dashboard
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
        
        // Remover classe ativa de todos os itens de navegaçao
        settingsNavItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
        
        // Ocultar todas as sessões
        settingsSections.forEach(section => section.classList.remove('active'));
        
        // Mostrar a seção selecionada
        const targetId = item.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

//------------------------------
//Remova o "/*" para ativar o modo escuro
//Modo Escuro

const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle'; //Cria botão dark mode
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



// Verificar preferencia salva
document.addEventListener('DOMContentLoaded', function() {
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.replace('fa-moon', 'fa-sun');
}
});
 
//---------------------------------------------------------------

// Funcionalidade do botao de adicionar servico
const addServiceBtn = document.querySelector('.add-service-btn');
if (addServiceBtn) {
    addServiceBtn.addEventListener('click', () => {
       window.location.href = 'anuncio.php'
    });
}

// Funcionalidade dos botões de editar serviço
const editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Funcionalidade para editar serviço em desenvolvimento!');
    });
});

// Funcionalidade dos botões de estatisticas
const statsButtons = document.querySelectorAll('.stats-btn');
statsButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Funcionalidade para visualizar estatísticas em desenvolvimento!');
    });
});

// Funcionalidade dos botões de responder avaliacão
const replyButtons = document.querySelectorAll('.reply-btn');
replyButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Funcionalidade para responder avaliação em desenvolvimento!');
    });
});

// Funcionalidade de paginação das avaliações
const pageLinks = document.querySelectorAll('.page-link');
pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        pageLinks.forEach(pl => pl.classList.remove('active'));
        if (!link.classList.contains('next')) {
            link.classList.add('active');
        }
    });
});


//Perfil

document.addEventListener('DOMContentLoaded', function() {
    const profileBall = document.getElementById('profileBall');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Ativa dropdown
    profileBall.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });
    
    // fecha dropdown
    document.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
    });
    
    // previne que dropdown feche se clicar dentro dele
    dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // deslogar
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        //------------
        window.location.href = 'php/logout.php';
        
    });
});

