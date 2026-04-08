document.addEventListener('DOMContentLoaded', function() {


    const inputs = document.querySelectorAll('input');
    const forgotPasswordForm = document.querySelector('.forgot-password-form');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const formLogin = document.getElementById('formLogin');


    
    // Efeitos visuais nos inputs
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) input.parentElement.classList.remove('focused');
        });
    });


   
    // Mostrar/Ocultar senha
    
    const passwordToggleBtn = document.querySelector('.password-toggle');
    if (passwordToggleBtn) {
        passwordToggleBtn.addEventListener('click', () => {
            const passwordInput = document.getElementById('senha');
            const passwordIcon = passwordToggleBtn.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordIcon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }


    
    // Modal "Esqueci minha senha"
    
    const forgotLink = document.querySelector('.forgot-password a');
    if (forgotLink && forgotPasswordModal) {
        forgotLink.addEventListener('click', e => {
            e.preventDefault();
            forgotPasswordModal.style.display = 'flex';
        });


        window.addEventListener('click', e => {
            if (e.target === forgotPasswordModal) forgotPasswordModal.style.display = 'none';
        });
    }


    
    // LOGIN via fetch
    
    if (formLogin) {
        formLogin.addEventListener('submit', async e => {
            e.preventDefault();


            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();


            if (!email || !senha) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos obrigatórios!',
                    text: 'Preencha todos os campos para continuar.'
                });
                return;
            }


            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, senha })
                });


                const resultado = await response.json();


                if (response.ok) {
                    localStorage.setItem('token', resultado.token);
                    localStorage.setItem('user', JSON.stringify(resultado.user));
                    Swal.fire({
                        icon: 'success',
                        title: 'Login bem-sucedido!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro no login',
                        text: resultado
                    });
                }


            } catch (erro) {
                console.error('Erro ao conectar:', erro);
                Swal.fire({
                    icon: 'error',
                    title: 'Falha de conexão!',
                    text: 'Não foi possível conectar ao servidor.'
                });
            }
        });
    }


    
    // Recuperar senha (modal)
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async e => {
            e.preventDefault();
            const email = document.getElementById('recovery-email').value;
            Swal.fire({
                icon: 'info',
                title: 'E-mail enviado!',
                text: 'Instruções para redefinir sua senha foram enviadas para ' + email
            });
            forgotPasswordModal.style.display = 'none';
        });
    }
});