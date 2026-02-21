# Comando utilizado para gerar o JWT (MacOS)

```
openssl rand -hex 32
```

# Windows (com NODE)

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
