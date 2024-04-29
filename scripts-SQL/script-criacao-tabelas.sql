CREATE TABLE tb_tipo_imovel (
    id_tipo_imovel SERIAL PRIMARY KEY,
    tp_imovel TEXT NOT NULL
);

CREATE TABLE tb_status_anuncio (
    id_status_anuncio SERIAL PRIMARY KEY,
    desc_tipo_imovel VARCHAR(255)
);

CREATE TABLE tb_anunciante (
    id_anunciante SERIAL PRIMARY KEY,
    nome_anunciante VARCHAR(255),
    email_anunciante VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE tb_anuncio (
    id_anuncio SERIAL PRIMARY KEY,
    id_anunciante INT,
    nome_anuncio VARCHAR(255),
    endereco VARCHAR(255),
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(2),
    descricao_anuncio TEXT,
    valor_venda_imovel NUMERIC(10,2),
    valor_aluguel_imovel NUMERIC(10,2),
    valor_condominio_apto NUMERIC(10,2),
    dh_publicacao TIMESTAMP,
    dh_expiracao_publicacao TIMESTAMP,
    tipo_imovel INT,
    status_anuncio INT,
    tamanho_imovel NUMERIC(10,2),
    numero_quartos INT,
    numero_moradores_republica INT,
    FOREIGN KEY (id_anunciante) REFERENCES tb_anunciante (id_anunciante),
    FOREIGN KEY (tipo_imovel) REFERENCES tb_tipo_imovel (id_tipo_imovel),
    FOREIGN KEY (status_anuncio) REFERENCES tb_status_anuncio (id_status_anuncio)
);