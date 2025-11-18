<?php
session_start();
require_once "php/conexao.php";

$id_categoria = $_GET['id_categoria'] ?? null;

if (!$id_categoria) {
    die("Categoria inválida.");
}

$stmt = $conn->prepare("
    SELECT s.*, g.nome_genero, u.nome AS nome_freelancer, u.foto_perfil
    FROM servicos s
    INNER JOIN generos g ON g.id_genero = s.genero_id
    INNER JOIN servicos_freelancer sf ON sf.servico_id = s.id_servico
    INNER JOIN usuarios u ON u.freelancer_id = sf.freelancer_id
    WHERE s.genero_id = ?
    ORDER BY s.id_servico DESC
");
$stmt->bind_param("i", $id_categoria);
$stmt->execute();
$servicos = $stmt->get_result();


$cat = $conn->query("SELECT nome_genero FROM generos WHERE id_genero = $id_categoria")->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workly</title>
    <link rel="stylesheet" href="css/style.css">
<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="css/dark-mode.css">
<link rel="stylesheet" href="css/allservices.css">
<link rel="stylesheet" href="css/universal.css">
<script src="js/scriptindex.js"></script>
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
                     <a href="logout.php" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Sair</a>
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

<h1>Serviços de <?= $cat['nome_genero'] ?></h1>

<div class="servicos-container">
<?php while ($s = $servicos->fetch_assoc()): ?>
    <div class="servico-card" onclick="window.location.href='service.php?id=<?= $s['id_servico'] ?>'">
    
  
      <img src="<?php echo $s['imagem_servico']; ?>" alt="Imagem do serviço" class="card-img">
    

    <h3><?= htmlspecialchars($s['nome']) ?></h3>
    <p><?= htmlspecialchars($s['descricao']) ?></p>

    <div class="creator">
        <img src="<?php echo $s['foto_perfil']; ?>" class="creator-img">
        <span class="creator-name"><?= htmlspecialchars($s['nome_freelancer']) ?></span>
    </div>

    <span class="genero-tag"><?= htmlspecialchars($s['nome_genero']) ?></span>

    <div class="preco">R$ <?= number_format($s['preco'], 2, ',', '.') ?></div>
</div>
<?php endwhile; ?>
</div>