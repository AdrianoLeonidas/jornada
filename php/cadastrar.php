<?php
header("Content-Type: application/json");

require 'conexao.php'; // Certifique-se de que o arquivo conexao.php está correto e configurado

$data = json_decode(file_get_contents("php://input"));

// Verifica se os dados foram enviados corretamente
if (!empty($data->nome) && !empty($data->email) && !empty($data->senha)) {
    // Verifica se já existe um usuário com o mesmo email
    $check = $conn->prepare("SELECT id FROM usuario WHERE email = ?");
    $check->bind_param("s", $data->email);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        echo json_encode([
            "success" => false,
            "message" => "Email já está em uso."
        ]);
        exit;
    }

    // Gera hash da senha
    $senha_hash = password_hash($data->senha, PASSWORD_DEFAULT);

    // Insere o usuário no banco de dados
    $query = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $data->nome, $data->email, $senha_hash);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Usuário cadastrado com sucesso."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Erro ao cadastrar usuário."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Dados incompletos."
    ]);
}
?>