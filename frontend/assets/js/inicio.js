document.addEventListener('DOMContentLoaded', async function() {
    const servicePlaceholder = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520">
            <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#0b1d38"/>
                    <stop offset="100%" stop-color="#163f7a"/>
                </linearGradient>
            </defs>
            <rect width="800" height="520" fill="url(#bg)" rx="24"/>
            <circle cx="690" cy="90" r="80" fill="rgba(255,255,255,0.10)"/>
            <circle cx="95" cy="430" r="70" fill="rgba(255,255,255,0.08)"/>
            <text x="50%" y="50%" fill="#eaf2ff" font-family="Poppins, Arial, sans-serif" font-size="42" font-weight="700" text-anchor="middle">Workly</text>
            <text x="50%" y="60%" fill="#8de7b0" font-family="Poppins, Arial, sans-serif" font-size="24" text-anchor="middle">Imagem do serviço</text>
        </svg>
    `);

    const profilePlaceholder = window.Workly?.DEFAULT_PROFILE_IMAGE || '../assets/img/perfis/perfil_padrao.png';

    try {
        const response = await window.Workly.apiFetch('/api/servicos');
        const services = (response.dados || []).map(window.Workly.normalizeService);
        const cardContainer = document.querySelector('.card-container');
        if (!cardContainer) return;

        cardContainer.innerHTML = '';
        services.forEach(service => {
            const imageSrc = service.imagemServico || servicePlaceholder;
            const profileSrc = service.fotoPerfil || profilePlaceholder;
            const title = service.nome || 'Serviço';
            const freelancerName = service.nomeFreelancer || 'Freelancer';
            const card = `
                <div class="card" onclick="window.location.href='detalhe-servico.html?id=${service.idServico}'">
                    <img src="${imageSrc}" alt="${title}" class="img-servico" loading="lazy" onerror="this.onerror=null;this.src='${servicePlaceholder}'">
                    <div class="card-content">
                        <div class="creator-info">
                            <img src="${profileSrc}" alt="Foto de ${freelancerName}" class="creator-img" loading="lazy" onerror="this.onerror=null;this.src='${profilePlaceholder}'">
                            <span class="creator-name">${freelancerName}</span>
                        </div>
                        <h3 class="service-title">${title}</h3>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${service.mediaAvaliacoes || 'Novo'}</span>
                        </div>
                        <div class="price">A partir de ${window.Workly.formatCurrency(service.preco)}</div>
                    </div>
                </div>
            `;
            cardContainer.innerHTML += card;
        });
    } catch (error) {
        console.error('Erro ao buscar serviços:', error);
    }
});
