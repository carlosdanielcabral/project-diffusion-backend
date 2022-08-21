# Projeto Diffusion - Backend

Bem-vindo (a) ao repositório do Projeto Diffusion (Backend).

## Contexto

Esta API permite criar e autenticar pessoas usuárias, criar, editar e deletar posts.

## Tecnologias utilizadas no desenvolvimento

Typescript, Node, Sequelize, Docker.

## Documentação

Para acessar a documentação da API basta acessar o seguinte endereço, estando ela rodando:

http://localhost:3001/api-docs/

## Dependências necessárias

Para rodar este projeto é necessário ter instalado na máquina o Docker e Docker Compose ou o npm.

## Rodando a aplicação

Possuindo as dependências necessárias na máquina, siga as intruções abaixo:

<details>

  <summary>
    <strong>Rodando a aplicação com Docker Compose</strong>
  </summary>

  <br />
  
  1. Para rodar a aplicação com o Docker Compose, digite o comando abaixo no terminal:
  
  ```bash
    docker-compose up
  ```
  
  2. Agora, copie as informações do arquivo .ev.example para um arquivo .env
  
  3. Feito isso, faça o reset do banco rodando o seguinte comando:
  
  ```bash
    npm run db:reset
  ```
  
  4. Pronto! A API já está pronta para uso local.

</details>

<details>

  <summary>
    <strong>Rodando a aplicação sem Docker</strong>
  </summary>

  <br />
  
  Para rodar a aplicação sem o Docker Compose:
  
  <strong>*Certifique-se de possuir um banco de dados Mysql rodando em segundo plano.*</strong>
  
  1. Instale as dependências do projeto:
  
  ```bash
    npm install
  ```
  
  2. Inicie o servidor:
  
    ```bash
      npm start
    ```
    
  3. Agora, copie as informações do arquivo .ev.example para um arquivo .env
  
  4. Feito isso, faça o reset do banco rodando o seguinte comando:
  
  ```bash
    npm run db:reset
  ```
  
  5. Pronto! A API já está pronta para uso local.
</details>
