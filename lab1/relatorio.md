# LAB 1 - Investigação

## Objetivo

Investigar se os dados cadastrados no sistema permanecem armazenados após reiniciar o servidor Node.js.

## Procedimento Realizado

1. Cadastrei alguns produtos no sistema fornecido.
2. Consultei os produtos para verificar se estavam cadastrados.
3. Encerrei o servidor Node.js.
4. Reiniciei o servidor.
5. Consultei novamente os produtos cadastrados.

## Resultado Obtido

Após reiniciar o servidor, os produtos cadastrados anteriormente não estavam mais disponíveis.

## Conclusão

Os dados não estavam sendo armazenados em um banco de dados. Eles estavam sendo mantidos apenas na memória RAM da aplicação.

Quando o servidor foi encerrado, a memória foi limpa e todas as informações foram perdidas.

## O que eu entendi

A persistência de dados é necessária para que as informações continuem existindo mesmo após fechar ou reiniciar a aplicação.

Sem um banco de dados, os dados ficam armazenados apenas temporariamente na memória do servidor.

Portanto, para sistemas reais, é necessário utilizar um mecanismo de persistência, como SQLite, MySQL ou PostgreSQL.