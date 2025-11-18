<?php
session_start();
require_once 'conexao.php';


if (!isset($_SESSION['id_usuario'])) {
    header("Location: login.php");
    exit;
}

?>