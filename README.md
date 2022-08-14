
# Passos-Commerce

Um projeto para colocar em prática aprendizados e aprimorar técnicas novas, 
construindo uma loja virtual de ponta a ponta


## Screenshots

![App Screenshot](https://prnt.sc/fWviSfHxsWYN)

![App Screenshot](https://prnt.sc/SvWFcNFiabLU)

![App Screenshot](https://prnt.sc/7qfHmGOK9_Eq)


## Funcionalidades

- Autenticação
- Gerenciamento de permissões
- Manipulação de cookies
- Consumo de API
- Responsivo
- Server side rendering
- Static site generation
- Pagamento


## Stack utilizada

**Front-end:** Next.js, Chakra UI, Axios, Nookies, Formik, Yup

**Back-end:** Node, Express, Prisma, JWT, Cors


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Gabriel-Passoss/passos-commerce
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências gerais

```bash
  yarn
```

Instale as dependências da web

```bash
  cd packages/web
  yarn
```

Instale as dependências do servidor

```bash
   cd packages/server
   yarn
```

Inicie o servidor

```bash
  cd packages/server
  yarn dev
```

Inicie o Next

```bash
  cd packages/web
  yarn dev
```