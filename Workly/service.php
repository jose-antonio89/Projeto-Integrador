<?php
session_start();
require_once 'php/conexao.php';

//Verifica se o ID foi enviado
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("<h2>Serviço inválido.</h2>");
}

$id_servico = intval($_GET['id']);

// consulta o serviço + freelancer
$query = "
    SELECT 
        s.*, 
        g.nome_genero,
        f.id_freelancer,
        u.nome AS nome_freelancer,
        u.foto_perfil
    FROM servicos s
    INNER JOIN generos g ON g.id_genero = s.genero_id
    INNER JOIN servicos_freelancer sf ON sf.servico_id = s.id_servico
    INNER JOIN freelancer f ON f.id_freelancer = sf.freelancer_id
    INNER JOIN usuarios u ON u.freelancer_id = f.id_freelancer
    WHERE s.id_servico = ?
";



$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id_servico);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "<h2>Serviço não encontrado.</h2>";
    exit;
}

$servico = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Serviço - Detalhes</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
    <style>
        :root {
            --primary: #04BF55;
            --primary-dark: #029d47;
            --primary-light: #e8f9ef;
            --text-dark: #222222;
            --text-medium: #444444;
            --text-light: #666666;
            --background: #f8f9fb;
            --white: #ffffff;
            --border-radius: 12px;
            --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            --transition: all 0.3s ease;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: var(--background);
            font-family: "Poppins", sans-serif;
            line-height: 1.6;
            color: var(--text-medium);
        }

        .servico-container {
            max-width: 800px;
            margin: 20px ;
            display: grid;
            grid-template-columns: 1fr 380px;
            gap: 30px;
        }

        .servico-content {
            background: var(--white);
            padding: 30px;
            max-width: 1400px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
        }

        .servico-sidebar {
            background: var(--white);
            padding: 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            height: fit-content;
            position: sticky;
            top: 20px;
        }

        .servico-header {
            position: relative;
            border-radius: var(--border-radius);
            overflow: hidden;
            margin-bottom: 25px;
        }

        .servico-header img {
            width: 100%;
            height: 550px;
            object-fit: fill;
            border-radius: var(--border-radius);
        }

        .servico-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: var(--primary);
            color: var(--white);
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            box-shadow: 0 2px 10px rgba(4, 191, 85, 0.3);
        }

        .servico-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 15px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
        }

        .servico-genero {
            display: inline-block;
            color: var(--primary);
            font-weight: 600;
            font-size: 1rem;
            background: var(--primary-light);
            padding: 6px 15px;
            border-radius: 20px;
            margin-bottom: 20px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
        }

        .servico-descricao {
            line-height: 1.7;
            color: var(--text-small);
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
        }

        .servico-stats {
            display: flex;
            gap: 30px;
            margin: 25px 0;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }

        .stat-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .stat-icon {
            width: 40px;
            height: 40px;
            background: var(--primary-light);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary);
        }

        .stat-info h4 {
            font-size: 0.9rem;
            color: var(--text-light);
            font-weight: 500;
        }

        .stat-info p {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-dark);
        }

        .servico-features {
            margin: 25px 0;
        }

        .features-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            color: var(--text-dark);
        }

        .features-list {
            list-style: none;
        }

        .features-list li {
            padding: 10px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .features-list li i {
            color: var(--primary);
        }

        /* Sidebar*/
        .pricing-box {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
            margin-bottom: 20px;
        }

        .servico-preco {
            font-size: 2.2rem;
            font-weight: bold;
            color: var(--primary);
            margin: 10px 0;
        }

        .servico-preco small {
            font-size: 1rem;
            color: var(--text-light);
            font-weight: normal;
        }

        .servico-delivery {
            color: var(--text-light);
            font-size: 0.95rem;
            margin-bottom: 20px;
        }

        .servico-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 14px 20px;
            font-weight: 600;
            font-size: 1.1rem;
            border-radius: 8px;
            text-decoration: none;
            transition: var(--transition);
            cursor: pointer;
            border: none;
            font-family: "Poppins", sans-serif;
        }

        .btn-primary {
            background: var(--primary);
            color: var(--white);
        }

        .btn-primary:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(4, 191, 85, 0.3);
        }

        .btn-secondary {
            background: transparent;
            color: var(--primary);
            border: 2px solid var(--primary);
        }

        .btn-secondary:hover {
            background: var(--primary-light);
        }

        .action-buttons {
            display: flex;
            gap: 10px;
        }

        .btn-icon {
            flex: 1;
            padding: 12px;
            background: #f5f5f5;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-weight: 500;
        }

        .btn-icon:hover {
            background: #eeeeee;
        }

        .guarantee-badge {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 8px;
            margin-top: 15px;
            font-size: 0.9rem;
        }

        .guarantee-badge i {
            color: var(--primary);
            font-size: 1.2rem;
        }

        /* Freelancer Box */
        .freelancer-box {
            margin-top: 35px;
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            border-radius: var(--border-radius);
            background: var(--primary-light);
            border: 1px solid rgba(4, 191, 85, 0.2);
        }

        .freelancer-avatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid var(--white);
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .freelancer-info {
            flex-grow: 1;
        }

        .freelancer-info .nome {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-dark);
        }

        .freelancer-info .funcao {
            color: var(--text-light);
            font-size: 0.95rem;
        }

        .freelancer-stats {
            display: flex;
            gap: 15px;
            margin-top: 5px;
        }

        .stat {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.85rem;
            color: var(--text-light);
        }

        .view-perfil {
            background: var(--primary);
            padding: 10px 18px;
            color: var(--white);
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition);
            white-space: nowrap;
        }

        .view-perfil:hover {
            background: var(--primary-dark);
        }

        /* Responsividade */
        @media (max-width: 992px) {
            .servico-container {
                grid-template-columns: 1fr;
            }
            
            .servico-sidebar {
                position: static;
            }
        }

        @media (max-width: 768px) {
            .servico-content, .servico-sidebar {
                padding: 20px;
            }
            
            .servico-title {
                font-size: 1.8rem;
            }
            
            .servico-header img {
                height: 300px;
            }
            
            .servico-stats {
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .action-buttons {
                flex-direction: column;
            }
        }

        @media (max-width: 480px) {
            body {
                padding: 10px;
            }
            
            .servico-content, .servico-sidebar {
                padding: 15px;
            }
            
            .servico-title {
                font-size: 1.5rem;
            }
            
            .servico-preco {
                font-size: 1.8rem;
            }
            
            .freelancer-box {
                flex-direction: column;
                text-align: center;
            }
            
            .freelancer-stats {
                justify-content: center;
            }
        }
    </style>
</head>
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

<body>

<div class="servico-container">
    <!-- Conteudo principal -->
    <div class="servico-content">
        <!-- imagem principal -->
        <div class="servico-header">
            <img src="<?php echo htmlspecialchars($servico['imagem_servico']); ?>" alt="Imagem do serviço">
            <div class="servico-badge">Popular</div>
        </div>

        <h1 class="servico-title">
            <?php echo htmlspecialchars($servico['nome']); ?>
        </h1>

        <div class="servico-genero">
            <?php echo htmlspecialchars($servico['nome_genero']); ?>
        </div>

        <p class="servico-descricao">
            <?php echo nl2br(htmlspecialchars($servico['descricao'])); ?>
        </p>

        <!-- Estatisticas do servico -->
        <div class="servico-stats">
            <div class="stat-item">
                <div class="stat-icon">
                    <i class="fas fa-star"></i>
                </div>
                <div class="stat-info">
                    <h4>Avaliação</h4>
                    <p>4.9 (128)</p>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-info">
                    <h4>Concluído</h4>
                    <p>98%</p>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="stat-info">
                    <h4>Entrega</h4>
                    <p>3 dias</p>
                </div>
            </div>
        </div>

        <!-- Caracteristicas do servico -->
        <div class="servico-features">
            <h3 class="features-title">O que você recebe:</h3>
            <ul class="features-list">
                <li><i class="fas fa-check"></i> Design profissional e moderno</li>
                <li><i class="fas fa-check"></i> Código limpo e bem comentado</li>
                <li><i class="fas fa-check"></i> Layout totalmente responsivo</li>
                <li><i class="fas fa-check"></i> Suporte por 30 dias</li>
                <li><i class="fas fa-check"></i> Revisões ilimitadas</li>
            </ul>
        </div>

        <!-- area do freelancer -->
        <div class="freelancer-box">
            <img src="<?php echo htmlspecialchars($servico['foto_perfil']); ?>" alt="Freelancer" class="freelancer-avatar">

            <div class="freelancer-info">
                <div class="nome"><?php echo htmlspecialchars($servico['nome_freelancer']); ?></div>
                <div class="funcao">Freelancer Nível 2</div>
                <div class="freelancer-stats">
                    <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>4.9</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-check-circle"></i>
                        <span>98% concluído</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-clock"></i>
                        <span>Entrega rápida</span>
                    </div>
                </div>
            </div>

            <a href="perfil_publico.php?id=<?php echo $servico['id_freelancer']; ?>" class="view-perfil">
                Ver Perfil
            </a>
        </div>
    </div>

    <!-- Sidebar de contratacao -->
    <div class="servico-sidebar">
        <div class="pricing-box">
            <h3>Contratar Serviço</h3>
            <div class="servico-preco">
                R$ <?php echo number_format($servico['preco'], 2, ',', '.'); ?>
                <small>/serviço</small>
            </div>
            <div class="servico-delivery">
                <i class="fas fa-clock"></i> Entrega em 3 dias
            </div>
        </div>

        <div class="servico-actions">
            <a href="#" class="btn btn-primary">
                <i class="fa-solid fa-cart-shopping"></i> Continuar (R$ <?php echo number_format($servico['preco'], 2, ',', '.'); ?>)
            </a>
            
            <div class="action-buttons">
                <button class="btn-icon">
                    <i class="far fa-heart"></i> Favoritar
                </button>
                <button class="btn-icon">
                    <i class="far fa-envelope"></i> Contatar
                </button>
            </div>
        </div>

        <div class="guarantee-badge">
            <i class="fas fa-shield-alt"></i>
            <div>
                <strong>Garantia de satisfação</strong>
                <div style="font-size: 0.8rem;">Ou seu dinheiro de volta</div>
            </div>
        </div>
    </div>
</div>
<script src="js/scriptindex.js"></script>

</body>
</html>
