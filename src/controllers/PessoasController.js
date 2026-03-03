import prisma from "../database/PrismaClient.js";

export class PessoasController{
    async findPessoas(req, res)  {
    try {
        const pessoa = await prisma.pessoas.findMany({
            include: {
                conhecimentos: true
            }
        });
        return res.status(200).json(pessoa);   
    } catch (error) {
        console.log(error);
        return res.status(500).json({ erro: "Erro ao buscar pessoas"});
    }
}

async createPessoas(req, res)  {
    try {
        const { pes_nome, pes_email, pes_telefone, pes_descricao, pes_login, pes_senha } = req.body;
        
        if (!pes_nome || !pes_email || !pes_telefone || !pes_login || !pes_senha) {
            return res.status(400).json({ erro: "Campos obrigatórios faltando" });
        }
        
        const pessoa = await prisma.pessoas.create({
            data: {
                pes_nome,
                pes_email,
                pes_telefone,
                pes_descricao,
                pes_login,
                pes_senha,
                pes_criado_em: new Date()
            }
        });
        
        return res.status(201).json(pessoa);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ erro: "Erro ao criar pessoa" });
    }
}


async updatePessoas( req, res )  {
    try {
        const { id } = req.params;
        const { pes_nome, pes_email, pes_telefone, pes_descricao, pes_login, pes_senha } = req.body;

        const pessoa = await prisma.pessoas.update({
            where: {pes_id: parseInt(id)},
            data: { pes_nome, 
                pes_email, 
                pes_telefone, 
                pes_descricao, 
                pes_login, 
                pes_senha

            }

            
        });
        return res.status(200).json(pessoa);
    }    
     catch (error) {
        console.log(error);
        return res.status(500).json({ erro: "Erro ao atualizar pessoa" });
    }
}


async deletePessoas( req, res )  {
    try {
        const { id } = req.params;

        await prisma.pessoas.delete({
            where: { pes_id: parseInt(id) }
        });

        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({erro: "Erro ao deletar pessoa"})
    }
}

}