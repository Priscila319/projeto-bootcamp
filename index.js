import express from 'express';
import pessoasRoutes from './routes/pessoas.routes.js';
import niveisRoutes from './routes/niveis.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import conhecimentosRoutes from './routes/conhecimentos.routes.js';

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Rotas
app.use('/pessoas', pessoasRoutes); // Rota para pessoas
app.use('/niveis', niveisRoutes); // Rota para niveis
app.use('/categorias', categoriasRoutes); // Rota para categorias
app.use('/conhecimentos', conhecimentosRoutes); // Rota para conhecimentos

app.get('/', (req, res) => {
    res.send('API funcionando!');
});


// porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});