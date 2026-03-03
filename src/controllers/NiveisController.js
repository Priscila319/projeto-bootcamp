import prisma from "../database/PrismaClient.js";

export class NiveisController {
    async findNiveis(req, res)  {
    try {
        const nivel = await prisma.niveis.findMany();
        return res.status(200).json(nivel);   
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}

async createNiveis(req, res)  {
    try {
        const { niv_nome } = req.body;
        
        if (!niv_nome) {
            return res.status(400).json({ erro: "Nome do nível é obrigatório" });
        }
        
        const nivel = await prisma.niveis.create({
            data: {
                niv_nome
            }
        });
        
        return res.status(201).json(nivel);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ erro: "Erro ao criar nível" });
    }
}

}