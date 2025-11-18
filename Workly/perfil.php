<?php session_start();
require_once 'php/conexao.php';


//define $foto como variavel da foto de perfil
$foto = $_SESSION['foto_perfil'] ?? '';

if (!file_exists($foto) || empty($foto)) {
    $foto = "img/perfis/perfil_padrao.png";
}

$id_usuario = $_SESSION['id_usuario'];

// pega o id_freelancer do usuario
$stmt = $conn->prepare("SELECT freelancer_id FROM usuarios WHERE id_usuario = ?");
$stmt->bind_param("i", $id_usuario);
$stmt->execute();

$result = $stmt->get_result();
$dados = $result->fetch_assoc();

$id_freelancer = $dados['freelancer_id'];
$stmt->close();

//busca os serviços do freelancer
$query = "
    SELECT 
        s.id_servico,
        s.nome,
        s.descricao,
        s.preco,
        s.extra,
        s.imagem_servico,
        g.nome_genero
    FROM servicos s
    INNER JOIN servicos_freelancer sf ON sf.servico_id = s.id_servico
    INNER JOIN generos g ON g.id_genero = s.genero_id
    WHERE sf.freelancer_id = ?
";

$stmt2 = $conn->prepare($query);
$stmt2->bind_param("i", $id_freelancer);
$stmt2->execute();
$servicos = $stmt2->get_result();

?>

<!------------------------------------------------------------------------------------------------------------->
<style>
/* CONTEINER */
.servicos-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 45px;
    padding: 15px;
    width: 100%;
    max-width: 1800px;
    margin: 0 auto;
}

/* CARD */
.servico-card {
    background: #ffffffe1;
    border-radius: 16px;
    padding: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.62);
    transition: .2s ease;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    width: 350px;
    min-width: 350px;
    display: block;
}

@media (max-width: 1600px) {
  .servico-card {
    width: 290px;
    min-width: 290px;
  }
}

.servico-card:hover {
    transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  border-color: var(--primary-color);
}

/* IMAGEM */
.servico-card img {
    width: 100%;
    height: 170px;
    object-fit: fill;
    border-radius: 10px;
    margin-bottom: 12px;
}

/* TITULO */
.servico-card h3 {
    font-size: 18px;
    margin: 5px 0;
    color: #222;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
}

/* DESCRICAO */
.servico-card .descricao {
    font-size: 14px;
    color: #555;
    margin-bottom: 12px;
    line-height: 1.4;
    max-height: 70px;
    overflow: hidden;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
}

/* GENERO */
.servico-card .genero {
    display: inline-block;
    background: #e9fff1;
    padding: 6px 12px;
    font-size: 13px;
    color: #04BF55;
    border-radius: 20px;
    margin-bottom: 12px;
}

/* PREÇO */
.servico-card .preco {
    font-size: 20px;
    font-weight: bold;
    color: #04BF55;
    margin-bottom: 12px;
}

.card-link {
    position: absolute;
    inset: 0;
    z-index: 1;
}

/* BOTAO */
.btn-editar {
    padding: 8px 12px;
    border-radius: 8px;
    background: #04BF55;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: .2s;
    z-index: 2;
    position: relative;
}

.btn-editar:hover {
    background: #039645;
}

</style>
<!--------------------------------------------------------------------------------------->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workly - Perfil do Freelancer</title>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-icons/4.0.0/iconfont/material-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.css">
    <link rel="stylesheet" href="css/perfil.css">
    <link rel="stylesheet" href="css/dark-mode.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <header>
        <div class="separação"></div>
        <div class="principal">
            <nav> 
                <a href="index.php" class="logo" id="home-logo">
                    <section>
                        <img class="imagem-logo" src="img/logo.png" alt="">
                    </section>   
                    </a>
                <div class="search-container">
                    <input type="text" class="search-box" placeholder="O que você está buscando?">
                </div>
                <ul class="cabecalho">
                    <li><a href="index.php" class="menu-item">HomePage</a></li>
                    <li><a href="SobreNos.php" class="menu-item">Sobre Nós</a></li>
                </ul>
                <!-- PERFIL-->
                <div class="profile-menu">
                  <div class="profile-ball" id="profileBall">
                  <img src="<?php echo $foto; ?>" class="img-profile">
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
    </header>

    <div class="profile-container">
        <div class="profile-header">
        <img src="<?php echo $foto; ?>" 
            class="profile-avatar" 
            alt="Foto de perfil">
            <div class="profile-info">
                <h1 class="profile-name"><?php $nomeCompleto = $_SESSION['nome']; 
                    echo htmlspecialchars($nomeCompleto);?></h1>
                <p class="profile-title">Desenvolvedor(a) Web</p>
                <p>Level 3 · Workly desde Fevereiro 2025</p>
                <div class="profile-stats">
                    <div class="stat-item">
                        <div class="stat-value">42</div>
                        <div class="stat-label">Projetos</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">4.9</div>
                        <div class="stat-label">Avaliação</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">95%</div>
                        <div class="stat-label">Conclusão</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="profile-tabs">
            <div class="profile-tab active" data-tab="dashboard">Dashboard</div>
            <div class="profile-tab">Serviços</div>
            <div class="profile-tab">Avaliações</div>
            <div class="profile-tab">Configurações</div>
        </div>
    <!-----------------------------------------------DASHBOARD------------------------------------------------------->
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Visão Geral</h3>
                <div class="stats-row">
                    <div class="stat-box">
                        <div class="stat-number">R$ 12.450</div>
                        <div class="stat-text">Total Ganho</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">18</div>
                        <div class="stat-text">Projetos Ativos</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">1.248</div>
                        <div class="stat-text">Visualizações</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">32</div>
                        <div class="stat-text">Leads Novos</div>
                    </div>
                </div>
            </div>

            <div class="dashboard-card">
                <h3>Desempenho Mensal</h3>
                <div class="chart-container">
                    <canvas id="salesChart"></canvas>
                </div>
            </div>

            <div class="dashboard-card">
                <h3>Leads Recentes</h3>
                <div class="leads-list">
                    <div class="lead-item">
                        <img src="https://images.unsplash.com/photo-1743623930275-abbb3ad3be0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5N3x8fGVufDB8fHx8fA%3D%3D" alt="Lead" class="lead-avatar">
                        <div class="lead-info">
                            <div class="lead-name">Ana Souza</div>
                            <div class="lead-email">ana.souza@email.com</div>
                        </div>
                        <span class="lead-status status-new">Novo</span>
                    </div>
                    <div class="lead-item">
                        <img src="https://images.unsplash.com/photo-1745236781096-be405b87d05c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzF8fHxlbnwwfHx8fHw%3D" alt="Lead" class="lead-avatar">
                        <div class="lead-info">
                            <div class="lead-name">Pedro Gomes</div>
                            <div class="lead-email">pedro.gomes@email.com</div>
                        </div>
                        <span class="lead-status status-contacted">Contatado</span>
                    </div>
                    <div class="lead-item">
                        <img src="https://images.unsplash.com/photo-1743484977289-22999cb8c001?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNTN8fHxlbnwwfHx8fHw%3D" alt="Lead" class="lead-avatar">
                        <div class="lead-info">
                            <div class="lead-name">Ricardo Santos</div>
                            <div class="lead-email">ricardo.santos@email.com</div>
                        </div>
                        <span class="lead-status status-converted">Convertido</span>
                    </div>
                    <div class="lead-item">
                        <img src="https://images.unsplash.com/photo-1745834311180-688615cf5308?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMTJ8fHxlbnwwfHx8fHw%3D" alt="Lead" class="lead-avatar">
                        <div class="lead-info">
                            <div class="lead-name">Márcia Oliveira</div>
                            <div class="lead-email">marcia.oliveira@email.com</div>
                        </div>
                        <span class="lead-status status-new">Novo</span>
                    </div>
                </div>
            </div>

            <div class="dashboard-card">
                <h3>Distribuição de Receita</h3>
                <div class="chart-container">
                    <canvas id="revenueChart"></canvas>
                </div>
            </div>

            <div class="dashboard-card">
                <h3>Atividades Recentes</h3>
                <div class="recent-activity">
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">Pagamento recebido de Projeto Logo</div>
                            <div class="activity-time">Hoje, 14:30</div>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">Novo lead de cliente interessado</div>
                            <div class="activity-time">Ontem, 09:45</div>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">Nova avaliação 5 estrelas recebida</div>
                            <div class="activity-time">03/05/2025</div>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="activity-content">
                            <div class="activity-title">Projeto Website concluído com sucesso</div>
                            <div class="activity-time">01/05/2025</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dashboard-card">
                <h3>Visualizações do Perfil</h3>
                <div class="chart-container">
                    <canvas id="viewsChart"></canvas>
                </div>
            </div>
        </div>
    </div>
          
    <!--------------------------------------Serviços--------------------------------------------->
<div class="tab-content" id="services-tab" style="display: none;">
  <div class="services-header">
      <h2>Meus Serviços</h2>
      <button class="add-service-btn"><i class="fas fa-plus"></i> Adicionar Serviço</button>
  </div>
  
  <div class="servicos-container">

<?php while($s = $servicos->fetch_assoc()): ?>

    
    <div class="servico-card">

    <!-- Link invisivel cobrindo todo o card -->
    <a href="service.php?id=<?php echo $s['id_servico']; ?>" class="card-link"></a>

    <img src="<?php echo $s['imagem_servico']; ?>" alt="Imagem do serviço">

    <h3><?php echo htmlspecialchars($s['nome']); ?></h3>

    <p class="descricao"><?php echo htmlspecialchars($s['descricao']); ?></p>

    <div class="genero"><?php echo htmlspecialchars($s['nome_genero']); ?></div>

    <div class="preco">R$ <?php echo number_format($s['preco'], 2, ',', '.'); ?></div>

    <!-- Botão editar sobreposto -->
    <a href="editar_servico.php?id=<?php echo $s['id_servico']; ?>" 
       class="btn-editar no-click">
        <i class="fa-solid fa-pen"></i> Editar
    </a>

</div>
<?php endwhile; ?>
</div>
</div>
<!--------------------------------------------------------------------------------------->


<!----------------------------------------------------------Avaliações-------------------------------------------->

<div class="tab-content" id="reviews-tab" style="display: none;">
  <div class="reviews-header">
      <h2>Avaliações dos Clientes</h2>
      <div class="review-summary">
          <div class="overall-rating">
              <div class="rating-number">4.9</div>
              <div class="rating-stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
              </div>
              <div class="rating-count">Baseado em 42 avaliações</div>
          </div>
          <div class="rating-breakdown">
              <div class="rating-bar">
                  <span class="rating-label">5 estrelas</span>
                  <div class="progress-bar">
                      <div class="progress" style="width: 85%;"></div>
                  </div>
                  <span class="rating-percentage">85%</span>
              </div>
              <div class="rating-bar">
                  <span class="rating-label">4 estrelas</span>
                  <div class="progress-bar">
                      <div class="progress" style="width: 10%;"></div>
                  </div>
                  <span class="rating-percentage">10%</span>
              </div>
              <div class="rating-bar">
                  <span class="rating-label">3 estrelas</span>
                  <div class="progress-bar">
                      <div class="progress" style="width: 5%;"></div>
                  </div>
                  <span class="rating-percentage">5%</span>
              </div>
              <div class="rating-bar">
                  <span class="rating-label">2 estrelas</span>
                  <div class="progress-bar">
                      <div class="progress" style="width: 0%;"></div>
                  </div>
                  <span class="rating-percentage">0%</span>
              </div>
              <div class="rating-bar">
                  <span class="rating-label">1 estrela</span>
                  <div class="progress-bar">
                      <div class="progress" style="width: 0%;"></div>
                  </div>
                  <span class="rating-percentage">0%</span>
              </div>
          </div>
      </div>
  </div>
  
  <div class="reviews-list">
      <div class="review-item">
          <div class="review-header">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" alt="Cliente" class="reviewer-avatar">
              <div class="reviewer-info">
                  <div class="reviewer-name">Marcos Silva</div>
                  <div class="review-date">03 Mai 2025</div>
              </div>
              <div class="review-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
              </div>
          </div>
          <div class="review-content">
              <p>Simplesmente incrível! O Cauã entendeu perfeitamente o que eu precisava e entregou um site que superou minhas expectativas. Comunicação clara, entrega no prazo e um trabalho excepcional. Recomendo fortemente!</p>
          </div>
          <div class="review-project">
              <span class="project-label">Projeto:</span><p class="project-sumarry"> Desenvolvimento de Website para Restaurante </p>
          </div>
          <div class="review-actions">
              <button class="reply-btn"><i class="fas fa-reply"></i> Responder</button>
          </div>
      </div>
      
      <div class="review-item">
          <div class="review-header">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" alt="Cliente" class="reviewer-avatar">
              <div class="reviewer-info">
                  <div class="reviewer-name">Carolina Mendes</div>
                  <div class="review-date">29 Abr 2025</div>
              </div>
              <div class="review-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
              </div>
          </div>
          <div class="review-content">
              <p>Contratei o Cauã para otimizar o SEO do meu blog e os resultados foram impressionantes. Em menos de um mês, já estou vendo o aumento no tráfego e nas conversões. Profissional extremamente qualificado e atencioso.</p>
          </div>
          <div class="review-project">
              <span class="project-label">Projeto:</span><p class="project-sumarry"> Otimização de SEO para Blog de Moda </p>
          </div>
          <div class="review-actions">
              <button class="reply-btn"><i class="fas fa-reply"></i> Responder</button>
          </div>
      </div>
      
      <div class="review-item">
          <div class="review-header">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" alt="Cliente" class="reviewer-avatar">
              <div class="reviewer-info">
                  <div class="reviewer-name">Ricardo Gomes</div>
                  <div class="review-date">15 Abr 2025</div>
              </div>
              <div class="review-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
              </div>
          </div>
          <div class="review-content">
              <p>Excelente trabalho no desenvolvimento do aplicativo da minha empresa. O Cauã foi extremamente profissional do início ao fim, entregando um produto de alta qualidade dentro do prazo combinado. Já estamos planejando os próximos projetos juntos!</p>
          </div>
          <div class="review-project">
              <span class="project-label">Projeto:</span> <p class="project-sumarry"> Aplicativo de Delivery para Restaurante </p>
          </div>
          <div class="review-actions">
              <button class="reply-btn"><i class="fas fa-reply"></i> Responder</button>
          </div>
      </div>
      
      <div class="review-item">
          <div class="review-header">
              <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" alt="Cliente" class="reviewer-avatar">
              <div class="reviewer-info">
                  <div class="reviewer-name">Ana Paula Oliveira</div>
                  <div class="review-date">02 Abr 2025</div>
              </div>
              <div class="review-rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
              </div>
          </div>
          <div class="review-content">
              <p>Muito satisfeita com o website que o Cauã desenvolveu para minha loja online. O design ficou exatamente como eu imaginava e a funcionalidade é ótima. Apenas tivemos um pequeno atraso na entrega, mas nada que comprometesse o projeto.</p>
          </div>
          <div class="review-project">
              <span class="project-label">Projeto:</span><p class="project-sumarry"> E-commerce para Loja de Roupas </p>
          </div>
          <div class="review-actions">
              <button class="reply-btn"><i class="fas fa-reply"></i> Responder</button>
          </div>
      </div>
  </div>
  
  <div class="pagination">
      <a href="#" class="page-link active">1</a>
      <a href="#" class="page-link">2</a>
      <a href="#" class="page-link">3</a>
      <span class="page-dots">...</span>
      <a href="#" class="page-link">6</a>
      <a href="#" class="page-link next"><i class="fas fa-chevron-right"></i></a>
  </div>
</div>

<!-----------------------------------------------------Configuracoes---------------------------------------------------------->
<div class="tab-content" id="settings-tab" style="display: none;">
  <div class="settings-container">
      <div class="settings-sidebar">
          <div class="settings-nav">
              <a href="#" class="settings-nav-item active" data-target="profile-settings">
                  <i class="fas fa-user"></i> Perfil
              </a>
              <a href="#" class="settings-nav-item" data-target="portfolio-settings">
                  <i class="fas fa-briefcase"></i> Portfólio
              </a>
              <a href="#" class="settings-nav-item" data-target="account-settings">
                  <i class="fas fa-cog"></i> Conta
              </a>
              <a href="#" class="settings-nav-item" data-target="billing-settings">
                  <i class="fas fa-credit-card"></i> Pagamentos
              </a>
              <a href="#" class="settings-nav-item" data-target="notification-settings">
                  <i class="fas fa-bell"></i> Notificações
              </a>
              <a href="#" class="settings-nav-item" data-target="security-settings">
                  <i class="fas fa-shield-alt"></i> Segurança
              </a>
          </div>
      </div>
      
      <div class="settings-content">
          <div class="settings-section active" id="profile-settings">
              <h2>Configurações de Perfil</h2>
              <!-- ATUALIZAR FOTO DO PERFIL -->
              <form action="php/atualizar_foto.php" method="POST" enctype="multipart/form-data" class="settings-form">
                  <div class="form-group">
                      <label for="profile-photo">Foto de Perfil</label>
                      <div class="photo-upload">
                          <img src="<?php echo $foto; ?>" 
                      alt="Foto de perfil atual" 
                      class="current-photo" 
                      width="120">
                          <div class="upload-actions">
                            <label for="nova_foto" class="upload-btn" style="margin-bottom: 0px;"></label>
                            <input type="file" name="nova_foto" id="nova_foto" accept="image/*" required>
                            <button type="button" class="remove-btn">
                            <i class="fas fa-trash"></i> Remover
                            </button>
                            <button type="submit">Atualizar Foto</button>
                            </div>
                      </div>
                  </div>
                        
                    <!------------------------------------->
                    
                  <div class="form-row">
                      <div class="form-group">
                          <label for="first-name">Nome</label>
                          <input type="text" id="first-name" value="Cauã" class="form-control">
                      </div>
                      <div class="form-group">
                          <label for="last-name">Sobrenome</label>
                          <input type="text" id="last-name" value="Moraes" class="form-control">
                      </div>
                  </div>
                  
                  <div class="form-group">
                      <label for="professional-title">Título Profissional</label>
                      <input type="text" id="professional-title" value="Desenvolvedor(a) Web" class="form-control">
                  </div>
                  
                  <div class="form-group">
                      <label for="bio">Biografia</label>
                      <textarea id="bio" class="form-control" rows="4">"Desenvolvedor web fullstack com mais de 5 anos de experiência em projetos de alto impacto. Especializada em JavaScript, React, Node.js e otimização de SEO. Focada em entregar soluções elegantes e eficientes para negócios de todos os tamanhos."</textarea>
                  </div>
                  
                  <div class="form-row">
                      <div class="form-group">
                          <label for="email">Email</label>
                          <input type="email" id="email" value="cauamoraes941@gmail.com" class="form-control">
                      </div>
                      <div class="form-group">
                          <label for="phone">Telefone</label>
                          <input type="tel" id="phone" value="(14) 997152-2616" class="form-control">
                      </div>
                  </div>
                  
                  <div class="form-group">
                      <label for="location">Localização</label>
                      <input type="text" id="location" value="Jahu, SP - Brasil" class="form-control">
                  </div>
                  
                  <div class="form-group">
                      <label for="website">Website</label>
                      <input type="url" id="website" value="" class="form-control">
                  </div>
                  
                  <div class="form-group">
                      <label>Redes Sociais</label>
                      <div class="social-inputs">
                          <div class="social-input">
                              <i class="fab fa-linkedin"></i>
                              <input type="text" value="linkedin.com/in/cauã-moraes" class="form-control">
                          </div>
                          <div class="social-input">
                              <i class="fab fa-github"></i>
                              <input type="text" value="github.com/CauaMora" class="form-control">
                          </div>
                          <div class="social-input">
                              <i class="fab fa-instagram"></i>
                              <input type="text" value="instagram.com/cauamoraes_94" class="form-control">
                          </div>
                      </div>
                  </div>
                  
                  <div class="form-actions">
                      <button type="submit" class="btn-save">Salvar Alterações</button>
                      <button type="button" class="btn-cancel">Cancelar</button>
                  </div>
              </form>
          </div>
          
          <div class="settings-section" id="portfolio-settings">
              <h2>Configurações de Portfólio</h2>
              <!-- Conteudo para configurações de portfolio aqui -->
              <p>Gerencie os projetos exibidos em seu portfólio.</p>
          </div>
          
          <div class="settings-section" id="account-settings">
              <h2>Configurações de Conta</h2>
              <!-- Conteudo para configurações de conta aqui -->
              <p>Gerencie suas preferências de conta e plano de assinatura.</p>
          </div>
          
          <div class="settings-section" id="billing-settings">
              <h2>Configurações de Pagamento</h2>
              <!-- Conteúdo para configuraçoes de pagamento aqui -->
              <p>Gerencie seus métodos de pagamento e histórico financeiro.</p>
          </div>
          
          <div class="settings-section" id="notification-settings">
              <h2>Configurações de Notificações</h2>
              <!-- Conteudo para configurações de notificaçoes aqui -->
              <p>Gerencie como e quando deseja receber notificações.</p>
          </div>
          
          <div class="settings-section" id="security-settings">
              <h2>Configurações de Segurança</h2>
              <!-- Conteudo para configurações de segurança aqui -->
              <p>Gerencie sua senha e preferências de segurança da conta.</p>
           </div>
       </div>
    </div>
  </div>                 
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

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
    <script src="js/perfil.js"></script>
</body>
</html>