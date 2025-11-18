<?php
session_start();
require_once 'conexao.php';

$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
$cpf = $_POST['cpf'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$tipo_conta = $_POST['tipo_conta'] ?? '';
$area_atuacao_id = $_POST['area_atuacao'] ?? null;


if (empty($nome) || empty($email) || empty($senha) || empty($cpf) || empty($tipo_conta)) {
    die("Erro: todos os campos obrigatórios devem ser preenchidos.");
}

$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

$conn->begin_transaction();

try {
    $freelancer_id = null;
    $contratante_id = null;

    if ($tipo_conta === 'Freelancer') {
        if (empty($area_atuacao_id)) {
            throw new Exception("Área de atuação é obrigatória para freelancers.");
        }

        $stmt = $conn->prepare("INSERT INTO freelancer (nome, area_atuacao_id) VALUES (?, ?)");
        $stmt->bind_param("si", $nome, $area_atuacao_id);
        $stmt->execute();
        $freelancer_id = $conn->insert_id;
        $stmt->close();
    }

    if ($tipo_conta === 'Contratante') {
        $stmt = $conn->prepare("INSERT INTO contratante (nome) VALUES (?)");
        $stmt->bind_param("s", $nome);
        $stmt->execute();
        $contratante_id = $conn->insert_id;
        $stmt->close();
    }

    $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha, cpf, telefone, freelancer_id, contratante_id)
                            VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssi", $nome, $email, $senha_hash, $cpf, $telefone, $freelancer_id, $contratante_id);
    $stmt->execute();
    $stmt->close();

    $conn->commit();

    echo "Cadastro realizado com sucesso!";
} catch (Exception $e) {
    $conn->rollback();
    echo "<pre>";
    echo "Erro ao cadastrar: " . $e->getMessage() . "\n";
    echo "Erro MySQL: " . $conn->error . "\n";
    echo "</pre>";
}

$_SESSION['id_usuario'] = $usuario['id_usuario'];
$_SESSION['nome'] = $usuario['nome'];
$_SESSION['tipo'] = $usuario['freelancer_id'] ? 'Freelancer' : 'Contratante';

header("Location: ../login.php");
exit();

$conn->close();
?>
