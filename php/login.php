<?php
session_start();
header("Content-Type: application/json; charset=utf-8");
require 'conexao.php';

// Permite receber tanto application/json quanto x-www-form-urlencoded
if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $senha = $input['senha'] ?? '';
} else {
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';
}

if (empty($email) || empty($senha)) {
    echo json_encode(["success" => false, "message" => "Email e senha são obrigatórios."]);
    exit;
}

$sql = "SELECT * FROM usuario WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    if (password_verify($senha, $user['senha'])) {
        // A mágica acontece aqui: O ID do usuário é salvo na sessão
        $_SESSION['usuario_id'] = $user['id'];
        $_SESSION['usuario_nome'] = $user['nome'];
        echo json_encode([
            "success" => true,
            "message" => "Login realizado com sucesso.",
            "usuario" => ["id" => $user['id'], "nome" => $user['nome']]
        ]);
        exit;
    } else {
        echo json_encode(["success" => false, "message" => "Senha incorreta."]);
        exit;
    }
} else {
    echo json_encode(["success" => false, "message" => "Usuário não encontrado."]);
    exit;
}
?>