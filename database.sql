CREATE DATABASE pern;

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(250),
    email VARCHAR(250),
    cpf CHAR(11)
);
