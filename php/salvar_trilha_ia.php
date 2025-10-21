<?php
// ADICIONADO: Inicia a sessão para saber qual usuário está salvando
session_start();
header('Content-Type: application/json');
require 'conexao.php';

// --- BLOCO DE SEGURANÇA ADICIONADO ---
if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401); // Código "Não Autorizado"
    echo json_encode(['success' => false, 'message' => 'Acesso negado. Por favor, faça o login.']);
    exit;
}
// --- FIM DO BLOCO DE SEGURANÇA ---

// ALTERAÇÃO AQUI: Pega o ID da sessão para usar nas queries
$usuario_id = $_SESSION['usuario_id'];

// Decodifica o JSON enviado pelo JavaScript
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Nenhum dado recebido.']);
    exit;
}

$area_carreira = $data['area_carreira'] ?? null;
$analise_conselheira = $data['analise_conselheira'] ?? null;
$trilha_html = $data['trilha_html'] ?? null;
// A linha com ID de usuário fixo foi removida

if (!$area_carreira || !$analise_conselheira || !$trilha_html) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados incompletos para salvar a trilha.']);
    exit;
}

$conn->begin_transaction();

try {
    // --- LÓGICA PARA EXCLUIR A TRILHA ANTIGA (SE EXISTIR) DO USUÁRIO LOGADO ---
    $stmt_find = $conn->prepare("SELECT id FROM trilhas_geradas_ia WHERE usuario_id = ?");
    $stmt_find->bind_param("i", $usuario_id);
    $stmt_find->execute();
    $result = $stmt_find->get_result();

    if ($trilha_antiga = $result->fetch_assoc()) {
        $trilha_id_antiga = $trilha_antiga['id'];

        $stmt_files = $conn->prepare("SELECT caminho_arquivo FROM entregaveis_ia WHERE trilha_id = ?");
        $stmt_files->bind_param("i", $trilha_id_antiga);
        $stmt_files->execute();
        $files_result = $stmt_files->get_result();
        while ($row = $files_result->fetch_assoc()) {
            $filepath = '../' . $row['caminho_arquivo'];
            if (file_exists($filepath) && is_file($filepath)) {
                unlink($filepath);
            }
        }
        $stmt_files->close();

        $stmt_del_entregaveis = $conn->prepare("DELETE FROM entregaveis_ia WHERE trilha_id = ?");
        $stmt_del_entregaveis->bind_param("i", $trilha_id_antiga);
        $stmt_del_entregaveis->execute();
        $stmt_del_entregaveis->close();
        
        $stmt_del_trilha = $conn->prepare("DELETE FROM trilhas_geradas_ia WHERE id = ?");
        $stmt_del_trilha->bind_param("i", $trilha_id_antiga);
        $stmt_del_trilha->execute();
        $stmt_del_trilha->close();
    }
    $stmt_find->close();

    // --- LÓGICA PARA INSERIR A NOVA TRILHA PARA O USUÁRIO LOGADO ---
    $sql_insert = "INSERT INTO trilhas_geradas_ia (usuario_id, area_carreira, analise_conselheira, trilha_html) VALUES (?, ?, ?, ?)";
    $stmt_insert = $conn->prepare($sql_insert);
    $stmt_insert->bind_param("isss", $usuario_id, $area_carreira, $analise_conselheira, $trilha_html);
    
    if ($stmt_insert->execute()) {
        $novo_trilha_id = $conn->insert_id;
        $conn->commit();
        echo json_encode(['success' => true, 'message' => 'Nova trilha salva com sucesso!', 'trilha_id' => $novo_trilha_id]);
    } else {
        throw new Exception("Erro ao inserir a nova trilha no banco de dados.");
    }
    $stmt_insert->close();

} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

$conn->close();
?>