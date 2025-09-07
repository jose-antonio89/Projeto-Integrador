

document.addEventListener('DOMContentLoaded', function() {
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.replace('fa-moon', 'fa-sun');
}
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
        window.location.href = 'index.html';
        
    });
});

