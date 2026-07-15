# GitHub Explorer

Aplicação Angular para buscar usuários do GitHub e visualizar os repositórios públicos deles em uma interface simples e responsiva.

## O que a aplicação faz

Com o GitHub Explorer, você pode:

- buscar um usuário do GitHub pelo nome de usuário;
- visualizar informações básicas do perfil, como nome, bio, seguidores e repositórios públicos;
- listar os repositórios mais recentes do usuário;
- ver detalhes como descrição, linguagem, estrelas, forks e data de atualização;
- alternar entre tema claro e escuro.

## Tecnologias utilizadas

- Angular 20
- Angular Material
- RxJS
- TypeScript
- GitHub REST API

## Como executar localmente

### Pré-requisitos

- Node.js 18+ 
- npm

### Instalação

```bash
npm install
```

### Iniciar o projeto

```bash
npm start
```

A aplicação ficará disponível em `http://localhost:4200/`.

## Scripts disponíveis

```bash
npm start      # inicia o servidor de desenvolvimento
npm run build  # gera a build de produção
npm test       # executa os testes unitários
```

## Estrutura do projeto

- `src/app/components/search-users` — componente principal da interface de busca
- `src/app/services` — serviços para comunicação com a API do GitHub
- `src/app/interfaces` — modelos TypeScript das respostas da API

## Observações

- A aplicação consome a API pública do GitHub, então o uso depende das limitações de taxa da API.
- Atualmente, a interface exibe dados públicos de usuários e repositórios.

## Próximos passos

Possíveis melhorias futuras incluem:

- paginação de resultados;
- busca por nome real ou nome de usuário;
- suporte a repositórios privados quando houver autenticação;
- filtros por linguagem, estrelas e visibilidade.
