const express = require('express')
const categoriaControler = require("../controller/categoria_controller");

const router = express.Router();

router.get('/',categoriaControler.listar)
router.post('/', categoriaControler.inserir)
router.get('/:id', categoriaControler.buscarPorId)
router.put('/:id', categoriaControler.atualizar)
router.delete('/:id', categoriaControler.deletar)

module.exports = router;