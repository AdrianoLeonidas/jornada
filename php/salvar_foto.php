<?php
header('Content-Type: application/json');
require 'conexao.php'; // Padroniza conexão

session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Permite apenas o próprio usuário alterar sua foto
    $session_id = $_SESSION['usuario_id'] ?? null;
    $userId = $data['userId'] ?? null;
    $avatar = $data['avatar'] ?? null;

    if (!$session_id || !$userId || !$avatar || $session_id != $userId) {
        echo json_encode(['success' => false, 'message' => 'Acesso negado ou dados inválidos.']);
        exit;
    }

    // Verifica se usuário existe
    $check = $conn->prepare("SELECT id FROM usuario WHERE id = ?");
    $check->bind_param('i', $userId);
    $check->execute();
    $result = $check->get_result();
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Usuário não encontrado.']);
        exit;
    }
    $check->close();

    $stmt = $conn->prepare("UPDATE usuario SET foto_perfil = ? WHERE id = ?");
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Erro ao preparar a consulta: ' . $conn->error]);
        exit;
    }
    $stmt->bind_param('si', $avatar, $userId);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Foto de perfil atualizada com sucesso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao executar a consulta: ' . $stmt->error]);
    }
    $stmt->close();
}
?>