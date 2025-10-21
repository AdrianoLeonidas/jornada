<?php
// php/excluir_trilha_ia.php - VERSÃO CORRIGIDA E SEGURA

session_start(); // PASSO 1: Inicia a sessão para saber quem está logado
header('Content-Type: application/json');
require 'conexao.php';

// PASSO 2: Bloco de segurança para garantir que há um usuário logado
if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Acesso negado. Por favor, faça o login.']);
    exit;
}

// PASSO 3: Pega o ID do usuário da sessão, em vez de um número fixo
$usuario_id = $_SESSION['usuario_id']; 

$conn->begin_transaction();

try {
    // Sua lógica de busca da trilha já estava correta
    $sql_find = "SELECT id FROM trilhas_geradas_ia WHERE usuario_id = ? ORDER BY data_geracao DESC LIMIT 1";
    $stmt_find = $conn->prepare($sql_find);
    $stmt_find->bind_param("i", $usuario_id);
    $stmt_find->execute();
    $result = $stmt_find->get_result();
    
    if ($trilha = $result->fetch_assoc()) {
        $trilha_id = $trilha['id'];
        
        // Sua lógica para encontrar e deletar os arquivos físicos está ótima
        $sql_get_files = "SELECT caminho_arquivo FROM entregaveis_ia WHERE trilha_id = ?";
        $stmt_get_files = $conn->prepare($sql_get_files);
        $stmt_get_files->bind_param("i", $trilha_id);
        $stmt_get_files->execute();
        $files_result = $stmt_get_files->get_result();
        
        while($file = $files_result->fetch_assoc()){
            // O caminho precisa ser relativo à localização do script PHP
            $caminho_fisico = __DIR__ . '/../' . $file['caminho_arquivo'];
            if(file_exists($caminho_fisico) && is_file($caminho_fisico)){
                unlink($caminho_fisico);
            }
        }
        $stmt_get_files->close();
        
        // Sua lógica para deletar os registros do banco está perfeita
        $sql_delete_entregaveis = "DELETE FROM entregaveis_ia WHERE trilha_id = ?";
        $stmt_entregaveis = $conn->prepare($sql_delete_entregaveis);
        $stmt_entregaveis->bind_param("i", $trilha_id);
        $stmt_entregaveis->execute();
        $stmt_entregaveis->close();
        
        $sql_delete_trilha = "DELETE FROM trilhas_geradas_ia WHERE id = ?";
        $stmt_trilha = $conn->prepare($sql_delete_trilha);
        $stmt_trilha->bind_param("i", $trilha_id);
        $stmt_trilha->execute();
        $stmt_trilha->close();
    }
    
    $conn->commit();
    echo json_encode(['success' => true, 'message' => 'Trilha e todos os dados relacionados foram excluídos com sucesso.']);
    
} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    // Envia uma mensagem de erro mais detalhada para facilitar a depuração
    echo json_encode(['success' => false, 'message' => 'Erro no servidor ao excluir a trilha: ' . $e->getMessage()]);
} finally {
    if (isset($stmt_find)) $stmt_find->close();
    $conn->close();
}
?>