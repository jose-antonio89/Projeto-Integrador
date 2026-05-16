
async function fetchAndDisplayUsuario() {
    return window.Workly.fetchCurrentUser(true);
}

// monta a navbar em js pra todas as páginas ficarem com o mesmo cabeçalho.
// monta o header padrão usado pelas páginas.
function renderizarCabecalho(user) {
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const currentCategoryId = params.get('id') || params.get('id_categoria');

    const pagesWithoutCategories = new Set(['sobre.html', 'cadastro.html', 'login.html']);
    const hideCategories = pagesWithoutCategories.has(currentPage);

    const categories = [
        { id: '1', label: 'Design', icon: 'fa-paint-brush' },
        { id: '2', label: 'Programação', icon: 'fa-code' },
        { id: '3', label: 'Vídeo/Edição', icon: 'fa-film' },
        { id: '4', label: 'Inteligência Artificial', icon: 'fa-wifi' },
        { id: '5', label: 'Tradução/Escritor', icon: 'fa-book' },
        { id: '6', label: 'Fotografia', icon: 'fa-camera' },
        { id: '7', label: 'Áudio/Música', icon: 'fa-headphones' }
    ];

    const safeName = user?.nome ? String(user.nome).split(' ')[0] : '';
    const profilePhoto = user?.fotoPerfil || window.Workly?.defaultProfileImage || '../assets/img/perfis/perfil_padrao.svg';

    const navLinks = user ? `
        <a href="index.html" class="wk-menu-link ${currentPage === 'index.html' ? 'active' : ''}">Home</a>
        <a href="sobre.html" class="wk-menu-link ${currentPage === 'sobre.html' ? 'active' : ''}">Sobre Nós</a>
    ` : `
        <a href="index.html" class="wk-menu-link ${currentPage === 'index.html' ? 'active' : ''}">Home</a>
        <a href="sobre.html" class="wk-menu-link ${currentPage === 'sobre.html' ? 'active' : ''}">Sobre Nós</a>
    `;

    const profileArea = user ? `
        <div class="wk-user-actions">
            <div class="wk-notification-menu">
                <button type="button" class="wk-notification-trigger" id="notificationBell" aria-label="Abrir notificações">
                    <i class="fas fa-bell"></i>
                    <span class="wk-notification-badge" id="notificationBadge" hidden>0</span>
                </button>
                <div class="wk-notification-dropdown" id="notificationDropdown">
                    <div class="wk-notification-head">
                        <strong>Notificações</strong>
                        <button type="button" id="markNotificationsRead">Marcar lidas</button>
                    </div>
                    <div class="wk-notification-list" id="notificationList">
                        <div class="wk-notification-empty">Carregando notificações...</div>
                    </div>
                    <a class="wk-notification-footer" href="mensagens.html">Abrir central de mensagens</a>
                </div>
            </div>

            <div class="wk-profile-menu">
                <button type="button" class="wk-profile-trigger" id="profileBall" aria-label="Abrir menu do perfil">
                    <span class="wk-profile-name">${safeName}</span>
                    <img src="${profilePhoto}" class="wk-profile-avatar" alt="Perfil" onerror="this.src='../assets/img/perfis/perfil_padrao.svg'">
                    <i class="fas fa-chevron-down wk-profile-chevron"></i>
                </button>
                <div class="wk-dropdown" id="dropdownMenu">
                    <a href="perfil.html"><i class="fas fa-user"></i> Perfil</a>
                    <a href="favoritos.html"><i class="fas fa-heart"></i> Favoritos</a>
                    <a href="contratos.html"><i class="fas fa-briefcase"></i> Contratos</a>
                    <a href="mensagens.html"><i class="fas fa-comments"></i> Mensagens</a>
                    <a href="anuncio.html"><i class="fas fa-plus-circle"></i> Anunciar serviço</a>
                    <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Sair</a>
                </div>
            </div>
        </div>
    ` : `
        <a href="login.html" class="wk-login-button">Entrar</a>
    `;

    const categoriesHTML = hideCategories ? '' : `
        <div class="wk-category-bar">
            <div class="wk-category-shell">
                ${categories.map(category => `
                    <a href="categorias.html?id=${category.id}" class="wk-category-link ${currentCategoryId === category.id ? 'active' : ''}">
                        <i class="fas ${category.icon}"></i>
                        <span>${category.label}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `;

    const header = document.querySelector('header');
    if (header) {
        header.className = 'wk-site-header';
        header.innerHTML = `
            <div class="wk-navbar">
                <div class="wk-navbar-shell">
                    <a href="index.html" class="wk-brand" aria-label="Ir para a página inicial">
                        <img class="wk-brand-logo" src="../assets/img/logo.png" alt="Workly">
                    </a>

                    <form class="wk-search-form" id="wkSearchForm" role="search">
                        <input type="search" class="wk-search-input" id="wkSearchInput" placeholder="O que você está buscando?" autocomplete="off">
                        <button class="wk-search-button" type="submit" aria-label="Buscar">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>

                    <nav class="wk-menu" aria-label="Menu principal">
                        ${navLinks}
                    </nav>

                    ${profileArea}
                </div>
            </div>
            ${categoriesHTML}
        `;
    }

    const profileBall = document.getElementById('profileBall');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    const searchForm = document.getElementById('wkSearchForm');
    const searchInput = document.getElementById('wkSearchInput');

    // dropdown do perfil: abre no clique e fecha quando clicar fora.
    if (profileBall && dropdownMenu) {
        profileBall.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownMenu.classList.toggle('show');
            profileBall.classList.toggle('active', dropdownMenu.classList.contains('show'));
        });

        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
            profileBall.classList.remove('active');
        });
        dropdownMenu.addEventListener('click', (event) => event.stopPropagation());
    }

    const notificationBell = document.getElementById('notificationBell');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationBadge = document.getElementById('notificationBadge');
    const notificationList = document.getElementById('notificationList');
    const markNotificationsRead = document.getElementById('markNotificationsRead');

    function formatNotificationDate(value) {
        if (!value) return '';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    }

    function escapeHtml(value = '') {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // carrega o sino do topo.
// mensagem nova aparece como resumo, não como várias notificações duplicadas.
async function loadNotifications() {
        if (!notificationBell || !window.Workly?.getToken?.()) return;

        try {
            const [notificacoesResponse, mensagensResponse] = await Promise.all([
                window.Workly.apiFetch('/api/notificacoes?limit=8').catch(() => ({ dados: [] })),
                window.Workly.apiFetch('/api/mensagens/nao-lidas').catch(() => ({ dados: { naoLidas: 0 } }))
            ]);

            const todasNotificacoes = notificacoesResponse.dados || [];
            const notificacoesNaoLidas = todasNotificacoes.filter(item => !item.lida);
            const naoLidasMensagens = Number(mensagensResponse.dados?.naoLidas || mensagensResponse.naoLidas || 0);

            // evita duplicidade: quando existe contador de mensagens não lidas,
            // não mostra cada "mensagem_nova" separada no dropdown.
            const notificacoesVisiveis = notificacoesNaoLidas.filter(item => item.tipo !== 'mensagem_nova');

            const totalNaoLidas = notificacoesVisiveis.length + naoLidasMensagens;

            if (notificationBadge) {
                if (totalNaoLidas > 0) {
                    notificationBadge.textContent = totalNaoLidas > 99 ? '99+' : String(totalNaoLidas);
                    notificationBadge.hidden = false;
                } else {
                    notificationBadge.textContent = '';
                    notificationBadge.hidden = true;
                }
            }

            if (notificationList) {
                const mensagemResumo = naoLidasMensagens > 0
                    ? `<a class="wk-notification-item is-message unread" href="mensagens.html">
                        <span class="wk-notification-icon"><i class="fas fa-comments"></i></span>
                        <span>
                            <strong>${naoLidasMensagens} mensagem${naoLidasMensagens > 1 ? 's' : ''} não lida${naoLidasMensagens > 1 ? 's' : ''}</strong>
                            <small>Abra a central de mensagens para responder.</small>
                        </span>
                    </a>`
                    : '';

                const itens = notificacoesVisiveis.map(item => {
                    const destino = item.tipo === 'mensagem_nova' ? 'mensagens.html' : (item.tipoReferencia === 'contrato' ? 'contratos.html' : 'perfil.html');
                    const icon = item.tipo === 'mensagem_nova' ? 'fa-comments' : item.tipo === 'contrato_novo' || item.tipo === 'proposta_nova' ? 'fa-briefcase' : 'fa-bell';
                    return `<a class="wk-notification-item unread" href="${destino}">
                        <span class="wk-notification-icon"><i class="fas ${icon}"></i></span>
                        <span>
                            <strong>${escapeHtml(item.titulo || 'Notificação')}</strong>
                            <small>${escapeHtml(item.mensagem || '')}</small>
                            <em>${escapeHtml(formatNotificationDate(item.createdAt))}</em>
                        </span>
                    </a>`;
                }).join('');

                notificationList.innerHTML = mensagemResumo || itens
                    ? mensagemResumo + itens
                    : '<div class="wk-notification-empty">Você está em dia. Nenhuma notificação nova.</div>';
            }
        } catch (error) {
            if (notificationList) notificationList.innerHTML = '<div class="wk-notification-empty">Não foi possível carregar notificações.</div>';
            console.error('Erro ao carregar notificações:', error);
        }
    }

    if (notificationBell && notificationDropdown) {
        notificationBell.addEventListener('click', async (event) => {
            event.stopPropagation();
            notificationDropdown.classList.toggle('show');
            notificationBell.classList.toggle('active', notificationDropdown.classList.contains('show'));
            if (notificationDropdown.classList.contains('show')) await loadNotifications();
        });

        notificationDropdown.addEventListener('click', (event) => event.stopPropagation());

        document.addEventListener('click', () => {
            notificationDropdown.classList.remove('show');
            notificationBell.classList.remove('active');
        });

        // botão pra limpar tudo que ainda aparece no sino.
markNotificationsRead?.addEventListener('click', async () => {
            try {
                await window.Workly.apiFetch('/api/notificacoes/todas-lidas', { method: 'PATCH' });
                await loadNotifications();
            } catch (error) {
                console.error('Erro ao marcar notificações como lidas:', error);
            }
        });

        loadNotifications();
        window.setInterval(loadNotifications, 60000);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            window.Workly.logout('index.html');
        });
    }

    // busca simples: manda o termo pela url para a página de todos os serviços.
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const termo = searchInput.value.trim();
            const destino = termo ? `todos-servicos.html?q=${encodeURIComponent(termo)}` : 'todos-servicos.html';
            window.location.href = destino;
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const usuario = await fetchAndDisplayUsuario();
    renderizarCabecalho(usuario);
});
