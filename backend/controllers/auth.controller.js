import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';

const JWT_SECRETO = process.env.JWT_SECRETO;
const NOME_COOKIE = "autenticacaoToken";

const db = prisma["pessoas"];

export async function login(req, res) {
  try {
    const { login, senha } = req.body;
    if (!login || !senha) {
      return res.status(400).json({ error: "Login e senha são obrigatórios" });
    }

    const usuario = await db.findFirst({
      where: { pes_login: login },
    })

    if (!usuario) return res.status(401).json({ error: "Usuário não encontrado" });

    const ok = await bcrypt.compare(senha, usuario.pes_senha);
    if (!ok) return res.status(401).json({ error: "Senha incorreta" });
    const token = jwt.sign({ id: usuario.pes_id, login: usuario.pes_login }, JWT_SECRETO, { expiresIn: '4h' });
    res.cookie("autenticacaoToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: false, // localhost
      path: "/",
      maxAge: 4 * 60 * 60 * 1000,
    });
    res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export function logout(req, res) {
  res.clearCookie("autenticacaoToken", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    path: "/",
  });
  return res.json({ ok: true });
}