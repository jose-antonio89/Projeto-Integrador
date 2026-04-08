<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workly - Encontre Freelancers</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css"><!--LINK DOS ICONES-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-icons/4.0.0/iconfont/material-icons.min.css"><!--LINK DOS ICONES-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    
</head>
<body>  
    <header>
        <?php if
        (isset($_SESSION['id_usuario'])): ?>
        
        <div class="separação"></div>
        <div class="principal">
            <nav> 
                <!-- LOGO -->
                <a href="index.php" class="logo" id="home-logo">
                    <section>
                        <img class="imagem-logo" src="img/logo.png" alt="">
                    </section>
                    <span class="click-effect"></span>
                </a>
                <!-- LOGO -->   
                <div class="search-container">
                    <input type="text" class="search-box" placeholder="O que você está buscando?">
                </div>
                <ul class="cabecalho">
                    <li><a href="index.php" class="menu-item">HomePage</a></li>
                    <li><a href="SobreNos.php" class="menu-item">Sobre Nós</a></li>
                </ul>
                <!-- PERFIL-->
                <div class="profile-menu">  
                    <a href="perfil.php"><?php $nomeCompleto = $_SESSION['nome']; 
                    $primeiroNome = explode(' ', trim($nomeCompleto))[0]; echo htmlspecialchars($primeiroNome);?> </a>  
                  <div class="profile-ball" id="profileBall">  
                  <img src="<?php echo htmlspecialchars($_SESSION['foto_perfil'] ?? 'img/perfis/perfil_padrao.png'); ?>" class="img-profile">
                  </div>
                    <div class="dropdown-menu" id="dropdownMenu">
                     <a href="perfil.php"><i class="fas fa-user"></i> Perfil</a>
                     <a href="#"><i class="fas fa-heart"></i> Favoritos</a>
                     <a href="#"><i class="fas fa-briefcase"></i> Contratados</a>
                     <a href="php/logout.php" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Sair</a>
                    </div>
                </div>       
            </nav>
        </div>
        <div class="separação"></div>
        <div class="categorias">
            <a href="design.php"><div class="categoria"><i class="fas fa-paint-brush mr-2"></i> Design</div></a>
            <a href="Programação.php"><div class="categoria"><i class="fas fa-code mr-2"></i> Programação</div></a>
            <a href="Animação.php"><div class="categoria"><i class="fa-solid fa-film"></i> Video/Edição</div></a>
            <a href="ArtistaIA.php"><div class="categoria"><i class="fa-solid fa-wifi"></i> Inteligência Artificial</div></a>
            <a href="escritor.php"><div class="categoria"><i class="fa-solid fa-book"></i> Tradução/Escritor</div></a>
            <a href="fotografias.php"><div class="categoria"><i class="fa-solid fa-camera"></i> Fotografia</div></a>
            <a href="audio.php"><div class="categoria"><i class="fa-solid fa-headphones"></i> Áudio/Música</div></a>
        </div>

        <div class="separação"></div>
        <?php else: ?>
        <!---NAVBAR-->
        <div class="separação"></div>
        <div class="principal">
            <nav> 
                <!-- LOGO -->
                <a href="index.php" class="logo" id="home-logo">
                    <section>
                        <img class="imagem-logo" src="img/logo.png" alt="">
                    </section>
                    <span class="click-effect"></span>
                </a>
                <!-- LOGO -->   
                <div class="search-container">
                    <input type="text" class="search-box" placeholder="O que você está buscando?">
                </div>
                <ul class="cabecalho">
                    <li><a href="index.php" class="menu-item">HomePage</a></li>
                    <li><a href="index2.html" class="menu-item">Cadastre-se</a></li>
                    <li><a href="login.php" class="menu-item">Login</a></li>
                    <li><a href="SobreNos.php" class="menu-item">Sobre Nós</a></li>
                </ul>       
            </nav>
        </div>
        <!---------------------------------------->
        <div class="separação"></div>
            <!-- CATEGORIAS -->
        <div class="categorias">
            <a href="design.php"><div class="categoria"><i class="fas fa-paint-brush mr-2"></i> Design</div></a>
            <a href="Programação.php"><div class="categoria"><i class="fas fa-code mr-2"></i> Programação</div></a>
            <a href="Animação.php"><div class="categoria"><i class="fa-solid fa-film"></i> Video/Edição</div></a>
            <a href="ArtistaIA.php"><div class="categoria"><i class="fa-solid fa-wifi"></i> Inteligência Artificial</div></a>
            <a href="escritor.php"><div class="categoria"><i class="fa-solid fa-book"></i> Tradução/Escritor</div></a>
            <a href="fotografias.php"><div class="categoria"><i class="fa-solid fa-camera"></i> Fotografia</div></a>
            <a href="audio.php"><div class="categoria"><i class="fa-solid fa-headphones"></i> Áudio/Música</div></a>
        </div>

        <div class="separação"></div>
        <?php endif; ?>

    </header>

    <div class="cabeca2">
        <h1>Conheça a Workly</h1>
        <p>O céu é o limite</p>
    </div>

    <!-------------------------------------INFO------------------------------------------->
    <div class="cards-container">

      <div class="workly-card">
        <h2 class="workly-title">Plataforma Inovadora</h2>
        <p class="workly-description">
           A Workly é uma plataforma digital que conecta freelancers e contratantes de forma segura e eficiente. Focada em Tecnologia, Design e Animação, oferece um ambiente completo com cadastro, busca avançada, comunicação, pagamentos e avaliações.
         </p>
        </div>
     <div class="workly-card">
         <h2 class="workly-title">Nossas Atividades</h2>
         <p class="workly-description">
          As atividades são divididas em quatro áreas: desenvolvimento contínuo da plataforma, divulgação para atrair talentos, suporte rápido e eficiente, e criação de oportunidades para a comunidade crescer com eventos e iniciativas.
         </p>
     </div>

    </div>
    <!-------------------------------------------------------------------------------->

    <div class="browsing">
        <h2>Serviços Workly</h2>

        <div class="card-container">
            <div class="card">
                <img src="https://images.unsplash.com/photo-1746365589074-e9b02c198257?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D" alt="Influencer IA">
                <h3>Influencer IA</h3>
                <p>Por Cauã - Level 0</p>
                <span class="price">Por R$999</span>
            </div>
            <div class="card">
                <img src="https://media.istockphoto.com/id/1411610158/pt/foto/multi-colored-programming-language-source-code-design-example-front-view-composition-on-a-dark.webp?a=1&b=1&s=612x612&w=0&k=20&c=blXtbCHSTfN_Bif4bjFIGOuKdKDH3zzeQ3puRAHFW3k=" alt="Programação">
                <h3>Programação</h3>
                <p>Por José - Level 0</p>
                <span class="price">Por R$999</span>
            </div>
            <div class="card">
                <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D" alt="Influencer">
                <h3>Programação</h3>
                <p>Por Lindolfo - Level 0</p>
                <span class="price">Por R$999</span>
            </div>
            <div class="card">
                <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D" alt="Design">
                <h3>Design</h3>
                <p>Por Cauã - Level 0</p>
                <span class="price">Por R$999</span>
            </div>
        </div>
    </div>




     <!-------------------------------FOOTER--------------------------------------->
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
<script src="js/scriptindex.js"></script>
</body>
</html>