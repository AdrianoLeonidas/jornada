<?php
session_start();
require 'conexao.php';

$input = json_decode(file_get_contents("php://input"), true);
$usuario_id = $_SESSION['usuario_id'] ?? null;
$perfil = $input['perfil'] ?? null;

if (!$usuario_id || !$perfil) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados inválidos.']);
    exit;
}

$sql = "INSERT INTO perfis (usuario_id, perfil) VALUES (?, ?)
        ON DUPLICATE KEY UPDATE perfil = VALUES(perfil), atualizado_em = CURRENT_TIMESTAMP";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $usuario_id, $perfil);
$stmt->execute();

echo json_encode(['success' => true, 'message' => 'Perfil salvo com sucesso.']);
?>
