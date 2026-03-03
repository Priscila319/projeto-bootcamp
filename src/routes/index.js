import { Router } from "express";
import  { CategoriasController } from "../controllers/CategoriasController.js";
import { ConhecimentosController } from "../controllers/ConhecimentosController.js";
import { NiveisController } from "../controllers/NiveisController.js";
import { PessoasController } from "../controllers/PessoasController.js";


const router = Router();
const categoriasController = new CategoriasController();
const conhecimentosController = new ConhecimentosController();
const niveisController = new NiveisController();
const pessoasController = new PessoasController();



// ============ ROTAS DE CATEGORIAS ============

router.get('/categorias', categoriasController.findCategorias);

router.post('/categorias', categoriasController.createCategorias);

router.put('/categorias/:id', categoriasController.createCategorias);

router.delete("/categorias/:id", categoriasController.createCategorias)



// ============ ROTAS DE CONHECIMENTOS ============


router.get('/conhecimentos', conhecimentosController.findConhecimentos);

router.post('/conhecimentos', conhecimentosController.createConhecimentos)

router.put('/conhecimentos/:id', conhecimentosController.updateConhecimentos);

router.delete('/conhecimentos/:id', conhecimentosController.deleteConhecimentos);



// ============ ROTAS DE NÍVEIS ============


router.get('/niveis', niveisController.findNiveis);

router.post('/niveis', niveisController.createNiveis);




// ============ ROTAS DE PESSOAS ============


router.get('/pessoas', pessoasController.findPessoas);

router.post('/pessoas', pessoasController.createPessoas);

router.put('/pessoas/:id', pessoasController.updatePessoas);

router.delete('/pessoas/:id', pessoasController.deletePessoas);

export default router;