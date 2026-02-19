import { prisma } from "../lib/prisma";

const nomeModelo = "pessoas";
const idModelo = "pes_id";

const db = prisma[nomeModelo];

// validar se o id for int
function validarId(id) {
  const n = Number(id);
  if (!Number.isInteger(n)) return null;
  return n;
}

// lidar com error do prisma (falta colocar mais erros)
function handlePrismaError(error, res) {
  if (error.code === "P2025") {
    return res.status(404).json({ error: "Registro não encontrado" });
  }
  else if (error.code === "P2002") {
    return res.status(400).json({ error: "Registro já existe" });
  }
  else if (error.code === "P2003") {
    return res.status(400).json({ error: "Chave estrangeira inválida" });
  }
  else if (error.code === "P2004") {
    return res.status(400).json({ error: "Violação de restrição de banco de dados" });
  }
  else if (error.code === "P2005") {
    return res.status(400).json({ error: "Valor inválido para o campo" });
  }
  console.error(error);
  return res.status(500).json({ error: "Erro interno do servidor" });
}

export async function listar(req, res) {
  try {
    const pessoas = await db.findMany();
    return res.status(200).json(pessoas);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function getPorId(req, res) {
  try {
    const id = validarId(req.params.id);
    if (id === null) return res.status(400).json({ error: "ID inválido" });

    const pessoa = await db.findUnique({
      where: { [idModelo]: id },
    });

    if (!pessoa) return res.status(404).json({ error: "Pessoa não encontrada" });
    return res.status(200).json(pessoa);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function criar(req, res) {
  try {
    const
  } catch (error) {

  }
}