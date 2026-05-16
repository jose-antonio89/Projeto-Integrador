// script para página inicial: busca serviços bem avaliados, exibe em destaque, lida com busca rápida e casos de erro

document.addEventListener("DOMContentLoaded", async function () {
  const servicePlaceholder =
    window.Workly?.defaultServiceImage ||
    "../assets/img/servicos/servico_padrao.svg";
  const profilePlaceholder =
    window.Workly?.defaultProfileImage ||
    "../assets/img/perfis/perfil_padrao.svg";
  const cardContainer = document.querySelector(".card-container");
  const heroSearch = document.querySelector(".hero-search");
  const heroInput = heroSearch?.querySelector("input");
  const heroButton = heroSearch?.querySelector("button");

  function executarBuscaHome() {
    const termo = (heroInput?.value || "").trim();
    window.location.href = termo
      ? `todos-servicos.html?q=${encodeURIComponent(termo)}`
      : "todos-servicos.html";
  }

  heroButton?.addEventListener("click", executarBuscaHome);
  heroInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") executarBuscaHome();
  });

  try {
    if (cardContainer)
      cardContainer.innerHTML = window.Workly.loadingMarkup(
        "Buscando serviços bem avaliados...",
      );
    const response = await window.Workly.apiFetch(
      "/api/servicos?avaliacaoMin=4.5&ordenar=recentes",
    );
    const services = (response.dados || [])
      .map(window.Workly.normalizeService)
      .slice(0, 6);
    if (!cardContainer) return;

    cardContainer.innerHTML = "";
    if (!services.length) {
      cardContainer.innerHTML = `
                <div class="empty-state-card compact featured-empty">
                    <h3>Sem destaques ainda</h3>
                    <p>Os serviços com avaliação igual ou maior que 4,5 aparecerão aqui automaticamente.</p>
                    <a href="todos-servicos.html" class="wk-service-details-pill">Ver todos os serviços</a>
                </div>
            `;
      return;
    }

    services.forEach((service) => {
      cardContainer.innerHTML += window.Workly.serviceCardMarkup(
        service,
        "featured",
      );
    });
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    if (cardContainer)
      cardContainer.innerHTML =
        '<div class="empty-state-card compact"><h3>Não foi possível carregar</h3><p>Tente novamente em alguns instantes.</p></div>';
  }
});
