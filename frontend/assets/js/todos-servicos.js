document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id_categoria') || urlParams.get('id') || urlParams.get('categoria');
    const termoOriginal = (urlParams.get('q') || urlParams.get('busca') || '').trim();

    const categories = {
        1: { name: 'Design' },
        2: { name: 'Programação' },
        3: { name: 'Video/Edição' },
        4: { name: 'Inteligência Artificial' },
        5: { name: 'Tradução/Escritor' },
        6: { name: 'Fotografia' },
        7: { name: 'Áudio/Música' }
    };

    const titleEl = document.getElementById('category-title');
    const form = document.getElementById('servicesFilterForm');
    const filterSearch = document.getElementById('filterSearch');
    const filterCategory = document.getElementById('filterCategory');
    const filterMin = document.getElementById('filterMin');
    const filterMax = document.getElementById('filterMax');
    const filterRating = document.getElementById('filterRating');
    const filterSort = document.getElementById('filterSort');
    const servicosContainer = document.querySelector('.servicos-container');

    if (filterSearch) filterSearch.value = termoOriginal;
    if (filterCategory && categoryId) filterCategory.value = categoryId;
    if (filterMin) filterMin.value = urlParams.get('min') || urlParams.get('precoMin') || '';
    if (filterMax) filterMax.value = urlParams.get('max') || urlParams.get('precoMax') || '';
    if (filterRating) filterRating.value = urlParams.get('avaliacaoMin') || '';
    if (filterSort) filterSort.value = urlParams.get('ordenar') || 'recentes';

    function updateTitle() {
        const termo = (filterSearch?.value || termoOriginal).trim();
        const categoriaSelecionada = filterCategory?.value || categoryId;
        if (termo && categoriaSelecionada) {
            const category = categories[categoriaSelecionada];
            if (titleEl) titleEl.textContent = `Resultados para "${termo}" em ${category?.name || 'categoria'}`;
            document.title = 'Workly - Busca';
        } else if (termo) {
            if (titleEl) titleEl.textContent = `Resultados para "${termo}"`;
            document.title = 'Workly - Busca';
        } else if (categoriaSelecionada) {
            const category = categories[categoriaSelecionada];
            if (category && titleEl) titleEl.textContent = `Serviços de ${category.name}`;
            document.title = category ? `Workly - ${category.name}` : 'Workly - Categoria';
        } else {
            if (titleEl) titleEl.textContent = 'Todos os Serviços';
            document.title = 'Workly - Todos os Serviços';
        }
    }

    function buildApiParams() {
        const apiParams = new URLSearchParams();
        const termo = (filterSearch?.value || '').trim();
        if (termo) apiParams.set('q', termo);
        if (filterCategory?.value) apiParams.set('categoria', filterCategory.value);
        if (filterMin?.value) apiParams.set('min', filterMin.value);
        if (filterMax?.value) apiParams.set('max', filterMax.value);
        if (filterRating?.value) apiParams.set('avaliacaoMin', filterRating.value);
        if (filterSort?.value) apiParams.set('ordenar', filterSort.value);
        apiParams.set('page', '1');
        apiParams.set('limit', '24');
        return apiParams;
    }

    async function loadServices(pushUrl = false) {
        updateTitle();
        const apiParams = buildApiParams();
        const fetchUrl = `/api/servicos${apiParams.toString() ? `?${apiParams.toString()}` : ''}`;
        if (servicosContainer) servicosContainer.innerHTML = window.Workly.loadingMarkup('Carregando serviços...');
        if (pushUrl) history.replaceState(null, '', `todos-servicos.html${apiParams.toString() ? `?${apiParams.toString()}` : ''}`);
        try {
            const response = await window.Workly.apiFetch(fetchUrl);
            const services = (response.dados || []).map(window.Workly.normalizeService);
            if (!servicosContainer) return;
            servicosContainer.innerHTML = services.length
                ? services.map(service => window.Workly.serviceCardMarkup(service)).join('')
                : '<div class="no-service"><i class="fas fa-search"></i><h2>Nenhum serviço encontrado</h2><p>Tente ajustar a busca, categoria ou filtros.</p><a class="btn-add" href="todos-servicos.html">Limpar filtros</a></div>';
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
            if (servicosContainer) servicosContainer.innerHTML = '<div class="no-service"><i class="fas fa-triangle-exclamation"></i><h2>Erro ao carregar</h2><p>Tente novamente em alguns instantes.</p></div>';
        }
    }

    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        loadServices(true);
    });

    loadServices(false);
});
