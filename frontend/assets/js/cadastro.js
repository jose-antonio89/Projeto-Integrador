document.addEventListener('DOMContentLoaded', function () {
    const tipoConta = document.getElementById('tipo_conta');
    const areaAtuacaoGroup = document.getElementById('area-atuacao-group');
    const areaAtuacao = document.getElementById('area_atuacao');
    const form = document.getElementById('formCadastro');

    if (!tipoConta || !areaAtuacaoGroup || !form) {
        console.error('Elementos essenciais do formulário não encontrados');
        return;
    }

    function updateAreaAtuacaoVisibility() {
        if (tipoConta.value === 'Freelancer') {
            areaAtuacaoGroup.style.display = 'block';
            areaAtuacao?.setAttribute('required', '');
        } else {
            areaAtuacaoGroup.style.display = 'none';
            if (areaAtuacao) {
                areaAtuacao.removeAttribute('required');
                areaAtuacao.value = '';
            }
        }
    }

    function ensureErrorMessage(formGroup) {
        let errorMessage = formGroup.querySelector('small');
        if (!errorMessage) {
            errorMessage = document.createElement('small');
            formGroup.appendChild(errorMessage);
        }
        return errorMessage;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateField(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return true;
        const errorMessage = ensureErrorMessage(formGroup);
        formGroup.classList.remove('error', 'success');
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';

        if (field.type === 'checkbox') {
            if (field.required && !field.checked) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Este campo é obrigatório';
                errorMessage.style.display = 'block';
                return false;
            }
            formGroup.classList.add('success');
            return true;
        }

        const value = field.value.trim();
        if (field.required && !value) {
            formGroup.classList.add('error');
            errorMessage.textContent = 'Este campo é obrigatório';
            errorMessage.style.display = 'block';
            return false;
        }

        if (field.type === 'email' && value && !isValidEmail(value)) {
            formGroup.classList.add('error');
            errorMessage.textContent = 'Por favor, insira um email válido';
            errorMessage.style.display = 'block';
            return false;
        }

        if (field.id === 'senha' && value && value.length < 8) {
            formGroup.classList.add('error');
            errorMessage.textContent = 'A senha deve ter pelo menos 8 caracteres';
            errorMessage.style.display = 'block';
            return false;
        }

        if (field.id === 'confirmar_senha') {
            const senha = document.getElementById('senha').value.trim();
            if (value && senha && value !== senha) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'As senhas não coincidem';
                errorMessage.style.display = 'block';
                return false;
            }
        }

        formGroup.classList.add('success');
        return true;
    }

    updateAreaAtuacaoVisibility();
    tipoConta.addEventListener('change', function () {
        updateAreaAtuacaoVisibility();
        validateField(this);
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        let hasError = false;
        form.querySelectorAll('input, select').forEach(field => {
            if (field.type === 'checkbox' && field.id !== 'termos') return;
            if (!validateField(field)) hasError = true;
        });

        const senha = document.getElementById('senha').value.trim();
        const confirmarSenha = document.getElementById('confirmar_senha').value.trim();
        const termos = document.getElementById('termos').checked;
        if (senha !== confirmarSenha || !termos) {
            hasError = true;
        }

        if (hasError) {
            window.Workly.showAlert({
                icon: 'warning',
                title: 'Revise o formulário',
                text: 'Preencha os campos obrigatórios corretamente antes de continuar.',
                confirmText: 'Entendi'
            });
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        delete data.newsletter;
        delete data.termos;

        if (tipoConta.value !== 'Freelancer') {
            delete data.area_atuacao;
        }

        data.tipoConta = data.tipo_conta;
        data.areaAtuacao = data.area_atuacao;

        try {
            const resultado = await window.Workly.apiFetch('/api/autenticacao/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            await window.Workly.showAlert({
                icon: 'success',
                title: 'Perfil criado com sucesso!',
                text: resultado.mensagem || 'Sua conta foi criada. Agora é só fazer login e começar.',
                confirmText: 'Ir para login'
            });

            window.location.href = 'login.html';
        } catch (error) {
            console.error('Erro ao conectar:', error);
            window.Workly.showAlert({
                icon: 'error',
                title: 'Não foi possível concluir o cadastro',
                text: error.message || 'Falha de conexão. Tente novamente em instantes.',
                confirmText: 'Fechar'
            });
        }
    });

    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('blur', function () { validateField(this); });
        field.addEventListener('change', function () { validateField(this); });
    });
});
