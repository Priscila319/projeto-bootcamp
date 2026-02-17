import express, { request as req, response as res, response } from "express"
import prisma from "./PrismaClient.js"

const app = express();
app.use(express.json())




// ============ ROTAS DE CATEGORIAS ============

app.get('/categorias', async (req, res) => {
    try {
        const categoria = await prisma.categorias.findMany();
        return res.status(200).json(categoria);   
    } catch (error) {
        console.log(error);
        return res.status(500).send();
        //return res.status(500).json({ Erro: "Erro ao buscar categoria"})
    }
});

app.post('/categorias', async (req, res) => {
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
});

app.delete("/categorias/:id", async (req, res) => {
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
})



// ============ ROTAS DE CONHECIMENTOS ============


app.get('/conhecimentos', async (req, res) => {
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
});

app.post('/conhecimentos', async (req, res) => {
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

})

app.put('/conhecimentos/:id', async (req, res) => {
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
});

app.delete('/conhecimentos/:id', async (req, res) => {
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
});



// ============ ROTAS DE NÍVEIS ============


app.get('/niveis', async (req, res) => {
    try {
        const nivel = await prisma.niveis.findMany();
        return res.status(200).json(nivel);   
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.post('/niveis', async (req, res) => {
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
});




// ============ ROTAS DE PESSOAS ============


app.get('/pessoas', async (req, res) => {
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
});

app.post('/pessoas', async (req, res) => {
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
});


app.listen(8080, () => {
    console.log("Running on port 8080")
})