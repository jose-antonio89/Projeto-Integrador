async function fetchAndDisplayUsuario() {
    return window.Workly.fetchCurrentUser(true);
}

function renderizarCabecalho(user) {
    const currentPage = (window.location.pathname.split('/').pop() || '').toLowerCase();
    const pagesWithoutCategories = new Set(['sobre.html', 'cadastro.html', 'login.html']);
    const hideCategories = pagesWithoutCategories.has(currentPage);

    const categoriesHTML = `
        <div class="separação"></div>
        <div class="categorias">
            <a href="categorias.html?id=1"><div class="categoria"><i class="fas fa-paint-brush mr-2"></i> Design</div></a>
            <a href="categorias.html?id=2"><div class="categoria"><i class="fas fa-code mr-2"></i> Programação</div></a>
            <a href="categorias.html?id=3"><div class="categoria"><i class="fa-solid fa-film"></i> Video/Edição</div></a>
            <a href="categorias.html?id=4"><div class="categoria"><i class="fa-solid fa-wifi"></i> Inteligência Artificial</div></a>
            <a href="categorias.html?id=5"><div class="categoria"><i class="fa-solid fa-book"></i> Tradução/Escritor</div></a>
            <a href="categorias.html?id=6"><div class="categoria"><i class="fa-solid fa-camera"></i> Fotografia</div></a>
            <a href="categorias.html?id=7"><div class="categoria"><i class="fa-solid fa-headphones"></i> Áudio/Música</div></a>
        </div>
        <div class="separação"></div>
    `;

    const loggedInMenu = `
        <div class="separação"></div>
        <div class="principal">
            <nav class="wk-nav wk-nav-auth">
                <a href="index.html" class="logo" id="home-logo">
                    <section><img class="imagem-logo" src="../assets/img/logo.png" alt=""></section>
                    <span class="click-effect"></span>
                </a>
                <div class="search-container">
                    <input type="text" class="search-box" placeholder="O que você está buscando?">
                </div>
                <ul class="cabecalho">
                    <li><a href="index.html" class="menu-item">Home</a></li>
                    <li><a href="sobre.html" class="menu-item">Sobre Nós</a></li>
                </ul>
                <div class="profile-menu">
                    <a href="perfil.html" class="user-name-nav">${user ? user.nome.split(' ')[0] : ''}</a>
                    <div class="profile-ball" id="profileBall">
                        <img src="${user?.fotoPerfil || window.Workly.defaultProfileImage}" class="img-profile" alt="Perfil">
                    </div>
                    <div class="dropdown-menu" id="dropdownMenu">
                        <a href="perfil.html"><i class="fas fa-user"></i> Perfil</a>
                        <a href="#"><i class="fas fa-heart"></i> Favoritos</a>
                        <a href="#"><i class="fas fa-briefcase"></i> Contratados</a>
                        <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Sair</a>
                    </div>
                </div>
            </nav>
        </div>
    `;

    const guestMenu = `
        <div class="separação"></div>
        <div class="principal">
            <nav class="wk-nav wk-nav-guest">
                <a href="index.html" class="logo" id="home-logo">
                    <section><img class="imagem-logo" src="../assets/img/logo.png" alt=""></section>
                    <span class="click-effect"></span>
                </a>
                <div class="search-container">
                    <input type="text" class="search-box" placeholder="O que você está buscando?">
                </div>
                <ul class="cabecalho">
                    <li><a href="index.html" class="menu-item">Home</a></li>
                    <li><a href="cadastro.html" class="menu-item">Cadastre-se</a></li>
                    <li><a href="login.html" class="menu-item">Login</a></li>
                    <li><a href="sobre.html" class="menu-item">Sobre Nós</a></li>
                </ul>
            </nav>
        </div>
    `;

    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = `${user ? loggedInMenu : guestMenu}${hideCategories ? '' : categoriesHTML}`;
    }

    const profileBall = document.getElementById('profileBall');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');

    if (profileBall && dropdownMenu) {
        profileBall.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => dropdownMenu.classList.remove('show'));
        dropdownMenu.addEventListener('click', (event) => event.stopPropagation());
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            window.Workly.logout('login.html');
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const usuario = await fetchAndDisplayUsuario();
    renderizarCabecalho(usuario);
});
