import prisma from "../database/PrismaClient.js";


export class CategoriasController {
    async findCategorias(req, res)  {
    try {
        const categoria = await prisma.categorias.findMany();
        return res.status(200).json(categoria);   
    } catch (error) {
        console.log(error);
        return res.status(500).send();
        //return res.status(500).json({ Erro: "Erro ao buscar categoria"})
    }
}

    async createCategorias(req, res) {
    try {
        const {cat_nome} = req.body;

        if (!cat_nome){
            return res.status(400).json({Error:"Nome da categoria é obrigatório"});
        }

        const categoria = await prisma.categorias.create({
            data: {
                cat_nome
            }
        })

        return res.status(201).json(categoria);
    } catch (error) {
        console.log(error); 
            return res.status(500).json({error: "Erro ao criar categoria"})
        
    }
}

    async updateCategorias(req, res)  {
    const { id } = req.params;
    const { cat_nome } = req.body;
    try {
        const categoriaAtualizada = await prisma.categorias.update({
            where: { cat_id: parseInt(id) },
            data: { cat_nome }
        });
        return res.status(200).json(categoriaAtualizada);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao atualizar categoria" });
    }
}


async deleteCategorias(req, res) {
    const {id} = req.params;// nesta linha busca-se parametros dentro do 'request' que tenha o nome 'id'.
    try {
    const categoria = await prisma.categorias.findUnique({
        where: { cat_id: Number(id) }
    });

    if(!categoria){
        return res.status(404).json("User not found")
    }
    
    await prisma.categorias.delete({
        where: { cat_id: Number(id) }
    })
    return res.status(204).send();
} catch (error){
    console.error(error);
    return res.status(500).send();
}
}

}




