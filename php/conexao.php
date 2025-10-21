<?php
// FILE: conexaoTest.php

// Definição das constantes de conexão
const dbDrive = 'mysql'; // Protocolo de acesso
const dbHost = 'localhost'; // Endereço ou link do servidor
const dbName = 'pdi'; // Nome do banco de dados
const dbUser = 'root'; // Usuário do banco de dados
const dbPass = ''; // Senha do banco de dados (deixe vazio se não houver senha)

// Criar conexão

$conn = mysqli_connect(dbHost, dbUser, dbPass, dbName);
if ($conn) {
    mysqli_set_charset($conn, 'utf8mb4');
}

// Verificar conexão
if (!$conn) {
    die("Falha na conexão: " . mysqli_connect_error());
}
?>