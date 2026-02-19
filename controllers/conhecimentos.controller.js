import { prisma } from "../lib/prisma.js";
import { validarIdInteiro, handlePrismaError } from "../utils/controllerHelpers.js";

const nomeModelo = "conhecimentos";
const idModelo = "con_id";

const db = prisma[nomeModelo];

export async function listar(req, res) {
  try {
    const conhecimentos = await db.findMany();
    return res.status(200).json(conhecimentos);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function getPorId(req, res) {
  try {
    const id = validarIdInteiro(req.params.id);
    if (id === null) return res.status(400).json({ error: "ID inválido" });

    const conhecimento = await db.findUnique({
      where: { [idModelo]: id },
    });

    if (!conhecimento)
      return res.status(404).json({ error: "Conhecimento não encontrado" });

    return res.status(200).json(conhecimento);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function criar(req, res) {
  try {
    const {
      con_titulo,
      con_categoria_id,
      con_nivel_id,
      con_pessoa_id,
      con_descricao,
      con_ativo,
    } = req.body;

    const conhecimento = await db.create({
      data: {
        con_titulo,
        con_categoria_id,
        con_nivel_id,
        con_pessoa_id,
        con_descricao,
        con_ativo,
      },
    });

    return res.status(201).json(conhecimento);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function atualizar(req, res) {
  try {
    const id = validarIdInteiro(req.params.id);
    if (id === null) return res.status(400).json({ error: "ID inválido" });

    const {
      con_titulo,
      con_categoria_id,
      con_nivel_id,
      con_pessoa_id,
      con_descricao,
      con_ativo,
    } = req.body;

    const conhecimento = await db.update({
      where: { [idModelo]: id },
      data: {
        con_titulo,
        con_categoria_id,
        con_nivel_id,
        con_pessoa_id,
        con_descricao,
        con_ativo,
      },
    });

    return res.status(200).json(conhecimento);
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
