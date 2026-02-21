import express from 'express';
import cors from 'cors';
import pessoasRoutes from './routes/pessoas.routes.js';
import niveisRoutes from './routes/niveis.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import conhecimentosRoutes from './routes/conhecimentos.routes.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import { autenticar } from './middlewares/auth.js';

const app = express();
app.use(express.json()); // Middleware para parsear JSON
// fix: permitir requisições do frontend
app.use(cors({
    origin: [
        process.env.FRONTEND_URL_LOCALHOST,
        process.env.FRONTEND_URL,
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(cookieParser()); // Middleware para parsear cookies


// Rotas
app.use('/pessoas', autenticar, pessoasRoutes); // Rota para pessoas
app.use('/niveis', autenticar, niveisRoutes); // Rota para niveis
app.use('/categorias', autenticar, categoriasRoutes); // Rota para categorias
app.use('/conhecimentos', autenticar, conhecimentosRoutes); // Rota para conhecimentos
app.use('/auth', authRoutes); // Rota para autenticação
app.get('/', (req, res) => {
    res.send('API funcionando!');
});


// porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});