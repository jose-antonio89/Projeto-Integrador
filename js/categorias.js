document.addEventListener('headerRendered', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    const categories = {
        1: { name: 'Design', description: 'Demonstre seus trabalhos em design' },
        2: { name: 'Programação', description: 'Mostre suas habilidades em programação' },
        3: { name: 'Video/Edição', description: 'Edição e produção de vídeos' },
        4: { name: 'Inteligência Artificial', description: 'Serviços relacionados a IA' },
        5: { name: 'Tradução/Escritor', description: 'Serviços de escrita e tradução' },
        6: { name: 'Fotografia', description: 'Serviços de fotografia' },
        7: { name: 'Áudio/Música', description: 'Produção de áudio e música' }
    };

    const category = categories[categoryId];
    if (category) {
        document.getElementById('category-name').textContent = category.name;
        document.getElementById('category-description').textContent = category.description;
        document.title = `Workly - ${category.name}`;
        const seeMoreBtn = document.getElementById('see-more-btn');
        if (seeMoreBtn) {
            seeMoreBtn.href = `allservices.html?id_categoria=${categoryId}`;
        }
    }

    fetch(`http://localhost:3000/api/services/category/${categoryId}`)
        .then(response => response.json())
        .then(services => {
            const servicosContainer = document.querySelector('.servicos-container');
            servicosContainer.innerHTML = '';
            if (services.length > 0) {
                services.forEach(service => {
                    const serviceCard = `
                        <div class="servico-card" onclick="window.location.href='service.html?id=${service.id_servico}'">
                            <img src="${service.imagem_servico}" alt="Imagem do serviço" class="card-img">
                            <h3>${service.nome}</h3>
                            <p class="descricao">${service.descricao}</p>
                            <div class="genero">${service.nome_genero}</div>
                            <div class="criador-info">
                                <img src="${service.foto_perfil}" class="criador-foto">
                                <span class="criador-nome">${service.nome_freelancer}</span>
                            </div>
                            <div class="preco">R$ ${Number(service.preco).toFixed(2).replace('.', ',')}</div>
                        </div>
                    `;
                    servicosContainer.innerHTML += serviceCard;
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
        })
        .catch(error => {
            console.error('Erro ao buscar serviços:', error);
        });
});