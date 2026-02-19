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

    if (!conhecimento) return res.status(404).json({ error: "Conhecimento não encontrado" });
    return res.status(200).json(conhecimento);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function criar(req, res) {
  try {
    const { categoria_id, nivel_id, pessoa_id } = req.body;
    const conhecimento = await db.create({
      data: {
        categoria_id,
        nivel_id,
        pessoa_id
      }
    });
    return res.status(201).json(conhecimento);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}