
document.addEventListener('DOMContentLoaded', function() {
    // Upload de img
    const uploadArea = document.getElementById('uploadArea');
    const coverImageInput = document.getElementById('coverImage');
    const imagePreview = document.getElementById('imagePreview');
    
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
    
    // arrastar e soltar
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
            const event = new Event('change');
            coverImageInput.dispatchEvent(event);
        }
    });
    
    // Contador de caracteres
    const adDescription = document.getElementById('adDescription');
    const charCount = document.getElementById('charCount');
    
    adDescription.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });
    
    // Validação do forms
    const adForm = document.querySelector('.ad-form');
    
    adForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // validção adicionais podem ser adicionadas aqui
        alert('Anúncio enviado com sucesso!');
        // this.submit(); // Descomente para enviar o form real
    });
});


//Perfil

document.addEventListener('DOMContentLoaded', function() {
    const profileBall = document.getElementById('profileBall');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Ativa dropdown
    profileBall.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });
    
    // fecha dropdown
    document.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
    });
    
    // previne que dropdown feche se clicar dentro dele
    dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // deslogar
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        //------------
        window.location.href = 'index.html';
        
    });
});