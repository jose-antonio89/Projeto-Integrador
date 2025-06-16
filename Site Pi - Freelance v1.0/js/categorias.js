

//===================================================================================================//
//Particulas
document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 20,
        "density": {
          "enable": true,
          "value_area": 900
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.5,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });
});

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
            window.location.href = 'index.html';
        });
    }
});