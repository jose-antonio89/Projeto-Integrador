document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formLogin');
    if (!form) return;

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email')?.value?.trim();
        const senha = document.getElementById('senha')?.value?.trim();

        try {
            const resultado = await window.Workly.apiFetch('/api/autenticacao/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const payload = resultado?.dados || resultado;
            const user = window.Workly.normalizeUser(payload.user || resultado.user || payload.usuario || resultado.usuario);
            const token = payload.token || resultado.token;

            window.Workly.setToken(token);
            window.Workly.setStoredUser(user);

            await window.Workly.showAlert({
                icon: 'success',
                title: 'Login realizado!',
                text: resultado.mensagem || 'Login realizado com sucesso.',
                confirmText: 'Continuar'
            });

            window.location.href = 'index.html';
        } catch (error) {
            console.error('Erro no login:', error);
            window.Workly.showAlert({
                icon: 'error',
                title: 'Erro no login',
                text: error.message || 'Não foi possível entrar na sua conta.',
                confirmText: 'Fechar'
            });
        }
    });
});
