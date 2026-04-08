document.addEventListener('DOMContentLoaded', () => {

    const teamMembers = document.querySelectorAll('.team-member');

    // funcao para verificar se o elemento esta visivel na tela
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom >= 0
        );
    };

    // funcao que adiciona a classe 'visible' para ativar a animacão
    const runAnimationOnScroll = () => {
        teamMembers.forEach(member => {
            if (isInViewport(member)) {
                member.classList.add('visible');
            }
        });
    };

    // adiciona os event listeners para scroll da pagina
    window.addEventListener('scroll', runAnimationOnScroll);
    
    // executa a função uma vez no carregamento para o caso de elementos ja estarem visiveis
    runAnimationOnScroll();
});