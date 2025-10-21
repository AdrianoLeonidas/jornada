<?php
// ADICIONADO: Inicia a sessão
session_start();
header('Content-Type: application/json');
require 'conexao.php';

// --- BLOCO DE SEGURANÇA ADICIONADO ---
// 1. Verifica se o usuário está logado
if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401); // Código "Não Autorizado"
    echo json_encode(['success' => false, 'message' => 'Acesso negado. Por favor, faça o login.']);
    exit;
}
// Pega o ID do usuário logado para a verificação de permissão
$usuario_id_logado = $_SESSION['usuario_id'];
// --- FIM DO BLOCO DE SEGURANÇA ---

$etapa_id = $_POST['etapa_id'] ?? null;
$trilha_id = $_POST['trilha_id'] ?? null;
$file = $_FILES['pdfFile'] ?? null;

if (!$etapa_id || !$trilha_id || !$file) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados incompletos.']);
    exit;
}

// --- VERIFICAÇÃO DE PERMISSÃO ADICIONADA ---
// 2. Checa se a `trilha_id` enviada realmente pertence ao usuário que está logado
$stmt_check = $conn->prepare("SELECT id FROM trilhas_geradas_ia WHERE id = ? AND usuario_id = ?");
$stmt_check->bind_param("ii", $trilha_id, $usuario_id_logado);
$stmt_check->execute();
$result_check = $stmt_check->get_result();
if ($result_check->num_rows === 0) {
    // Se a consulta não retornar resultados, o usuário não é dono da trilha.
    http_response_code(403); // Código "Proibido"
    echo json_encode(['success' => false, 'message' => 'Você não tem permissão para enviar arquivos para esta trilha.']);
    $stmt_check->close();
    $conn->close();
    exit;
}
$stmt_check->close();
// --- FIM DA VERIFICAÇÃO DE PERMISSÃO ---

if ($file['error'] !== UPLOAD_ERR_OK || $file['type'] !== 'application/pdf' || $file['size'] > 5 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Arquivo inválido. Apenas PDF de até 5MB.']);
    exit;
}

$uploadDir = '../uploads/';
if (!is_dir($uploadDir)) mkdir($uploadDir, 0775, true);

$nome_original = basename($file['name']);
$nome_unico = uniqid('entregavel_', true) . '.pdf';
$caminho_servidor = $uploadDir . $nome_unico;
$caminho_db = 'uploads/' . $nome_unico;

if (move_uploaded_file($file['tmp_name'], $caminho_servidor)) {
    $sql = "INSERT INTO entregaveis_ia (trilha_id, etapa_id, nome_original, caminho_arquivo)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            nome_original = VALUES(nome_original),
            caminho_arquivo = VALUES(caminho_arquivo)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiss", $trilha_id, $etapa_id, $nome_original, $caminho_db);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Entregável enviado com sucesso!',
            'entregavel' => [
                'nome_original' => $nome_original,
                'caminho_arquivo' => $caminho_db
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Erro ao salvar no banco de dados.']);
    }
    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Falha ao mover o arquivo enviado.']);
}
$conn->close();
?>