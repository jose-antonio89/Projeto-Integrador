<?php
// Config DB
$db_host = 'localhost'; // Host
$db_name = 'sistema_login'; // Nome
$db_user = 'root'; // Usuario
$db_pass = ''; // Senha

// Enviar arquivo
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // Connect to database
        $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //  form data
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $senha = password_hash($_POST['senha'] ?? '', PASSWORD_DEFAULT); // Hash senha
        $tipo_conta = $_POST['tipo_conta'] ?? '';
        $area_atuacao = $_POST['area_atuacao'] ?? '';
        $telefone = $_POST['telefone'] ?? '';
        $newsletter = isset($_POST['newsletter']) ? 1 : 0;
        $data_cadastro = date('Y-m-d H:i:s'); 

        // SQL 
        $stmt = $pdo->prepare("INSERT INTO usuarios 
                              (name, email, senha, tipo_conta, area_atuacao, telefone, newsletter, data_cadastro) 
                              VALUES 
                              (:name, :email, :senha, :tipo_conta, :area_atuacao, :telefone, :newsletter, :data_cadastro)");

        // Parametros
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senha);
        $stmt->bindParam(':tipo_conta', $tipo_conta);
        $stmt->bindParam(':area_atuacao', $area_atuacao);
        $stmt->bindParam(':telefone', $telefone);
        $stmt->bindParam(':newsletter', $newsletter, PDO::PARAM_INT);
        $stmt->bindParam(':data_cadastro', $data_cadastro);

        //  Executa
        $stmt->execute();

        // Sucesso 
        $success = "Registration successful!";
    } catch (PDOException $e) {
        $error = "Database error: " . $e->getMessage();
    } catch (Exception $e) {
        $error = "Error: " . $e->getMessage();
    }
    
    // Validar campos obrigatorios
    $camposObrigatorios = ['nome', 'email', 'senha', 'tipo_conta']; //Valida se os campos estão preenchidos "Se campo estiver vazio, Mostra mensagem (Campo é obrigatorio)"
    foreach ($camposObrigatorios as $campo) {
        if (empty($_POST[$campo])) {
            throw new Exception("O campo $campo é obrigatório"); 
        }
    }

    //Processar dados  // SEGURANÇA "real_escape_string"
    $nome = $conn->real_escape_string($_POST['nome']);
    $email = $conn->real_escape_string($_POST['email']);


    // Verificar se e-mail ja existe
    $verifica = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");  //Verificar email dentro do banco de dados 
    $verifica->bind_param("s", $email);
    $verifica->execute();
    if ($verifica->get_result()->num_rows > 0) {
        throw new Exception("Este e-mail já está cadastrado"); //Mensagem se email ja existente
    }
}
?>
*/

/*
<?php if (isset($error)): ?>
        <p class="error"><?php echo htmlspecialchars($error); ?></p>
    <?php endif; ?>
    
    <?php if (isset($success)): ?>
        <p class="success"><?php echo htmlspecialchars($success); ?></p>
    <?php endif; ?>
 