// Ativa a animação dos membros da equipe ao rolar a página.
document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = document.querySelectorAll('.team-member');

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    };

    const runAnimationOnScroll = () => {
        teamMembers.forEach(member => {
            if (isInViewport(member)) {
                member.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', runAnimationOnScroll);
    runAnimationOnScroll();
});
