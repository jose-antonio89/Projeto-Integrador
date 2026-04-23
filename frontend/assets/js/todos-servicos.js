document.addEventListener('DOMContentLoaded', async function() {
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

    let fetchUrl = '/api/servicos';
    if (categoryId) {
        const category = categories[categoryId];
        if (category) {
            document.getElementById('category-title').textContent = `Serviços de ${category.name}`;
            document.title = `Workly - ${category.name}`;
        }
        fetchUrl = `/api/servicos/categoria/${categoryId}`;
    } else {
        document.getElementById('category-title').textContent = 'Todos os Serviços';
        document.title = 'Workly - Todos os Serviços';
    }

    try {
        const response = await window.Workly.apiFetch(fetchUrl);
        const services = (response.dados || []).map(window.Workly.normalizeService);
        const servicosContainer = document.querySelector('.servicos-container');
        servicosContainer.innerHTML = '';
        if (services.length > 0) {
            services.forEach(service => {
                servicosContainer.innerHTML += window.Workly.serviceCardMarkup(service);
            });
        } else {
            servicosContainer.innerHTML = '<p>Nenhum serviço encontrado.</p>';
        }
    } catch (error) {
        console.error('Erro ao buscar serviços:', error);
    }
});
