// Espera o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    //classe de foco aos inputs
    const inputs = document.querySelectorAll('input');
    const forgotPasswordForm = document.querySelector('.forgot-password-form');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    //mostrar/ocultar senha
    function togglePassword() {
        const passwordInput = document.getElementById('senha');
        const passwordToggle = document.querySelector('.password-toggle i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.classList.remove('fa-eye');
            passwordToggle.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            passwordToggle.classList.remove('fa-eye-slash');
            passwordToggle.classList.add('fa-eye');
        }
    }
    
    // SENHA 
    // evento de clique ao botão de toggle da senha
    document.querySelector('.password-toggle').addEventListener('click', togglePassword);
    
    
    // JavaScript para abrir o modal quando clicar no link "Esqueceu a senha?"
    document.querySelector('.forgot-password a').addEventListener('click', function(e) {
        e.preventDefault();
        forgotPasswordModal.style.display = 'flex';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if(e.target === forgotPasswordModal) {
            forgotPasswordModal.style.display = 'none';
        }
    });
    
    // Manipulador do formulario de login
    document.getElementById('formLogin').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('senha').value;
        
        try {
            const user = await checkCredentials(nome, senha);
            
            if (user) {
                alert('Login bem-sucedido! Bem-vindo, ' + user.nome);
                // Aqui você pode redirecionar para a pagina principal
                window.location.href = 'indexlogado.html';
            } else {
                alert('Credenciais inválidas. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
            alert('Ocorreu um erro durante o login. Por favor, tente novamente.');
        }
    });
    
    // Manipulador do formulário de recuperação de senha
    forgotPasswordForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const email = document.getElementById('recovery-email').value;
        
        try {
            const user = await getUserByEmail(email);
            
            if (user) {
                alert('Instruções para redefinição de senha foram enviadas para ' + email);
                forgotPasswordModal.style.display = 'none';
            } else {
                alert('Nenhum usuário encontrado com este e-mail.');
            }
        } catch (error) {
            console.error('Erro ao recuperar senha:', error);
            alert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
        }
    });
});