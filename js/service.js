document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    

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
    if (token && user) {
        header.innerHTML = loggedInMenu + categoriesHTML;
    } else {
        header.innerHTML = guestMenu + categoriesHTML;
    }

    if (token && user) {
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
                localStorage.removeItem('user');
                window.location.href = 'login.html';
            });
        }
    }

    fetch(`http://localhost:3000/api/services/${serviceId}`)
        .then(response => response.json())
        .then(service => {
            document.querySelector('.service-main-image').src = service.imagem_servico;
            document.querySelector('.service-category-badge').textContent = service.nome_genero;
            document.querySelector('.service-title').textContent = service.nome;
            document.querySelector('.freelancer-avatar-small').src = service.foto_perfil;
            document.querySelector('.freelancer-name').textContent = service.nome_freelancer;
            document.querySelector('.service-description').innerHTML = service.descricao.replace(/\n/g, '<br>');
            document.querySelector('.service-price').textContent = `R$ ${Number(service.preco).toFixed(2).replace('.', ',')}`;
            document.title = `Workly - ${service.nome}`;

            if (user && user.id_usuario === service.id_usuario) {
                const editButtonContainer = document.getElementById('edit-button-container');
                editButtonContainer.innerHTML = `<a href="editar_servico.html?id=${service.id_servico}" class="btn-edit"><i class="fas fa-pen"></i> Editar Serviço</a>`;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar serviço:', error);
        });
});