/*
Comentário:
Este comando cria a tabela produtos
que será utilizada para armazenar os dados.
*/

CREATE TABLE produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL
);

Comentário:
Registro de teste solicitado no laboratório.

INSERT INTO produtos (nome, preco)
VALUES ('Notebook', 3500);


Comentário:
Consulta para verificar se o registro foi salvo.

SELECT * FROM produtos;