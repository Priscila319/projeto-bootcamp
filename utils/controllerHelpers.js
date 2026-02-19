// validar se o id for int
function validarIdInteiro(id) {
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