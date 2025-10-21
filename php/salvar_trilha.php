<?php
session_start();
require 'conexao.php';
header('Content-Type: application/json; charset=utf-8');

// Recebe JSON do frontend
$input = json_decode(file_get_contents('php://input'), true);

// Permite tanto sessão quanto POST JSON
$usuario_id = null;
if (isset($_SESSION['usuario_id'])) {
    $usuario_id = $_SESSION['usuario_id'];
} elseif (isset($input['usuario_id'])) {
    $usuario_id = $input['usuario_id'];
}

if (!$usuario_id) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Usuário não identificado."]);
    exit;
}

// Suporte ao novo formato de progresso (array de módulos)
if (isset($input['progresso'])) {
    $progresso = $input['progresso'];
    foreach ($progresso as $modulo_id => $etapas) {
        $modulo_id = (int) $modulo_id;
        $etapas_concluidas = json_encode($etapas);
        // Verifica se módulo existe
        $check_mod = $conn->prepare("SELECT id FROM modulos WHERE id = ?");
        $check_mod->bind_param("i", $modulo_id);
        $check_mod->execute();
        $result_mod = $check_mod->get_result();
        if ($result_mod->num_rows === 0)
            continue;
        $check_mod->close();
        // Verifica se já existe registro
        $sql = "SELECT id FROM progresso_usuario WHERE usuario_id = ? AND modulo_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $usuario_id, $modulo_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $sql = "UPDATE progresso_usuario SET etapas_concluidas = ? WHERE usuario_id = ? AND modulo_id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sii", $etapas_concluidas, $usuario_id, $modulo_id);
        } else {
            $sql = "INSERT INTO progresso_usuario (usuario_id, modulo_id, etapas_concluidas) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("iis", $usuario_id, $modulo_id, $etapas_concluidas);
        }
        $stmt->execute();
    }
    echo json_encode(["success" => true, "message" => "Progresso salvo!"]);
    exit;
}

// Remove código legado referente à tabela 'trilhas'
echo json_encode(["success" => false, "message" => "Formato de requisição inválido."]);
exit;
?>