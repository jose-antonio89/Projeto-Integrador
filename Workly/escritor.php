<?php
session_start();
require_once "php/conexao.php";

// define a categoria da pagina
$id_categoria = 5; // IA = 5


//pega apenas 6 servicos
$stmt = $conn->prepare("
    SELECT s.*, g.nome_genero, u.nome AS nome_freelancer, u.foto_perfil
    FROM servicos s
    INNER JOIN generos g ON g.id_genero = s.genero_id
    INNER JOIN servicos_freelancer sf ON sf.servico_id = s.id_servico
    INNER JOIN usuarios u ON u.freelancer_id = sf.freelancer_id
    WHERE s.genero_id = ?
    ORDER BY s.id_servico DESC
    LIMIT 6
");
if (!$stmt) {
    die("Erro no prepare: " . $conn->error);
}

$stmt->bind_param("i", $id_categoria);
$stmt->execute();
$servicos = $stmt->get_result();


// pega nome da categoria 
$catStmt = $conn->prepare("SELECT nome_genero FROM generos WHERE id_genero = ?");
$catStmt->bind_param("i", $id_categoria);
$catStmt->execute();
$catRes = $catStmt->get_result();
$cat = $catRes->fetch_assoc();
$catName = $cat['nome_genero'] ?? 'Categoria';


?>

<!----------------------------------->

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workly</title>
    <link rel="stylesheet" href="css/categorias.css">
<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="css/dark-mode.css">
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
      
    <div class="container">
      <div class="cabeca">
          <h1>Writting/Tradução</h1>
          <p>Demonstre seus trabalhos em Writting e Tradução</p>
      </div>

      <div class="btn-container">
          <button class="btn"><span class="icon"></span>Resumo</button>
          <button class="btn"><span class="icon"></span>Escritor</button>
          <button class="btn"><span class="icon"></span>Tradutor</button>
          <button class="btn"><span class="icon"></span>Escritor de script</button>
          <button class="btn"><span class="icon"></span>Descrições</button>
      </div>
  </div>



  <!---CARDS DE SERVIÇO-->

  <section class="popular-services">
    <div class="section-header">
      <h2>Serviços Populares</h2>
      <p>Os serviços mais solicitados pelos clientes</p>
    </div>
    
    <div class="servicos-container">
<?php
if ($servicos && $servicos->num_rows > 0) {
    while ($s = $servicos->fetch_assoc()) {
        ?>
<div class="servico-card" onclick="window.location.href='service.php?id=<?= $s['id_servico'] ?>'">
    <img src="<?php echo $s['imagem_servico']; ?>" alt="Imagem do serviço" class="card-img">
    <h3><?php echo htmlspecialchars($s['nome']); ?></h3>
    <p class="descricao"><?php echo htmlspecialchars($s['descricao']); ?></p>
    <div class="genero"><?php echo htmlspecialchars($s['nome_genero']); ?></div>
      <div class="criador-info">
        <img src="<?php echo $s['foto_perfil']; ?>" class="criador-foto">
        <span class="criador-nome"><?php echo $s['nome_freelancer']; ?></span>
      </div>
    <div class="preco">R$ <?php echo number_format($s['preco'], 2, ',', '.'); ?></div>
</div>

        <?php
    }
} else {
   echo '
    <div class="no-service">
    <i class="fa-solid fa-circle-info"></i>
    <h2>Nenhum serviço disponível</h2>
    <p>Parece que ainda não há serviços cadastrados nesta categoria.  
    Volte mais tarde ou explore outras categorias.</p>

    <a href="../anuncio.php" class="btn-add">Criar um serviço</a>
    </div>';
}
?>

  </section>
   <div class="see-more-container">
      <a href="allservices.php?id_categoria=<?php echo $id_categoria; ?>" class="see-more-btn">Ver mais serviços de Tradução/Escrita <i class="fas fa-arrow-right"></i></a>
    </div>
<!-------------------------------------------------------------------------------------------------------------->



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
<script src="js/categorias.js"></script> 
  </body>
</html>