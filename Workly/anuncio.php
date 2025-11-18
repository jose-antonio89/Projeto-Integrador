<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/anuncio.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <title>Anuncio - Workly</title>
</head>
<body>
  <header>
      <div class="separação"></div>
        <div class="principal">
          <nav> 
            <!-- <IMAGEM AKI> -->
              <a href="index.php" class="logo" id="home-logo">
                <section>
                    <img class="imagem-logo" src="img/logo.png" alt="">
                </section>   
                </a>
            <!-- <IMAGEM AKI> -->
             <div class="search-container">
              <input type="text" class="search-box" placeholder="Oque você esta buscando?">
            </div>
             <ul class="cabecalho">
               <li><a href="index.php" class="menu-item"> HomePage</a></li>
               <li><a href="SobreNos.php" class="menu-item">Sobre Nós</a></li>
             </ul>
              <!-- PERFIL-->
             <div class="profile-menu">
                  <div class="profile-ball" id="profileBall">
                  <img src="<?php echo htmlspecialchars($_SESSION['foto_perfil'] ?? 'img/perfis/perfil_padrao.png'); ?>" class="img-profile">
                  </div>
                    <div class="dropdown-menu" id="dropdownMenu">
                     <a href="perfil.php"><i class="fas fa-user"></i> Perfil</a>
                     <a href="#"><i class="fas fa-heart"></i> Favoritos</a>
                     <a href="#"><i class="fas fa-briefcase"></i> Contratados</a>
                     <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Sair</a>
                    </div>
                </div>            
          </nav>
        </div>
       <div class="separação"></div>      
      </header>

      
    <main class="create-ad-container">
        <h1 class="page-title">Criar Novo Anúncio</h1>
        
        <form class="ad-form" action="php/upload_servico.php" method="POST" enctype="multipart/form-data">
            <!-- Imagem de Capa -->
            <section class="form-section">
                <h2 class="section-title">Selecionar Imagem da Capa <span class="required">*</span></h2>
                <div class="cover-image-upload">
                    <div class="upload-area" id="uploadArea">
                        <i class="fas fa-cloud-upload-alt upload-icon"></i>
                        <p>Arraste e solte uma imagem ou clique para selecionar</p>
                        <input type="file" id="coverImage" accept="image/*" required name="imagem_servico">
                    </div>
                    <div class="image-preview" id="imagePreview"></div>
                </div>
            </section>

            <!--ESCOLHA DO GENERO-->
            <section class="form-section">
            <h2 class="section-title">Genero do Anúncio <span class="required">*</span></h2>
                    <select id="genero_servico" name="genero_id" required class="genero">
                        <option value="">Selecione...</option>
                        <option value="1">Design</option>
                        <option value="2">Programação</option>
                        <option value="3">Video/Edição</option>
                        <option value="4">Artista IA</option>
                        <option value="5">Escrita/Tradução</option>
                        <option value="6">Fotografia</option>
                        <option value="7">Áudio/Música</option>
                    </select>
            </section>

            <!-- Nome do anuncio-->
            <section class="form-section">
                <h2 class="section-title">Nome do Anúncio <span class="required">*</span></h2>
                <div class="form-group">
                    <textarea name="nome" id="adDescription" placeholder="Aqui você escreve o ponto principal do seu anúncio (mínimo 10 caracteres)" required minlength="10" maxlength="50"></textarea>
                    <div class="char-counter"><span id="charCount">0</span>/50</div>
                </div>
            </section>

            <!-- descrição do Serviço -->
            <section class="form-section">
                <h2 class="section-title">Descrição do Serviço <span class="required">*</span></h2>
                <div class="form-group">
                    <textarea name="descricao" id="serviceDetails" placeholder="Descreva detalhadamente o que você vai oferecer, incluindo detalhes, prazos, materiais necessários, possíveis adicionais etc... (mínimo 50 caracteres)" required minlength="50" maxlength="150"></textarea>
                    <div class="tips">
                        <p><i class="fas fa-lightbulb"></i> Dica: Liste os benefícios e diferenciais do seu serviço</p>
                    </div>
                </div>
            </section>

            <!-- Preço -->
            <section class="form-section">
                <h2 class="section-title">Preço do Serviço</h2>
                <div class="price-input">
                    <span class="currency">R$</span>
                    <input name="preco" type="number" id="servicePrice" placeholder="5000" min="20" step="0.01">
                </div>
                <div class="price-options">
                    <label><input type="checkbox" name="priceNegotiable"> Preço negociável</label>
                    <label><input type="checkbox" name="priceByContact"> Valor a combinar</label>
                </div>
            </section>

            <!-- Botão de envio -->
            <div class="form-actions">
                <button type="submit" class="submit-btn">Publicar Anúncio</button>
                <button type="button" class="draft-btn">Salvar como Rascunho</button>
            </div>
        </form>
    </main>
    
    <!------------- FOOTER --------------->
      <footer>
    <div class="footer-content">
        <div class="footer-section">
            <h3>Sobre a Workly</h3>
            <p>Conectando empresas aos melhores freelancers desde 2025.</p>
        </div>
        <div class="footer-section">
            <h3>Links Rápidos</h3>
            <ul>
                <li><a href="#">Termos de Serviço</a></li>
                <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Contato</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Redes Sociais</h3>
            <div class="social-icons">
                <a href="#"><i class="fab fa-facebook"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-linkedin"></i></a>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        &copy; 2025 Workly. Todos os direitos reservados.
    </div>
</footer>
 <script src="js/anuncio.js"></script>
</body>
</html>