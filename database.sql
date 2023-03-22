CREATE DATABASE pern;

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(250),
    email VARCHAR(250),
    cpf CHAR(11)
);

INSERT INTO usuarios(
    nome,
    email,
    cpf
)
VALUES(
    'Bruno',
    'Bruno@gmail.com',
    '12345678900'
);