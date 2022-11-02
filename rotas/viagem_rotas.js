const express = require('express');
const viagemController = require('../controller/viagem_controller')

const router = express.Router();
//Rota do recurso: "/api/viagens"

router.get('/', viagemController.listar)
router.post('/', viagemController.inserir)
router.get('/:id', viagemController.buscarPorId)
router.put('/:id', viagemController.atualizar)
router.delete('/:id', viagemController.deletar)

module.exports = router;