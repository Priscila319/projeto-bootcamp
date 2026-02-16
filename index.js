import express, { request as req, response as res, response } from "express"
import prisma from "./PrismaClient.js"

const app = express();
app.use(express.json())

 
app.get('/categorias', async (req, res) => {
    try {
        const categoria = await prisma.categorias.findMany();
        return res.status(200).json(categoria);   
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.get('/conhecimentos', async (req, res) => {
    try {
        const conhecimento = await prisma.conhecimentos.findMany();
        return res.status(200).json(conhecimento);   
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.get('/niveis', async (req, res) => {
    try {
        const nivel = await prisma.niveis.findMany();
        return res.status(200).json(nivel);   
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.get('/pessoas', async (req, res) => {
    try {
        const pessoa = await prisma.pessoas.findMany();
        return res.status(200).json(pessoa);   
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.listen(8080, () => {
    console.log("Running on port 8080")
})