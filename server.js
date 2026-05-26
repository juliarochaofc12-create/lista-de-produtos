const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        mensagem: 'Servidor funcionando!'
    });
});

app.get('/produtos', (req, res) => {
    res.json([
        { id: 1, nome: 'Notebook', preco: 3500 },
        { id: 2, nome: 'Mouse', preco: 150 }
    ]);
});

app.get('/usuarios', (req, res) => {
    res.json([
        { id: 1, nome: 'Julia' },
        { id: 2, nome: 'Carlos' }
    ]);
});

app.get('/pedidos', (req, res) => {
    res.json([
        { id: 1, produto: 'Notebook' }
    ]);
});

app.get('/categorias', (req, res) => {
    res.json([
        { id: 1, nome: 'Informática' }
    ]);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});