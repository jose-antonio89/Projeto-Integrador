document.addEventListener('DOMContentLoaded', function() {
  const bgElements = document.createElement('div');
  bgElements.style.position = 'fixed';
  bgElements.style.top = '0';
  bgElements.style.left = '0';
  bgElements.style.width = '100%';
  bgElements.style.height = '100%';
  bgElements.style.pointerEvents = 'none';
  bgElements.style.zIndex = '-1';
  bgElements.style.overflow = 'hidden';
  document.body.appendChild(bgElements);

  
  for (let i = 0; i < 15; i++) {
    const shape = document.createElement('div');
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 100 + 50;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    shape.style.position = 'absolute';
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.left = `${posX}%`;
    shape.style.top = `${posY}%`;
    shape.style.opacity = '0.6';
    shape.style.animation = `floatShape ${duration}s ease-in-out ${delay}s infinite alternate`;
    
    if (shapeType === 'circle') {
      shape.style.borderRadius = '50%';
      shape.style.backgroundColor = color;
    } else if (shapeType === 'triangle') {
      shape.style.width = '0';
      shape.style.height = '0';
      shape.style.borderLeft = `${size/2}px solid transparent`;
      shape.style.borderRight = `${size/2}px solid transparent`;
      shape.style.borderBottom = `${size}px solid ${color}`;
      shape.style.backgroundColor = 'transparent';
    } else {
      shape.style.transform = 'rotate(45deg)';
      shape.style.backgroundColor = color;
    }
    
    bgElements.appendChild(shape);
  }

  // Adiciona keyframes
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes floatShape {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      100% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);
});

//===================================================================================================//

document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
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
        "value": 3,
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