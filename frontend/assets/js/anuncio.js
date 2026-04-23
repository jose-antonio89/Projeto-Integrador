document.addEventListener('DOMContentLoaded', async function() {
    const user = await window.Workly.fetchCurrentUser(true);

    if (!window.Workly.getToken() || !user) {
        Swal.fire({
            icon: 'warning',
            title: 'Faça login primeiro',
            text: 'Você precisa estar logado para publicar um anúncio.',
            confirmButtonColor: '#04BF55'
        }).then(() => {
            window.location.href = 'login.html';
        });
        return;
    }

    if (user.tipoConta !== 'Freelancer') {
        Swal.fire({
            icon: 'error',
            title: 'Acesso restrito',
            text: 'Somente contas Freelancer podem publicar serviços.',
            confirmButtonColor: '#04BF55'
        }).then(() => {
            window.location.href = 'perfil.html';
        });
        return;
    }

    const profileImg = document.querySelector('.img-profile');
    if (profileImg) {
        profileImg.src = user.fotoPerfil;
    }

    const uploadArea = document.getElementById('uploadArea');
    const coverImageInput = document.getElementById('coverImage');
    const imagePreview = document.getElementById('imagePreview');
    if (uploadArea && coverImageInput && imagePreview) {
        uploadArea.addEventListener('click', () => coverImageInput.click());
        coverImageInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview da capa">`;
                    uploadArea.style.display = 'none';
                    imagePreview.style.display = 'flex';
                };
                reader.readAsDataURL(file);
            }
        });
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#04BF55';
            uploadArea.style.backgroundColor = 'rgba(4, 191, 85, 0.1)';
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#dbdbdb';
            uploadArea.style.backgroundColor = 'transparent';
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#dbdbdb';
            uploadArea.style.backgroundColor = 'transparent';
            if (e.dataTransfer.files.length > 0) {
                coverImageInput.files = e.dataTransfer.files;
                coverImageInput.dispatchEvent(new Event('change'));
            }
        });
    }

    const adDescription = document.getElementById('adDescription');
    const charCount = document.getElementById('charCount');
    if (adDescription && charCount) {
        adDescription.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    const adForm = document.querySelector('.ad-form');
    if (adForm) {
        adForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(adForm);
            if (formData.get('genero_id') && !formData.get('categoriaId')) {
                formData.append('categoriaId', formData.get('genero_id'));
            }

            try {
                await window.Workly.apiFetch('/api/servicos', {
                    method: 'POST',
                    body: formData
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Serviço enviado!',
                    text: 'Seu serviço foi publicado com sucesso.',
                    confirmButtonColor: '#04BF55'
                }).then(() => {
                    window.location.href = 'perfil.html';
                });
            } catch (error) {
                console.error('Erro ao criar serviço:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: error.message || 'Ocorreu um erro ao criar o serviço.',
                    confirmButtonColor: '#04BF55'
                });
            }
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.Workly.logout('login.html');
        });
    }
});
