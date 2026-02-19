import express from 'express';
import pessoasRoutes from './routes/pessoas.routes.js';

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Rotas
app.use('/pessoas', pessoasRoutes); // Rota para pessoas

app.get('/', (req, res) => {
    res.send('API funcionando!');
});


// porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});