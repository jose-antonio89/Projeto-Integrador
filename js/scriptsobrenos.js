document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

   

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

    const teamMembers = document.querySelectorAll('.team-member');

    // funcao para verificar se o elemento esta visivel na tela
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom >= 0
        );
    };

    // funcao que adiciona a classe 'visible' para ativar a animacão
    const runAnimationOnScroll = () => {
        teamMembers.forEach(member => {
            if (isInViewport(member)) {
                member.classList.add('visible');
            }
        });
    };

    // adiciona os event listeners para scroll da pagina
    window.addEventListener('scroll', runAnimationOnScroll);
    
    // executa a função uma vez no carregamento para o caso de elementos ja estarem visiveis
    runAnimationOnScroll();
});