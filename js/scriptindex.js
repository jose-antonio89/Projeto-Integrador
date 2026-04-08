document.addEventListener('DOMContentLoaded', function() {
    //Fetch 
    fetch('http://localhost:3000/api/services')
        .then(response => response.json())
        .then(services => {
            const cardContainer = document.querySelector('.card-container');
            cardContainer.innerHTML = '';
            services.forEach(service => {
                const card = `
                    <div class="card" onclick="window.location.href='service.html?id=${service.id_servico}'">
                        <img src="${service.imagem_servico}" alt="${service.nome}" class="img-servico">
                        <div class="card-content">
                            <div class="creator-info">
                                <img src="${service.foto_perfil || 'img/perfis/perfil_padrao.png'}" class="creator-img">
                                <span class="creator-name">${service.nome_freelancer}</span>
                            </div>
                            <h3 class="service-title">${service.nome}</h3>
                            <div class="rating">
                                <i class="fas fa-star"></i>
                                <span>${service.media_avaliacoes || 'Novo'}</span>
                            </div>
                            <div class="price">A partir de R$ ${Number(service.preco).toFixed(2).replace('.', ',')}</div>
                        </div>
                    </div>
                `;
                cardContainer.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Erro ao buscar serviços:', error);
        });
});