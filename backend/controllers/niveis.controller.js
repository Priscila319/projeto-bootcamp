import { prisma } from "../lib/prisma.js";
import { validarIdInteiro, handlePrismaError } from "../utils/controllerHelpers.js";

const nomeModelo = "niveis";
const idModelo = "niv_id";

const db = prisma[nomeModelo];

export async function listar(req, res) {
  try {
    const nivel = await db.findMany();
    return res.status(200).json(nivel);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function getPorId(req, res) {
  try {
    const id = validarIdInteiro(req.params.id);
    if (id === null) return res.status(400).json({ error: "ID inválido" });

    const nivel = await db.findUnique({
      where: { [idModelo]: id },
    });

    if (!nivel) return res.status(404).json({ error: "Nível não encontrado" });
    return res.status(200).json(nivel);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function criar(req, res) {
  try {
    const { nome } = req.body;

    const novoNivel = await db.create({
      data: {
        niv_nome: nome
      },
    });

    return res.status(201).json(novoNivel);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function atualizar(req, res) {
  try {
    const id = validarIdInteiro(req.params.id);
    if (id === null) return res.status(400).json({ error: "ID inválido" });

    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ error: "O campo nome é obrigatório" });
    }

    const nivelExistente = await db.findUnique({
      where: { [idModelo]: id },
    });
    if (!nivelExistente) return res.status(404).json({ error: "Nível não encontrado" });

    const nivelAtualizado = await db.update({
      where: { [idModelo]: id },
      data: {
        niv_nome: nome
      },
    });

    return res.status(200).json(nivelAtualizado);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function deletar(req, res) {
  try {
    const id = validarIdInteiro(req.params.id);
    if (id === null) return res.status(400).json({ error: "ID inválido" });

    const nivelExistente = await db.findUnique({
      where: { [idModelo]: id },
    });
    if (!nivelExistente) return res.status(404).json({ error: "Nível não encontrado" });

    await db.delete({
      where: { [idModelo]: id },
    });
    return res.status(204).send();

  } catch (error) {
    return handlePrismaError(error, res);
  }
}