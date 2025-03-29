<?php
// Configurações do banco de dados.     
$hostname = "localhost";
$bancodedados = "site1";
$usuario = "root";
$senha = "";

// cada ($) é respectiva para uma variavel (NÃO ALTERAR)

try {
    //Criar conexão
    $conn = new mysqli($hostname, $usuario, $senha, $bancodedados);
    
    if ($conn->connect_error) {
        throw new Exception("Conexão falhou: " . $conn->connect_error);
    }

    //Verificar método de requisição
    if ($_SERVER["REQUEST_METHOD"] !== "POST") { //Valida os dados antes do processo "Se [request_method] for diferente da erro"
        throw new Exception("Método de requisição inválido");
    }

   // Validar campos obrigatórios
    $camposObrigatorios = ['nome', 'email', 'senha', 'tipo_conta']; //Valida se os campos estão preenchidos "Se campo estiver vazio, Mostra mensagem (Campo é obrigatorio)"
    foreach ($camposObrigatorios as $campo) {
        if (empty($_POST[$campo])) {
            throw new Exception("O campo $campo é obrigatório"); 
        }
    }

    //Processar dados  // SEGURANÇA "real_escape_string"
    $nome = $conn->real_escape_string($_POST['nome']);
    $email = $conn->real_escape_string($_POST['email']);
    

    //Mensagem para mim mesmo revisar desta area para baixo (daqui para baixo fiz com AJUDA, do deepseek)


    // Verificar se e-mail já existe
    $verifica = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");  //Verificar email dentro do banco de dados 
    $verifica->bind_param("s", $email);
    $verifica->execute();
    if ($verifica->get_result()->num_rows > 0) {
        throw new Exception("Este e-mail já está cadastrado"); //Mensagem se email ja existente
    }

    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT); //Hash da senha
    $tipo_conta = $conn->real_escape_string($_POST['tipo_conta']);
    $area_atuacao = isset($_POST['area_atuacao']) ? $conn->real_escape_string($_POST['area_atuacao']) : NULL;
    $telefone = $conn->real_escape_string($_POST['telefone']);
    $newsletter = isset($_POST['newsletter']) ? 1 : 0;

    // Inserir no banco
    $stmt = $conn->prepare("INSERT INTO usuarios (...) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("ssssssi", $nome, $email, $senha, $tipo_conta, $area_atuacao, $telefone, $newsletter); //Dados inseridos no cadastro, são capturados em mandados para o banco de dados

    if (!$stmt->execute()) {
        throw new Exception("Erro ao cadastrar: " . $stmt->error);
    }

    header("Location: cadastro_sucesso.html");
    exit();

} catch (Exception $e) {
    // Registrar erro em log (em produção)
    error_log($e->getMessage());
    
    // Mostrar mensagem amigável (ou redirecionar para página de erro)
    die("Ocorreu um erro durante o cadastro. Por favor, tente novamente.");
} finally {
    // Fechar conexões se existirem (Mesmo se der erro)
    if (isset($verifica)) $verifica->close();
    if (isset($stmt)) $stmt->close();
    if (isset($conn)) $conn->close();
}

/* FEATURES ADICIONADOS ATÉ O MOMENTO

        Prevenção contra Sql Injection
        Armazenamento seguro das senhas
        Tratamento dos erros adequados
        Validação da entrada
