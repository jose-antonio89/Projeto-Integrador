document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    const categories = {
        1: { name: 'Design', description: 'Serviços criativos para identidade visual, interfaces e mais.' },
        2: { name: 'Programação', description: 'Desenvolvimento web, mobile, automações e sistemas.' },
        3: { name: 'Video/Edição', description: 'Edição de vídeos, motion e conteúdo audiovisual.' },
        4: { name: 'Inteligência Artificial', description: 'Soluções com IA, automação e modelos inteligentes.' },
        5: { name: 'Tradução/Escritor', description: 'Textos, revisão, copy e tradução profissional.' },
        6: { name: 'Fotografia', description: 'Ensaios, tratamento de imagem e cobertura visual.' },
        7: { name: 'Áudio/Música', description: 'Produção sonora, mixagem, locução e trilhas.' }
    };

    const titleElement = document.getElementById('category-title') || document.getElementById('category-name');
    const descriptionElement = document.getElementById('category-description');
    const seeMoreBtn = document.getElementById('see-more-btn');
    const servicosContainer = document.querySelector('.servicos-container');

    const category = categories[categoryId];
    if (category) {
        if (titleElement) titleElement.textContent = category.name;
        if (descriptionElement) descriptionElement.textContent = category.description;
        document.title = `Workly - ${category.name}`;
        if (seeMoreBtn) seeMoreBtn.href = `todos-servicos.html?id_categoria=${categoryId}`;
    }

    if (!servicosContainer) return;

    try {
        const response = await window.Workly.apiFetch(`/api/servicos/categoria/${categoryId}`);
        const services = (response.dados || []).map(window.Workly.normalizeService);

        servicosContainer.innerHTML = '';
        if (services.length > 0) {
            services.forEach(service => {
                servicosContainer.innerHTML += `
                    <div class="servico-card" onclick="window.location.href='detalhe-servico.html?id=${service.idServico}'">
                        <img src="${service.imagemServico}" alt="Imagem do serviço" class="card-img">
                        <h3>${service.nome}</h3>
                        <p class="descricao">${service.descricao}</p>
                        <div class="genero">${service.nomeCategoria}</div>
                        <div class="criador-info">
                            <img src="${service.fotoPerfil}" class="criador-foto">
                            <span class="criador-nome">${service.nomeFreelancer}</span>
                        </div>
                        <div class="preco">${window.Workly.formatCurrency(service.preco)}</div>
                    </div>
                `;
            });
        } else {
            servicosContainer.innerHTML = `
                <div class="no-service">
                    <i class="fa-solid fa-circle-info"></i>
                    <h2>Nenhum serviço disponível</h2>
                    <p>Parece que ainda não há serviços cadastrados nesta categoria. Volte mais tarde ou explore outras categorias.</p>
                    <a href="anuncio.html" class="btn-add">Criar um serviço</a>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        servicosContainer.innerHTML = `
            <div class="no-service">
                <i class="fa-solid fa-circle-info"></i>
                <h2>Não foi possível carregar os serviços</h2>
                <p>Tente novamente em instantes.</p>
            </div>
        `;
    }
});
