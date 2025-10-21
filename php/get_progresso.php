<?php
session_start();
require 'conexao.php';
header('Content-Type: application/json; charset=utf-8');

// Verifica se o usuário está logado
$usuario_id = $_SESSION['usuario_id'] ?? null;
if (!$usuario_id) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Usuário não autenticado."]);
    exit;
}

// Busca nome, foto e progresso do usuário
$sql_nome = "SELECT nome, foto_perfil FROM usuario WHERE id = ?";
$stmt_nome = $conn->prepare($sql_nome);
$stmt_nome->bind_param("i", $usuario_id);
$stmt_nome->execute();
$result_nome = $stmt_nome->get_result();
$usuario_nome = null;
$foto_perfil = null;
if ($row = $result_nome->fetch_assoc()) {
    $usuario_nome = $row['nome'];
    $foto_perfil = $row['foto_perfil'];
}

// Busca o progresso do usuário
$sql = "SELECT modulo_id, etapas_concluidas, conquistado FROM progresso_usuario WHERE usuario_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();
$progresso = [];
$conquistas = [];
while ($row = $result->fetch_assoc()) {
    $progresso[$row['modulo_id']] = json_decode($row['etapas_concluidas'], true);
    if ($row['conquistado'])
        $conquistas[] = $row['modulo_id'];
}

echo json_encode([
    "success" => true,
    "usuario_id" => $usuario_id,
    "usuario_nome" => $usuario_nome,
    "foto_perfil" => $foto_perfil,
    "progresso" => $progresso,
    "conquistas" => $conquistas
]);
