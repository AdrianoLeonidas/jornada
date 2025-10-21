<?php
session_start();
header('Content-Type: application/json');
require 'conexao.php';

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'Usuário não autenticado']);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

$sql = "SELECT perfil FROM perfis WHERE usuario_id = ? ORDER BY atualizado_em DESC LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode(['perfil' => null]);
    exit;
}

$row = $result->fetch_assoc();
$perfil = $row['perfil'];

$recomendacoes = [
    'lideranca' => [
        'cursos' => [
            ['nome' => 'Liderança na Prática', 'link' => 'https://www.coursera.org/learn/lideranca'],
            ['nome' => 'Gestão de Equipes Ágeis', 'link' => 'https://www.alura.com.br/curso-online-gestao-equipes-ageis']
        ],
        'livros' => [
            ['nome' => 'O Monge e o Executivo', 'autor' => 'James C. Hunter'],
            ['nome' => 'Liderança Tóxica', 'autor' => 'Marcia Luz']
        ]
    ],
    'relacao' => [
        'cursos' => [
            ['nome' => 'Comunicação Não-Violenta', 'link' => 'https://www.udemy.com/course/comunicacao-nao-violenta/'],
            ['nome' => 'Empatia e Conexões Humanas', 'link' => 'https://www.linkedin.com/learning/']
        ],
        'livros' => [
            ['nome' => 'Como Fazer Amigos e Influenciar Pessoas', 'autor' => 'Dale Carnegie'],
            ['nome' => 'Inteligência Emocional', 'autor' => 'Daniel Goleman']
        ]
    ],
    'tecnologia' => [
        'cursos' => [
            ['nome' => 'Lógica de Programação com JavaScript', 'link' => 'https://www.mimo.org/'],
            ['nome' => 'Git e GitHub', 'link' => 'https://www.udemy.com/course/git-e-github-para-iniciantes/']
        ],
        'livros' => [
            ['nome' => 'Clean Code', 'autor' => 'Robert C. Martin'],
            ['nome' => 'O Programador Pragmático', 'autor' => 'Andrew Hunt & David Thomas']
        ]
    ]
];

echo json_encode([
    'perfil' => $perfil,
    'cursos' => $recomendacoes[$perfil]['cursos'] ?? [],
    'livros' => $recomendacoes[$perfil]['livros'] ?? []
]);
