const sqlite3 = require("sqlite3").verbose();

/*
Comentário:
Este código cria o arquivo database.db.
Se ele não existir, será criado automaticamente.
*/

const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.log("Erro:", err.message);
  } else {
    console.log("Banco criado com sucesso!");
  }
});

// Fecha a conexão
db.close();