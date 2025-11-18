


// Verificar preferencia salva DARKMODE
document.addEventListener('DOMContentLoaded', function() {
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  const icon = darkModeToggle.querySelector('i');
  icon.classList.replace('fa-moon', 'fa-sun');
}
});

//Função para favoritar
function toggleFavorite(btn) {
    btn.classList.toggle('favorited');
    const isFavorited = btn.classList.contains('favorited');
    localStorage.setItem('favorito', isFavorited);
}

// Verificar estado ao carregar a pagina
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.save-btn');
    const isFavorited = localStorage.getItem('favorito') === 'true';
    if (isFavorited) {
        btn.classList.add('favorited');
    }
});


//Perfil

document.addEventListener('DOMContentLoaded', function() {
    const profileBall = document.getElementById('profileBall');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');

    // verifica se os elementos essenciais do dropdown existem na pagina
    if (profileBall && dropdownMenu) {
        
        // ativa dropdown
        profileBall.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // fecha dropdown quando clicar fora
        document.addEventListener('click', function() {
            dropdownMenu.classList.remove('show');
        });
        
        // previne que o dropdown feche ao clicar dentro dele
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // verifica se cada botão de logout existe
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // logica de deslogar
            window.location.href = 'php/logout.php';
        });
    }
});