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
      titulo,
      categoriaId,
      nivelId,
      pessoaId,
      descricao,
      ativo = true,
    } = req.body;

    const catId = validarIdInteiro(categoriaId);
    const nivId = validarIdInteiro(nivelId);
    const pesId = validarIdInteiro(pessoaId);

    if (!titulo?.trim()) return res.status(400).json({ error: "Título é obrigatório" });
    if (!descricao?.trim()) return res.status(400).json({ error: "Descrição é obrigatória" });
    if (!catId) return res.status(400).json({ error: "categoriaId inválido" });
    if (!nivId) return res.status(400).json({ error: "nivelId inválido" });
    if (!pesId) return res.status(400).json({ error: "pessoaId inválido" });

    const conhecimento = await db.create({
      data: {
        con_titulo: titulo,
        con_descricao: descricao,
        con_ativo: Boolean(ativo),

        categorias: { connect: { cat_id: catId } },
        niveis: { connect: { niv_id: nivId } },
        pessoas: { connect: { pes_id: pesId } },
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
    if (!id) return res.status(400).json({ error: "ID inválido" });

    const { titulo, categoriaId, nivelId, pessoaId, descricao, ativo } = req.body;

    const catId = validarIdInteiro(categoriaId);
    const nivId = validarIdInteiro(nivelId);
    const pesId = validarIdInteiro(pessoaId);

    const conhecimento = await db.update({
      where: { [idModelo]: id },
      data: {
        ...(titulo !== undefined ? { con_titulo: titulo } : {}),
        ...(descricao !== undefined ? { con_descricao: descricao } : {}),
        ...(ativo !== undefined ? { con_ativo: Boolean(ativo) } : {}),

        ...(catId ? { categorias: { connect: { cat_id: catId } } } : {}),
        ...(nivId ? { niveis: { connect: { niv_id: nivId } } } : {}),
        ...(pesId ? { pessoas: { connect: { pes_id: pesId } } } : {}),
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
