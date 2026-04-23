(function applyInitialTheme() {
    const isDark = localStorage.getItem('darkMode') === 'enabled';
    if (isDark) {
        document.documentElement.classList.add('dark-mode-enabled');
        document.body.classList.add('dark-mode');
    }
})();

function injectGlobalThemeStyles() {
    if (!document.querySelector('link[data-workly-theme="global"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../assets/css/theme-global.css';
        link.setAttribute('data-workly-theme', 'global');
        document.head.appendChild(link);
    }
}

function applyThemeState() {
    const darkEnabled = localStorage.getItem('darkMode') === 'enabled';
    document.body.classList.toggle('dark-mode', darkEnabled);
    document.documentElement.classList.toggle('dark-mode-enabled', darkEnabled);
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.setAttribute('aria-label', darkEnabled ? 'Ativar modo claro' : 'Ativar modo escuro');
        toggle.innerHTML = `<i class="fas ${darkEnabled ? 'fa-sun' : 'fa-moon'}"></i>`;
    }
}

function ensureThemeToggle() {
    if (document.querySelector('.theme-toggle')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.addEventListener('click', () => {
        const enabled = localStorage.getItem('darkMode') === 'enabled';
        localStorage.setItem('darkMode', enabled ? 'disabled' : 'enabled');
        applyThemeState();
    });
    document.body.appendChild(button);
    applyThemeState();
}

function ensureWorklyModalRoot() {
    if (document.getElementById('workly-modal-root')) return document.getElementById('workly-modal-root');
    const modalRoot = document.createElement('div');
    modalRoot.id = 'workly-modal-root';
    document.body.appendChild(modalRoot);
    return modalRoot;
}

function getModalIcon(icon) {
    const icons = {
        success: 'fa-check',
        error: 'fa-xmark',
        warning: 'fa-exclamation',
        info: 'fa-info'
    };
    return icons[icon] || icons.info;
}

function closeCustomModal() {
    const root = document.getElementById('workly-modal-root');
    if (root) root.innerHTML = '';
}

function openCustomModal({ title = 'Aviso', text = '', icon = 'info', confirmText = 'OK' } = {}) {
    const root = ensureWorklyModalRoot();
    root.innerHTML = `
        <div class="wk-modal-overlay is-open">
            <div class="wk-modal-card" role="dialog" aria-modal="true" aria-label="${title}">
                <button type="button" class="wk-modal-close" aria-label="Fechar">
                    <i class="fas fa-xmark"></i>
                </button>
                <div class="wk-modal-icon wk-${icon}">
                    <i class="fas ${getModalIcon(icon)}"></i>
                </div>
                <h3 class="wk-modal-title">${title}</h3>
                <p class="wk-modal-text">${text}</p>
                <button type="button" class="wk-modal-button">${confirmText}</button>
            </div>
        </div>
    `;

    const overlay = root.querySelector('.wk-modal-overlay');
    const confirmButton = root.querySelector('.wk-modal-button');
    const closeButton = root.querySelector('.wk-modal-close');

    return new Promise((resolve) => {
        const finish = () => {
            closeCustomModal();
            resolve(true);
        };
        confirmButton?.addEventListener('click', finish);
        closeButton?.addEventListener('click', finish);
        overlay?.addEventListener('click', (event) => {
            if (event.target === overlay) finish();
        });
    });
}

function createSwalOptions({ title = 'Aviso', text = '', icon = 'info', confirmText = 'OK' } = {}) {
    const darkEnabled = localStorage.getItem('darkMode') === 'enabled';
    return {
        icon,
        title,
        text,
        confirmButtonText: confirmText,
        background: darkEnabled ? '#101826' : '#ffffff',
        color: darkEnabled ? '#eef5ff' : '#172033',
        confirmButtonColor: '#0fce6a',
        customClass: {
            popup: darkEnabled ? 'workly-swal-popup-dark' : 'workly-swal-popup-light',
            title: 'workly-swal-title',
            htmlContainer: 'workly-swal-text',
            confirmButton: 'workly-swal-confirm'
        },
        buttonsStyling: false
    };
}

function showAlert(options = {}) {
    if (typeof window.Swal !== 'undefined') {
        return window.Swal.fire(createSwalOptions(options));
    }
    return openCustomModal(options);
}

function showConfirm({ title = 'Confirmar ação', text = '', icon = 'warning', confirmText = 'Confirmar', cancelText = 'Cancelar' } = {}) {
    if (typeof window.Swal !== 'undefined') {
        const darkEnabled = localStorage.getItem('darkMode') === 'enabled';
        return window.Swal.fire({
            ...createSwalOptions({ title, text, icon, confirmText }),
            showCancelButton: true,
            cancelButtonText: cancelText,
            reverseButtons: true,
            cancelButtonColor: darkEnabled ? '#253247' : '#dbe4f0',
            customClass: {
                popup: darkEnabled ? 'workly-swal-popup-dark' : 'workly-swal-popup-light',
                title: 'workly-swal-title',
                htmlContainer: 'workly-swal-text',
                confirmButton: 'workly-swal-confirm',
                cancelButton: 'workly-swal-cancel'
            },
            buttonsStyling: false
        });
    }

    return new Promise((resolve) => {
        const confirmed = window.confirm(text || title);
        resolve({ isConfirmed: confirmed });
    });
}

function togglePassword(targetOrEvent, maybeButton) {
    let input = null;
    let button = null;

    if (typeof targetOrEvent === 'string') {
        input = document.getElementById(targetOrEvent);
        button = maybeButton || document.querySelector(`[data-password-target="${targetOrEvent}"]`);
    } else if (targetOrEvent?.currentTarget) {
        button = targetOrEvent.currentTarget;
        const targetId = button.getAttribute('data-password-target');
        input = targetId ? document.getElementById(targetId) : button.closest('.form-group')?.querySelector('input[type="password"], input[type="text"]');
    } else if (targetOrEvent?.nodeType === 1) {
        button = targetOrEvent;
        const targetId = button.getAttribute('data-password-target');
        input = targetId ? document.getElementById(targetId) : button.closest('.form-group')?.querySelector('input[type="password"], input[type="text"]');
    } else {
        input = document.getElementById('senha');
        button = document.querySelector('[data-password-target="senha"]') || document.querySelector('.password-toggle');
    }

    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    if (button) {
        const icon = button.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-eye', !isPassword);
            icon.classList.toggle('fa-eye-slash', isPassword);
        }
        button.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
    }
}

function initializePasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach((button) => {
        if (button.dataset.worklyBound === 'true') return;
        button.dataset.worklyBound = 'true';
        button.addEventListener('click', (event) => {
            event.preventDefault();
            togglePassword(event);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    injectGlobalThemeStyles();
    ensureThemeToggle();
    ensureWorklyModalRoot();
    initializePasswordToggles();
    applyThemeState();
});

window.togglePassword = togglePassword;

window.API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'http://localhost:3000';

window.Workly = (() => {
    const DEFAULT_PROFILE_IMAGE = '../assets/img/perfis/perfil_padrao.png';

    function getToken() {
        return localStorage.getItem('token');
    }

    function setToken(token) {
        if (token) localStorage.setItem('token', token);
    }

    function clearSession() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    function logout(redirect = 'login.html') {
        clearSession();
        window.location.href = redirect;
    }

    function getStoredUser() {
        try {
            return normalizeUser(JSON.parse(localStorage.getItem('user')));
        } catch (_error) {
            return null;
        }
    }

    function setStoredUser(user) {
        if (!user) return;
        localStorage.setItem('user', JSON.stringify(normalizeUser(user)));
    }

    function getApiPayload(data) {
        if (Array.isArray(data?.dados)) return data.dados;
        if (data?.dados && typeof data.dados === 'object') return data.dados;
        return data;
    }

    function normalizeUser(user) {
        if (!user) return null;
        return {
            ...user,
            idUsuario: user.idUsuario || user.id_usuario || '',
            tipoConta: user.tipoConta || user.tipo_conta || '',
            areaAtuacao: user.areaAtuacao || user.area_atuacao || '',
            fotoPerfil: user.fotoPerfil || user.foto_perfil || DEFAULT_PROFILE_IMAGE,
            tituloProfissional: user.tituloProfissional || user.professional_title || '',
            localizacao: user.localizacao || user.location || '',
            site: user.site || user.website || ''
        };
    }

    function normalizeService(service) {
        if (!service) return null;
        return {
            ...service,
            idServico: service.idServico || service.id_servico || service.id,
            imagemServico: service.imagemServico || service.imagem_servico || '',
            categoriaId: service.categoriaId || service.genero_id || null,
            nomeCategoria: service.nomeCategoria || service.nome_genero || '',
            idUsuario: service.idUsuario || service.id_usuario || null,
            nomeFreelancer: service.nomeFreelancer || service.nome_freelancer || '',
            fotoPerfil: service.fotoPerfil || service.foto_perfil || DEFAULT_PROFILE_IMAGE
        };
    }

    async function parseResponse(response) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            return response.json();
        }
        return response.text();
    }

    async function apiFetch(path, options = {}) {
        const token = getToken();
        const headers = { ...(options.headers || {}) };
        if (token && !headers.Authorization) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${window.API_BASE}${path}`, {
            ...options,
            headers
        });

        const raw = await parseResponse(response);
        const message = raw?.mensagem || raw?.message || (typeof raw === 'string' ? raw : 'Erro na requisição.');

        if (!response.ok) {
            const error = new Error(message);
            error.response = response;
            error.data = raw;
            throw error;
        }

        return raw;
    }

    async function fetchCurrentUser(force = false) {
        const token = getToken();
        if (!token) return null;
        if (!force) {
            const stored = getStoredUser();
            if (stored) return stored;
        }

        try {
            const response = await apiFetch('/api/usuarios/perfil');
            const user = normalizeUser(response.user || response.dados?.user);
            setStoredUser(user);
            return user;
        } catch (error) {
            console.error('Erro ao carregar usuário atual:', error);
            if (error.response?.status === 401) {
                clearSession();
            }
            return getStoredUser();
        }
    }

    function formatCurrency(value) {
        return `R$ ${Number(value || 0).toFixed(2).replace('.', ',')}`;
    }

    function escapeHtml(text = '') {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function serviceCardMarkup(service, variant = 'default') {
        const s = normalizeService(service);
        if (!s) return '';

        if (variant === 'modern') {
            return `
                <div class="servico-card-modern">
                    <div class="servico-card-modern-header">
                        <img src="${s.fotoPerfil}" alt="Foto do usuário" class="servico-card-modern-user-photo">
                        <span class="servico-card-modern-user-name">${escapeHtml(s.nomeFreelancer)}</span>
                    </div>
                    <img src="${s.imagemServico}" alt="Imagem do serviço" class="servico-card-modern-image">
                    <div class="servico-card-modern-content">
                        <span class="servico-card-modern-category">${escapeHtml(s.nomeCategoria)}</span>
                        <h3 class="servico-card-modern-title">${escapeHtml(s.nome)}</h3>
                        <p class="servico-card-modern-price">${formatCurrency(s.preco)}</p>
                        <button class="servico-card-modern-edit-button" onclick="window.location.href='detalhe-servico.html?id=${s.idServico}'">
                            <i class="fas fa-pen"></i> Ver detalhes
                        </button>
                    </div>
                </div>
            `;
        }

        return `
            <div class="servico-card" onclick="window.location.href='detalhe-servico.html?id=${s.idServico}'">
                <img src="${s.imagemServico}" alt="Imagem do serviço" class="card-img">
                <h3>${escapeHtml(s.nome)}</h3>
                <p>${escapeHtml(s.descricao)}</p>
                <div class="creator">
                    <img src="${s.fotoPerfil}" class="creator-img">
                    <span class="creator-name">${escapeHtml(s.nomeFreelancer)}</span>
                </div>
                <span class="genero-tag">${escapeHtml(s.nomeCategoria)}</span>
                <div class="preco">${formatCurrency(s.preco)}</div>
            </div>
        `;
    }

    return {
        getToken,
        setToken,
        clearSession,
        logout,
        getStoredUser,
        setStoredUser,
        getApiPayload,
        normalizeUser,
        normalizeService,
        apiFetch,
        fetchCurrentUser,
        formatCurrency,
        serviceCardMarkup,
        showAlert,
        showConfirm,
        defaultProfileImage: DEFAULT_PROFILE_IMAGE
    };
})();
