//1. Importa a biblioteca do Express 
const express = require("express"); 

// 2. Instancia o servidor  na variável app 
const app = express(); 

// 3. Ligar o servidor na porta 3000 
app.listen(3000, () => { 
   console.log("Servidor da nossa API rodando!"); 
    });


app.get("/buscar-cidade]s ]", (req, res) => { 
   // Nosso servidor (Back-end) faz o fetch na API do IBGE 
   fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios") 
     .then(resposta => resposta.json()) 
     .then(dados => { 
       const cidade = dados.find(m => m.nome.toLowerCase() === "serra talhada"); 
        
       // Nosso servidor DEVOLVE o JSON mastigado pro Navegador do Cliente 
       res.json(cidade); 
     }); 
 });
