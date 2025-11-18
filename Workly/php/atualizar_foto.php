<?php
session_start();
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

require_once 'conexao.php';

if (!isset($_SESSION['id_usuario'])) {
    header("Location: login.php");
    exit;
}

// Verifica se um arquivo foi enviado corretamente
if (!isset($_FILES['nova_foto']) || $_FILES['nova_foto']['error'] !== UPLOAD_ERR_OK) {
    swal('erro', 'ERRO', 'A imagem não foi publicada corretamente', '../perfil.php');
}

$id = $_SESSION['id_usuario'];

//Caminhos e configurações
$pastaDestino = __DIR__ . '/../img/perfis/';  
if (!is_dir($pastaDestino)) {           
    mkdir($pastaDestino, 0777, true);
}

$arquivoTmp = $_FILES['nova_foto']['tmp_name'];
$nomeOriginal = basename($_FILES['nova_foto']['name']);
$extensao = strtolower(pathinfo($nomeOriginal, PATHINFO_EXTENSION));

//validação de extensão
$extensoesPermitidas = ['jpg', 'jpeg', 'png', 'gif'];
if (!in_array($extensao, $extensoesPermitidas)) {
    swal('erro', 'Imagem invalida!', 'Coloque uma imagem valida!', '../perfil.php');
}

// Tamanho maximo (2 MB) (se for alterar pra zuar, lembra que vai subir imagem no seu proprio pc)
if ($_FILES['nova_foto']['size'] > 2 * 1024 * 1024) {
    swal('erro', 'Imagem muito grande!', 'Coloque uma imagem com menos de 2MB!', '../perfil.php');
}

// Verifica se realmente e uma imagem
$tipoMime = mime_content_type($arquivoTmp);
if (strpos($tipoMime, 'image/') !== 0) {
    swal('erro', 'Imagem invalida!', 'Coloque uma imagem valida!', '../perfil.php');
}

//Gera nome unico para o arquivo
$novoNome = "perfil_" . $id . "_" . uniqid() . "." . $extensao;

//Caminhos finais
$caminhoFinal = $pastaDestino . $novoNome;             //Caminho fisico (servidor)
$caminhoBanco = 'img/perfis/' . $novoNome;             // Caminho relativo (navegador)

// Move o arquivo para a pasta de destino
if (move_uploaded_file($arquivoTmp, $caminhoFinal)) {
    chmod($caminhoFinal, 0644); 

    // Atualiza o banco de dados com o caminho relativo
    $stmt = $conn->prepare("UPDATE usuarios SET foto_perfil = ? WHERE id_usuario = ?");
    $stmt->bind_param("si", $caminhoBanco, $id);
    $stmt->execute();

    // Atualiza sessao com o caminho relativo 
    $_SESSION['foto_perfil'] = $caminhoBanco;

    swal('success', 'Imagem enviada!', 'Sua foto de perfil foi atualizada com sucesso.', '../perfil.php');
} else {
    echo "Erro ao salvar o arquivo.";
}
?>
