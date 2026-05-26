
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios") 
   .then(res => res.json()) // 2. Transforma a resposta em formato JSON legível 
   .then(data => { 
     // 3. Procura apenas pela cidade de Serra Talhada 
     const resultado = data.find( 
       m => m.nome.toLowerCase() === "serra talhada" 
     ); 

     console.log(resultado); 
   });
