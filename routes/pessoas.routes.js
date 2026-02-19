import { Router } from "express";
import * as controller from "../controllers/pessoas.controller.js";

const router = Router();

// CRUD

router.get("/", controller.listar); // Listar todas as pessoas
router.get("/:id", controller.getPorId); // Obter uma pessoa por ID
router.post("/", controller.criar); // Criar uma nova pessoa
router.put("/:id", controller.atualizar); // Atualizar uma pessoa existente
router.delete("/:id", controller.deletar); // Deletar uma pessoa

export default router;