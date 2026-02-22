import jwt from 'jsonwebtoken';

export function autenticar(req, res, next) {
  const token = req.cookies?.autenticacaoToken;
  if (!token) return res.status(401).json({ error: "Token de autenticação não fornecido" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETO);
    req.usuario = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token de autenticação inválido" });
  }
}