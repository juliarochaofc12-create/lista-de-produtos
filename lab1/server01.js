const express = require("express");

const app = express();

app.use(express.json());

// Array para armazenar os produtos
let produtos = [];
let id = 1;

// Cadastrar produto
app.post("/produtos", (req, res) => {
    const { nome, preco } = req.body;

    const novoProduto = {
        id: id++,
        nome,
        preco
    };

    produtos.push(novoProduto);

    res.json({
        mensagem: "Produto cadastrado com sucesso!",
        produto: novoProduto
    });
});

// Listar produtos
app.get("/produtos", (req, res) => {
    res.json(produtos);
});

// Rota base
app.get("/", (req, res) => {
    res.json({
        mensagem: "API funcionando!"
    });
});

// Rota usuários
app.get("/usuarios", (req, res) => {
    res.json([
        { id: 1, nome: "João" },
        { id: 2, nome: "Maria" }
    ]);
});

// Rota categorias
app.get("/categorias", (req, res) => {
    res.json([
        { id: 1, nome: "Eletrônicos" },
        { id: 2, nome: "Alimentos" }
    ]);
});

// Inicialização do servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});