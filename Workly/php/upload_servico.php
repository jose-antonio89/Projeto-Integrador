<?php
//FUNCAO PARA BOTOES MODERNOS
function swal($icon, $title, $text, $redirect = null) {
    echo "<html><head>
        <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
        </head><body>
        <script>
        Swal.fire({
            icon: '$icon',
            title: '$title',
            text: '$text',
            confirmButtonColor: '#04BF55' 
        }).then(() => {";

    if ($redirect) {
        echo "window.location.href='$redirect';";
    } else {
        echo "history.back();";
    }

    echo "});
        </script>
        </body></html>";
    exit;
}
//-------------------------------------------

session_start();
require_once 'conexao.php';


if (!isset($_SESSION['id_usuario'])) {
    header("Location: login.php");
    exit;
}

//Pegar id do usuario
$id_usuario = $_SESSION['id_usuario'];

//Buscar pelo id_freelancer do usuario
$stmt = $conn->prepare("SELECT freelancer_id FROM usuarios WHERE id_usuario = ?");
$stmt->bind_param("i", $id_usuario); 
$stmt->execute();

$result = $stmt->get_result();
$dados = $result->fetch_assoc();

if (!$dados || !$dados['freelancer_id']) {
    swal('error', 'Acesso negado', 'Este usuário não é um freelancer.', '../perfil.php');
}

$id_freelancer = $dados['freelancer_id'];

//Recebe dados do formulario do anuncio
$nome = $_POST['nome'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$preco = $_POST['preco'] ?? 0;
$genero_id = $_POST['genero_id'] ?? 0;
$extra = $_POST['extra'] ?? '';

//verificacao basica
if (empty($nome) || empty($descricao) || empty($preco) || empty($genero_id)) {
    swal('warning', 'Campos incompletos', 'Preencha todos os campos obrigatórios.');
}

//UPLOAD DA IMAGEM DO SERVICO -------------
if (!isset($_FILES['imagem_servico']) || $_FILES['imagem_servico']['error'] !== UPLOAD_ERR_OK) {
    swal('error', 'Imagem obrigatória', 'Envie uma imagem para cadastrar o serviço.');
}

$pastaDestino = __DIR__ . '/../img/servicos/';
if (!is_dir($pastaDestino)) {
    mkdir($pastaDestino, 0777, true);
}

$arquivoTmp = $_FILES['imagem_servico'] 
['tmp_name'];
$nomeOriginal = basename($_FILES['imagem_servico']
['name']);
$extensao = strtolower(pathinfo($nomeOriginal,PATHINFO_EXTENSION));

//TIPO DE IMAGEM PERMITIDA
$extensoesPermitidas = ['jpg', 'jpeg', 'png', 'gif'];

if (!in_array($extensao, $extensoesPermitidas)) {
    swal('error', 'Formato inválido', 'A imagem deve ser JPG, JPEG, PNG ou GIF.');
}

//----------------------
$imgInfo = getimagesize($arquivoTmp);
if ($imgInfo === false) {
    swal('error', 'Imagem inválida', 'O arquivo enviado não é uma imagem válida.');
}

$novoNome = 'servico_' . $id_freelancer . "_" . uniqid() . "." . $extensao;
$caminhoFisico = $pastaDestino . $novoNome;

if (!move_uploaded_file($arquivoTmp, $caminhoFisico)) {
    swal('error', 'Erro ao salvar', 'Não foi possível salvar a imagem do serviço.');
}

chmod($caminhoFisico, 0644);

$imagem_servico = "img/servicos/" . $novoNome;
//FIM DO UPLOAD DE IMAGEM NA PASTA /img/servicos

//Inserir o servico na tabela
$stmt = $conn->prepare("INSERT INTO servicos (nome, descricao, preco, extra, imagem_servico, genero_id) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssdssi", 
    $nome, 
    $descricao, 
    $preco, 
    $extra, 
    $imagem_servico, 
    $genero_id
);

$stmt->execute();

$id_servico = $stmt->insert_id; //pega o id gerado
$stmt->close();


//liga o servico ao freelancer
$stmt2 = $conn->prepare("INSERT INTO servicos_freelancer (servico_id, freelancer_id) VALUES (?, ?)");
$stmt2->bind_param("ii", $id_servico, $id_freelancer);
$stmt2->execute();
$stmt2->close();


//redirect com mensagem
swal('success', 'Serviço enviado!', 'Seu serviço foi publicado com sucesso.', '../perfil.php');

?>