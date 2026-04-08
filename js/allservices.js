document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id_categoria');

    const categories = {
        1: { name: 'Design' },
        2: { name: 'Programação' },
        3: { name: 'Video/Edição' },
        4: { name: 'Inteligência Artificial' },
        5: { name: 'Tradução/Escritor' },
        6: { name: 'Fotografia' },
        7: { name: 'Áudio/Música' }
    };

    let fetchUrl = 'http://localhost:3000/api/services';
    if (categoryId) {
        const category = categories[categoryId];
        if (category) {
            document.getElementById('category-title').textContent = `Serviços de ${category.name}`;
            document.title = `Workly - ${category.name}`;
        }
        fetchUrl = `http://localhost:3000/api/services/category/${categoryId}`;
    } else {
        document.getElementById('category-title').textContent = 'Todos os Serviços';
        document.title = 'Workly - Todos os Serviços';
    }

    fetch(fetchUrl)
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
                            <p>${service.descricao}</p>
                            <div class="creator">
                                <img src="${service.foto_perfil}" class="creator-img">
                                <span class="creator-name">${service.nome_freelancer}</span>
                            </div>
                            <span class="genero-tag">${service.nome_genero}</span>
                            <div class="preco">R$ ${Number(service.preco).toFixed(2).replace('.', ',')}</div>
                        </div>
                    `;
                    servicosContainer.innerHTML += serviceCard;
                });
            } else {
                servicosContainer.innerHTML = '<p>Nenhum serviço encontrado.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar serviços:', error);
        });
});