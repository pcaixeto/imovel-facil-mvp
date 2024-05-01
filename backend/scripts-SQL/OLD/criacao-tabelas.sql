CREATE TABLE tb_tipo_imovel (
    id_tipo_imovel INT PRIMARY KEY,
    tp_imovel TEXT NOT NULL
);

CREATE TABLE tb_imovel (
    id_imovel SERIAL PRIMARY KEY,
    id_proprietario INT NOT NULL,
    endereco JSONB NOT NULL,
    id_tipo_imovel INT NOT NULL,
    status_imovel TEXT,
    FOREIGN KEY (id_tipo_imovel) REFERENCES tb_tipo_imovel (id_tipo_imovel)
);

-- CREATE TABLE tb_anuncio (
--     id_anuncio INT PRIMARY KEY,
--     id_imovel INT NOT NULL,
--     id_proprietario INT NOT NULL,
--     vl_preco_anuncio NUMERIC NOT NULL,
--     ds_anuncio TEXT,
--     dh_criacao TIMESTAMP NOT NULL,
--     dh_expiracao TIMESTAMP,
--     origem_anuncio TEXT,
--     FOREIGN KEY (id_imovel) REFERENCES tb_imovel (id_imovel)
-- );

CREATE TABLE tb_anuncio (
    id_anuncio SERIAL PRIMARY KEY,
    id_imovel INT NOT NULL,
    id_proprietario INT NOT NULL,
    vl_preco_anuncio NUMERIC NOT NULL,
    ds_anuncio TEXT,
    dh_criacao TIMESTAMP NOT NULL,
    dh_expiracao TIMESTAMP,
    origem_anuncio TEXT,
    FOREIGN KEY (id_imovel) REFERENCES tb_imovel (id_imovel)
);