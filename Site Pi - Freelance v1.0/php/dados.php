<?php
$hostname = "localhost";
$bancodedados = "sistema_login";
$usuario = "root";
$senha = "";


try{
    //Criar conexão
    $conn = new mysqli($hostname, $usuario, $senha, $bancodedados);

    if ($conn->connect_error) {
        throw new Exception("Conexão falhou: " . $conn->connect_error);
    }

    //Pegar dados para login (GET)
    if ($_SERVER["REQUEST_METHOD"] !== "GET") { 
        throw new Exception("Método de requisição inválido");
    }

} catch (Exception $e) {
    // Registrar erro em log (em produção)
    error_log($e->getMessage());
    
    // Mostrar mensagem amigável (ou redirecionar para página de erro)
    die("Sem Login");
} finally {
    // Fechar conexões se existirem (Mesmo se der erro)
    if (isset($verifica)) $verifica->close();
    if (isset($stmt)) $stmt->close();
    if (isset($conn)) $conn->close();
}

