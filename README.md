
# Passos-Commerce

Um projeto para colocar em prática aprendizados e aprimorar técnicas novas, 
construindo uma loja virtual de ponta a ponta


## Screenshots

![App Screenshot](https://media.discordapp.net/attachments/668834854376439844/1008484082470105188/unknown.png?width=1386&height=671)

![App Screenshot](https://media.discordapp.net/attachments/668834854376439844/1008484135460946011/unknown.png?width=1382&height=671)

![App Screenshot](https://media.discordapp.net/attachments/668834854376439844/1008484200653008906/unknown.png?width=1378&height=671)


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