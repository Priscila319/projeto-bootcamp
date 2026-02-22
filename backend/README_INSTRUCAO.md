# Comando utilizado para gerar o JWT (MacOS)

```
openssl rand -hex 32
```

# Windows (com NODE)

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

# Estrutura para o .env (Backend)

```
DATABASE_URL="postgresql://usuario:senha@host:porta/nome_banco_dados?schema=public"
FRONTEND_URL_LOCALHOST=http://host_frontend:porta
FRONTEND_URL=http://192.168.2.103:3000
JWT_SECRETO=jwt_gerado_anteriormente
PORT=porta_backend
```
