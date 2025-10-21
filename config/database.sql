-- ========= TABELAS DO SEU SISTEMA ORIGINAL (Módulos, Perfis, etc.) =========

-- Tabela de usuários (unificada)
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    foto_perfil TEXT DEFAULT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela de módulos de aprendizado
CREATE TABLE modulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    etapas INT NOT NULL,
    conquista VARCHAR(100) NOT NULL,
    perfil VARCHAR(50) DEFAULT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela de etapas de cada módulo
CREATE TABLE etapas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modulo_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    ordem INT,
    FOREIGN KEY (modulo_id) REFERENCES modulos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela para associar perfis aos usuários
CREATE TABLE perfis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    perfil VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela para rastrear o progresso geral do usuário nos módulos
CREATE TABLE progresso_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    modulo_id INT NOT NULL,
    etapas_concluidas TEXT DEFAULT NULL,
    conquistado BOOLEAN DEFAULT FALSE,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (modulo_id) REFERENCES modulos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela para armazenar respostas de formulários
CREATE TABLE respostas_formulario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    formulario VARCHAR(100) NOT NULL,
    respostas TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ========= TABELAS ESPECÍFICAS PARA O MENTOR IA =========

-- Tabela para armazenar as trilhas de carreira geradas pela IA
CREATE TABLE trilhas_geradas_ia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    area_carreira VARCHAR(255) NOT NULL,
    analise_conselheira TEXT,
    trilha_html LONGTEXT,
    data_geracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela para armazenar os PDFs enviados como entregáveis
CREATE TABLE entregaveis_ia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trilha_id INT NOT NULL,
    etapa_id VARCHAR(50) NOT NULL,
    nome_original VARCHAR(255) NOT NULL,
    caminho_arquivo VARCHAR(255) NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trilha_id) REFERENCES trilhas_geradas_ia(id) ON DELETE CASCADE,
    UNIQUE KEY (trilha_id, etapa_id)
) ENGINE=InnoDB;


-- ========= TABELAS DE MELHORIAS E EXTRAS (do seu script) =========

CREATE TABLE preferencias_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tema VARCHAR(20) DEFAULT 'claro',
    notificacoes BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE progresso_detalhado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    modulo_id INT NOT NULL,
    etapa_id INT NOT NULL,
    concluido BOOLEAN DEFAULT FALSE,
    data_conclusao TIMESTAMP NULL,
    tempo_gasto INT DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (modulo_id) REFERENCES modulos(id) ON DELETE CASCADE,
    FOREIGN KEY (etapa_id) REFERENCES etapas(id) ON DELETE CASCADE,
    UNIQUE KEY (usuario_id, modulo_id, etapa_id)
) ENGINE=InnoDB;

CREATE TABLE historico_atividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo_atividade VARCHAR(50) NOT NULL,
    descricao TEXT,
    data_atividade TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE recomendacoes_personalizadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    url VARCHAR(255),
    prioridade INT DEFAULT 0,
    visualizado BOOLEAN DEFAULT FALSE,
    data_recomendacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ========= DADOS INICIAIS ESSENCIAIS =========

-- Inserir o usuário padrão com ID=1 para o Mentor IA funcionar
INSERT INTO usuario (id, nome, email, senha) VALUES (1, 'Usuário Padrão', 'usuario@exemplo.com', 'senha_padrao');

-- Inserção dos módulos alinhados com o frontend (do seu script)
INSERT INTO modulos (nome, etapas, conquista, perfil) VALUES
('Comunicação', 3, '🗣 Comunicador', 'relacao'),
('Empatia', 3, '🤗 Empático', 'relacao'),
('Colaboração', 4, '🤝 Colaborador', 'relacao'),
('Liderança', 5, '🌟 Líder Inspirador', 'lideranca'),
('Tecnologia', 4, '💻 Inovador', 'tecnologia'),
('Resolução de Conflitos', 3, '🕊 Pacificador', 'relacao'),
('Networking', 3, '🌐 Conector', 'relacao'),
('Gestão de Projetos', 4, '📈 Gestor de Projetos', 'lideranca');
