<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("erro:metodo_invalido");
}

$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

if (empty($email) || empty($senha)) {
    echo "erro:campos_vazios";
    exit;
}

$stmt = $conn->prepare("
    SELECT id_usuario, nome, email, senha, foto_perfil, freelancer_id, contratante_id 
    FROM usuarios 
    WHERE email = ?
");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "erro:usuario_nao_encontrado";
    exit;
}

$usuario = $result->fetch_assoc();

if (!password_verify($senha, $usuario['senha'])) {
    echo "erro:senha_incorreta";
    exit;
}

$_SESSION['id_usuario'] = $usuario['id_usuario'];
$_SESSION['nome'] = $usuario['nome'];
$_SESSION['foto_perfil'] = $usuario['foto_perfil']; 
$_SESSION['tipo'] = $usuario['freelancer_id'] ? 'Freelancer' : 'Contratante';

echo "sucesso:Login bem-sucedido";
exit;


header("Location: ../index.php");
exit();

$stmt->close();
$conn->close();
?>