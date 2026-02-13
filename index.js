import express, { request as req, response as res, response } from "express";
import prisma from ''

const app = express();
app.use(express.json());

app.get('/pessoas', async (req, res) => {
    try {
        // const pessoas = 
    } catch (error) {
        console.log(error);
        return response.status(500).send();
    }
});