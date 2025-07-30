# Gentleman Store

Este projeto foi desenvolvido como parte da avaliação do programa **+Devs2Blu**, conforme solicitado pelo professor Ralph Lima.

## Sobre

O objetivo do projeto é criar uma loja virtual simples utilizando **apenas HTML, CSS, JavaScript e Node.js**, 
seguindo rigorosamente as instruções fornecidas. Não foi permitido o uso de frameworks ou bibliotecas externas além do Node.js puro para o backend.

Todas as regras e requisitos da atividade estão detalhados no arquivo [`instructions.md`](./instructions.md).

## Como executar

1. Instale o Node.js em sua máquina.
2. Execute o servidor com o comando:
    ```bash
    npm run start
    ```
3. Acesse a aplicação em [http://localhost:3000](http://localhost:3000) no seu navegador.

## Endpoints da API

- `GET /api/produtos`
  Retorna todos os produtos cadastrados.

- `GET /api/produtos/categoria/:categoria`
  Retorna produtos filtrados por categoria (`terno`, `cinto`, `sapato`, etc).
  Exemplo: `/api/produtos/categoria/terno`

- `GET /api/produtos/search/:term`
  Retorna produtos cujo nome contém o termo pesquisado.
  Exemplo: `/api/produtos/search/sapato`


## Observações

- O projeto não utiliza nenhum framework front-end ou back-end.
- Todo o código foi escrito conforme as orientações da atividade.
- Para mais detalhes sobre os requisitos, consulte o arquivo