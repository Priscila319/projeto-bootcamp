import { prisma } from "../lib/prisma.js";
import { validarIdInteiro, handlePrismaError } from "../utils/controllerHelpers.js";

const nomeModelo = "categorias";
const idModelo = "cat_id";

const db = prisma[nomeModelo];

export async function listar(req, res) {
  try {
    const categorias = await db.findMany();
    return res.status(200).json(categorias);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function getPorId(req, res) {
  try {
    const id = validarIdInteiro(req.params.id);
    if (id === null) return res.status(400).json({ error: "ID inválido" });

    const categoria = await db.findUnique({
      where: { [idModelo]: id },
    });

    if (!categoria)
      return res.status(404).json({ error: "Categoria não encontrada" });

    return res.status(200).json(categoria);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function criar(req, res) {
  try {
    const {
      cat_nome
    } = req.body;

    const categoria = await db.create({
      data: {
        cat_nome
      },
    });

    return res.status(201).json(categoria);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function atualizar(req, res) {
  try {
    const id = validarIdInteiro(req.params.id);
    if (id === null) return res.status(400).json({ error: "ID inválido" });

    const {
      cat_nome
    } = req.body;

    const categoria = await db.update({
      where: { [idModelo]: id },
      data: {
        cat_nome
      },
    });

    return res.status(200).json(categoria);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function deletar(req, res) {
  try {
    const id = validarIdInteiro(req.params.id);
    if (id === null) return res.status(400).json({ error: "ID inválido" });

    await db.delete({
      where: { [idModelo]: id },
    });

    return res.status(204).send();
  } catch (error) {
    return handlePrismaError(error, res);
  }
}
