import { Router } from "express";
import { autenticar } from '../middlewares/auth.js';
import * as controller from "../controllers/pessoas.controller.js";

const router = Router();

// CRUD

router.get("/", autenticar, controller.listar); // Listar todas as pessoas
router.get("/:id", autenticar, controller.getPorId); // Obter uma pessoa por ID
router.post("/", controller.criar); // Criar uma nova pessoa
router.put("/:id", autenticar, controller.atualizar); // Atualizar uma pessoa existente
router.delete("/:id", autenticar, controller.deletar); // Deletar uma pessoa

export default router;