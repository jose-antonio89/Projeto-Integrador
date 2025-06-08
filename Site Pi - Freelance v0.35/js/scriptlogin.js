 // Adicionar classe de foco aos inputs
 const inputs = document.querySelectorAll('input');
        
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
 
 // Função para mostrar/ocultar senha
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
 
    // JavaScript para abrir o modal quando clicar no link "Esqueceu a senha?"
    document.querySelector('.forgot-password a').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('forgotPasswordModal').style.display = 'flex';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if(e.target === document.getElementById('forgotPasswordModal')) {
            document.getElementById('forgotPasswordModal').style.display = 'none';
        }
    });
