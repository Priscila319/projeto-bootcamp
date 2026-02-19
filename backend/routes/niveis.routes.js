import { Router } from "express";
import * as controller from "../controllers/niveis.controller.js";

const router = Router();

// CRUD

router.get("/", controller.listar);
router.get("/:id", controller.getPorId);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

export default router;