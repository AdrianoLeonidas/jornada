<?php
class Database {
    private $host = "localhost";
    private $db_name = "pdi"; // Nome do banco de dados
    private $username = "root"; // Usuário do banco
    private $password = ""; // Senha do banco (deixe vazio se não houver senha)
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                                   $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Erro de conexão: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>