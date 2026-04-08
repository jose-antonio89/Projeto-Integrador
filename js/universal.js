async function fetchAndDisplayUser() {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    try {
        const response = await fetch('http://localhost:3000/api/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        // localStorage.removeItem('token');
        // window.location.href = 'login.html';
        return null;
    }
}

function renderHeader(user) {
    const categoriesHTML = `
        <div class="separação"></div>
        <div class="categorias">
            <a href="category.html?id=1"><div class="categoria"><i class="fas fa-paint-brush mr-2"></i> Design</div></a>
            <a href="category.html?id=2"><div class="categoria"><i class="fas fa-code mr-2"></i> Programação</div></a>
            <a href="category.html?id=3"><div class="categoria"><i class="fa-solid fa-film"></i> Video/Edição</div></a>
            <a href="category.html?id=4"><div class="categoria"><i class="fa-solid fa-wifi"></i> Inteligência Artificial</div></a>
            <a href="category.html?id=5"><div class="categoria"><i class="fa-solid fa-book"></i> Tradução/Escritor</div></a>
            <a href="category.html?id=6"><div class="categoria"><i class="fa-solid fa-camera"></i> Fotografia</div></a>
            <a href="category.html?id=7"><div class="categoria"><i class="fa-solid fa-headphones"></i> Áudio/Música</div></a>
        </div>
        <div class="separação"></div>
    `;

    const loggedInMenu = `
        <div class="separação"></div>
        <div class="principal">
            <nav> 
                <a href="index.html" class="logo" id="home-logo">
                    <section><img class="imagem-logo" src="img/logo.png" alt=""></section>
                    <span class="click-effect"></span>
                </a>
                <div class="search-container">
                    <input type="text" class="search-box" placeholder="O que você está buscando?">
                </div>
                <ul class="cabecalho">
                    <li><a href="index.html" class="menu-item">HomePage</a></li>
                    <li><a href="SobreNos.html" class="menu-item">Sobre Nós</a></li>
                </ul>
                <div class="profile-menu">  
                    <a href="perfil.html" class="user-name-nav">${user ? user.nome.split(' ')[0] : ''}</a>
                    <div class="profile-ball" id="profileBall">  
                        <img src="${user && user.foto_perfil ? user.foto_perfil : 'img/perfis/perfil_padrao.png'}" class="img-profile">
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
            <nav> 
                <a href="index.html" class="logo" id="home-logo">
                    <section><img class="imagem-logo" src="img/logo.png" alt=""></section>
                    <span class="click-effect"></span>
                </a>
                <div class="search-container">
                    <input type="text" class="search-box" placeholder="O que você está buscando?">
                </div>
                <ul class="cabecalho">
                    <li><a href="index.html" class="menu-item">HomePage</a></li>
                    <li><a href="index2.html" class="menu-item">Cadastre-se</a></li>
                    <li><a href="login.html" class="menu-item">Login</a></li>
                    <li><a href="SobreNos.html" class="menu-item">Sobre Nós</a></li>
                </ul>       
            </nav>
        </div>
    `;

    const header = document.querySelector('header');
    if (user) {
        header.innerHTML = loggedInMenu + categoriesHTML;
    } else {
        header.innerHTML = guestMenu + categoriesHTML;
    }

    if (user) {
        const profileBall = document.getElementById('profileBall');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const logoutBtn = document.getElementById('logoutBtn');

        if(profileBall) {
            profileBall.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });
        }
    
        if(dropdownMenu) {
            document.addEventListener('click', function() {
                dropdownMenu.classList.remove('show');
            });
            
            dropdownMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    
        if(logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const user = await fetchAndDisplayUser();
    renderHeader(user);
    document.dispatchEvent(new CustomEvent('headerRendered'));
});
