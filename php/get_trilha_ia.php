<?php
// ADICIONADO: Inicia a sessão para ler as informações do usuário
session_start();
header('Content-Type: application/json');
require 'conexao.php'; 

// --- BLOCO DE SEGURANÇA ADICIONADO ---
// Verifica se o usuário está logado. Se não, interrompe o script.
if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401); // Código "Não Autorizado"
    echo json_encode(['success' => false, 'message' => 'Acesso negado. Por favor, faça o login.']);
    exit;
}
// --- FIM DO BLOCO DE SEGURANÇA ---

// ALTERAÇÃO AQUI: Pega o ID dinamicamente da sessão
$usuario_id = $_SESSION['usuario_id'];

$response = ['success' => false];

// Busca a trilha mais recente do usuário LOGADO
$sql_trilha = "SELECT id, area_carreira, analise_conselheira, trilha_html FROM trilhas_geradas_ia WHERE usuario_id = ? ORDER BY data_geracao DESC LIMIT 1";
$stmt_trilha = $conn->prepare($sql_trilha);

if (!$stmt_trilha) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro no servidor (prepare trilha).']);
    exit;
}

$stmt_trilha->bind_param("i", $usuario_id);
$stmt_trilha->execute();
$result_trilha = $stmt_trilha->get_result();

if ($trilha = $result_trilha->fetch_assoc()) {
    $response['success'] = true;
    $response['trilha'] = $trilha;
    $trilha_id = $trilha['id'];
    
    // Busca os entregáveis associados a esta trilha
    $sql_entregaveis = "SELECT etapa_id, nome_original, caminho_arquivo FROM entregaveis_ia WHERE trilha_id = ?";
    $stmt_entregaveis = $conn->prepare($sql_entregaveis);

    if($stmt_entregaveis) {
        $stmt_entregaveis->bind_param("i", $trilha_id);
        $stmt_entregaveis->execute();
        $result_entregaveis = $stmt_entregaveis->get_result();

        $entregaveis = [];
        while ($entregavel = $result_entregaveis->fetch_assoc()) {
            $entregaveis[$entregavel['etapa_id']] = [
                'nome_original' => $entregavel['nome_original'],
                'caminho_arquivo' => $entregavel['caminho_arquivo']
            ];
        }
        $response['entregaveis'] = $entregaveis;
        $stmt_entregaveis->close();
    }
} else {
    $response['message'] = 'Nenhuma trilha salva encontrada.';
}

echo json_encode($response);

$stmt_trilha->close();
$conn->close();
?>