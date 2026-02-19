# Usando o Prisma ORM com Postgres

1. Pra gerar o schema do Prisma a partir do Postgres atual.

```
npm i prisma @prisma/client
npx prisma init
```

2. Configurar o .env com a conexão do banco:

```
DATABASE_URL="postgresql://user:senha@host:5432/banco_de_dados?schema=public"
```

3. 'Puxar' o schema do banco existente:

```
npx prisma db pull
```

4. Gerar o client:

```
npx prisma generate
```

5. Criar uma baseline migration (pra o Prisma saber que aquele estado já existe):

```
npx prisma migrate
```
