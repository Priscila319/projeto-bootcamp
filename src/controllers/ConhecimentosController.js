import prisma from "../database/PrismaClient.js";

export class ConhecimentosController {
    async findConhecimentos(req, res)  {
    try {
        const conhecimento = await prisma.conhecimentos.findMany({
            include: {
                categorias: true,
                niveis: true,
                pessoas: true
            }
        });
        return res.status(200).json(conhecimento);   
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
}

async createConhecimentos(req, res)  {
    try {
        const { con_titulo, con_descricao, con_categoria_id, con_nivel_id, con_pessoa_id } = req.body;
    
        if (!con_titulo || !con_descricao || !con_categoria_id || !con_nivel_id || !con_pessoa_id) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios"});
        }
        const conhecimento = await prisma.conhecimentos.create({
                data: {
                con_titulo,
                con_descricao,
                con_categoria_id: parseInt(con_categoria_id),
                con_nivel_id: parseInt(con_nivel_id),
                con_pessoa_id: parseInt(con_pessoa_id),
                con_ativo: true,
                con_criado_em: new Date()
            },
            include: {
                categorias: true,
                niveis: true,
                pessoas: true
            }
        })
        return res.status(201).json(conhecimento)
    } catch (error) {
        console.log(error);
        return res.status(500).json({erro: "Erro ao criar conhecimento"})
    }

}


async updateConhecimentos(req, res)  {
    try {
        const { id } = req.params;
        const { con_titulo, con_descricao, con_categoria_id, con_nivel_id, con_ativo } = req.body;
        
        const conhecimento = await prisma.conhecimentos.update({
            where: { con_id: parseInt(id) },
            data: {
                con_titulo,
                con_descricao,
                con_categoria_id: con_categoria_id ? parseInt(con_categoria_id) : undefined,
                con_nivel_id: con_nivel_id ? parseInt(con_nivel_id) : undefined,
                con_ativo
            },
            include: {
                categorias: true,
                niveis: true,
                pessoas: true
            }
        });
        
        return res.status(200).json(conhecimento);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ erro: "Erro ao atualizar conhecimento" });
    }
}


async deleteConhecimentos(req, res)  {
    try {
        const { id } = req.params;
        
        await prisma.conhecimentos.delete({
            where: { con_id: parseInt(id) }
        });
        
        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ erro: "Erro ao deletar conhecimento" });
    }
}

}