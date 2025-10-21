<?php
session_start();
header('Content-Type: application/json');
require 'conexao.php';

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'Usuário não autenticado']);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

// Buscar nome do usuário
$stmt = $conn->prepare("SELECT nome FROM usuario WHERE id = ?");
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();
$usuario = $result->fetch_assoc();
$nome = $usuario['nome'] ?? 'Usuário';

// Buscar perfil mais recente
$sql = "SELECT perfil FROM perfis WHERE usuario_id = ? ORDER BY atualizado_em DESC LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode(['nome' => $nome, 'perfil_original' => null, 'perfil_trilha' => null]);
    exit;
}

$row = $result->fetch_assoc();
$perfil_original = strtolower($row['perfil']);

// Mapeamento perfil formulário → perfil trilha
$mapa_perfis = [
    'colaborador' => 'trabalho em equipe',
    'comunicador' => 'comunicacao',
    'empático' => 'empatia',
    'líder' => 'lideranca',
    'estrategista' => 'gestao de projetos',
    'inovador' => 'tecnologia',
    'pacificador' => 'resolucao de conflitos',
    'conector' => 'networking'
];

$perfil_trilha = $mapa_perfis[$perfil_original] ?? $perfil_original;
$perfil_exibido = ucfirst($perfil_original) . ' / ' . ucfirst($perfil_trilha);

echo json_encode([
    'nome' => $nome,
    'perfil_original' => $perfil_original,
    'perfil_trilha' => $perfil_trilha,
    'perfil_exibido' => $perfil_exibido
]);
?>
