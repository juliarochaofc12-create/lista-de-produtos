const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

const db = new sqlite3.Database("database.db");

// Cria tabela
db.run(`
CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    preco REAL
)
`);

// Inserir produto
app.get("/produtos/add/:nome/:preco", (req, res) => {
    const { nome, preco } = req.params;

    db.run(
        "INSERT INTO produtos (nome, preco) VALUES (?, ?)",
        [nome, preco],
        function(err) {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensagem: "Produto inserido!",
                id: this.lastID
            });
        }
    );
});

// Consultar produtos
app.get("/produtos", (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});