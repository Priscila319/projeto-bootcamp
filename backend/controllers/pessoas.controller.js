import { prisma } from "../lib/prisma.js";
import { validarIdInteiro, handlePrismaError } from "../utils/controllerHelpers.js";
import bcrypt from "bcrypt";

const nomeModelo = "pessoas";
const idModelo = "pes_id";

const db = prisma[nomeModelo];

const pessoaSelect = {
  pes_id: true,
  pes_nome: true,
  pes_email: true,
  pes_telefone: true,
  pes_descricao: true,
  pes_login: true,
  pes_criado_em: true,
}; // sem senha para não vazar


export async function listar(req, res) {
  try {
    const pessoas = await db.findMany({
      select: pessoaSelect,
    });

    return res.status(200).json(pessoas);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function getPorId(req, res) {
  try {
    const id = validarIdInteiro(req.params.id);
    if (id === null)
      return res.status(400).json({ error: "ID inválido" });

    const pessoa = await db.findUnique({
      where: { [idModelo]: id },
      select: pessoaSelect,
    });

    if (!pessoa)
      return res.status(404).json({ error: "Pessoa não encontrada" });

    return res.status(200).json(pessoa);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function criar(req, res) {
  try {
    const { nome, email, telefone, descricao, login, senha } = req.body;

    if (!nome || !email || !telefone || !login || !senha) {
      return res.status(400).json({
        error: "Todos os campos são obrigatórios",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novaPessoa = await db.create({
      data: {
        pes_nome: nome,
        pes_email: email,
        pes_telefone: telefone,
        pes_descricao: descricao ?? "",
        pes_login: login,
        pes_senha: senhaHash,
      },
      select: pessoaSelect,
    });

    return res.status(201).json(novaPessoa);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}


export async function atualizar(req, res) {
  try {
    const id = validarIdInteiro(req.params.id);
    if (id === null)
      return res.status(400).json({ error: "ID inválido" });

    const { nome, email, telefone, descricao, login, senha } = req.body;

    if (!nome || !email || !telefone || !login) {
      return res.status(400).json({
        error: "Campos obrigatórios: nome, email, telefone, descricao, login",
      });
    }

    const pessoaExistente = await db.findUnique({
      where: { [idModelo]: id },
    });

    if (!pessoaExistente)
      return res.status(404).json({ error: "Pessoa não encontrada" });

    const data = {
      pes_nome: nome,
      pes_email: email,
      pes_telefone: telefone,
      pes_descricao: descricao ?? "",
      pes_login: login,
    };

    if (typeof senha === "string" && senha.trim().length > 0) {
      data.pes_senha = await bcrypt.hash(senha, 10);
    }

    const pessoaAtualizada = await db.update({
      where: { [idModelo]: id },
      data,
      select: pessoaSelect,
    });

    return res.status(200).json(pessoaAtualizada);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function deletar(req, res) {
  try {
    const id = validarIdInteiro(req.params.id);
    if (id === null)
      return res.status(400).json({ error: "ID inválido" });

    const pessoaExistente = await db.findUnique({
      where: { [idModelo]: id },
    });

    if (!pessoaExistente)
      return res.status(404).json({ error: "Pessoa não encontrada" });

    await db.delete({
      where: { [idModelo]: id },
    });

    return res.status(204).send();
  } catch (error) {
    return handlePrismaError(error, res);
  }
}