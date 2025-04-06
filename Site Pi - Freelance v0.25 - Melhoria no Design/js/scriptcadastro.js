document.addEventListener('DOMContentLoaded', function() {
  // ELEMENTOS PRINCIPAIS
  const tipoConta = document.getElementById('tipo_conta');
  const areaAtuacaoGroup = document.getElementById('area-atuacao-group');
  const form = document.getElementById('formCadastro');

  //Verifica se os mesmos existem
  if (!tipoConta || !areaAtuacaoGroup || !form) {
    console.error('Elementos essenciais do formulário não encontrados');
    return;
  }
  
  // Mostrar/ocultar area de atuação
  tipoConta.addEventListener('change', function() {
      if (this.value === 'freelancer') {
          areaAtuacaoGroup.style.display = 'block';
          document.getElementById('area_atuacao').setAttribute('required', '');
      } else {
          areaAtuacaoGroup.style.display = 'none';
          document.getElementById('area_atuacao').removeAttribute('required');
      }
  });

   // Validação de formulario
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validação basica
      const senha = document.getElementById('senha').value;
      const confirmarSenha = document.getElementById('confirmar_senha').value;
      const termos = document.getElementById('termos').checked;
      
      // Verificar senhas
      if (senha !== confirmarSenha) {
         e.preventDefault();
         alert('As senhas não coincidem');
          return;
      }
      
      // Verificar termos
      if (!termos) {
          alert('Você deve aceitar os termos de serviço');
          return;
      }
      
      // Simular envio
      const submitButton = document.querySelector('.submit-button');
      if (submitButton) {
          submitButton.classList.add('loading');
          submitButton.disabled = true;
          
          setTimeout(() => {
              submitButton.classList.remove('loading');
              submitButton.disabled = false;
              alert('Cadastro realizado com sucesso!');
              form.reset();
          }, 1500);
      }
  });
  
  
  // Validação em tempo real
  form.querySelectorAll('input').forEach(input => {
      input.addEventListener('blur', function() {
          validateField(this);
      });
  });
  

  // Função para validar campos
  function validateField(field) {
      const formGroup = field.closest('.form-group');
      const errorMessage = formGroup.querySelector('small');
      
      if (!field.value.trim() && field.required) { //MENSAGEM DE CAMPO OBRIGATORIO
          formGroup.classList.add('error');
          errorMessage.textContent = 'Este campo é obrigatório';
          errorMessage.style.display = 'block';
      } else {
          formGroup.classList.remove('error');
          formGroup.classList.add('success');
          errorMessage.style.display = 'none';
          
          // Validação especifica para email
          if (field.type === 'email' && !isValidEmail(field.value)) {
              formGroup.classList.add('error');
              errorMessage.textContent = 'Por favor, insira um email válido';
              errorMessage.style.display = 'block';
          }
          
          // Validação especifica para senha
          if (field.id === 'senha' && field.value.length < 8) {
              formGroup.classList.add('error');
              errorMessage.textContent = 'A senha deve ter pelo menos 8 caracteres';
              errorMessage.style.display = 'block';
          }
      }
  }
  
  // Função para validar email
  function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});