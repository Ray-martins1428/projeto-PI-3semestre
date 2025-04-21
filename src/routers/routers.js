const express = require('express')
const router = express.Router()
const {router} = require('../api')

// ----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS-----------------

const produtosControllers = require('../controllers/produtosControllers')

router.get('/produtos', produtosControllers.listAll)
router.get('/produtos/:id', produtosControllers.findById)

router.post('/produtos', produtosControllers.new)

router.put('/produtos/:id', produtosControllers.editProduto)
router.delete('/produtos/:id', produtosControllers.remove)

// ----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS-----------------

const usuariosControllers = require('../controllers/usuariosControllers')

router.get('/usuarios', usuariosControllers.listAll)
router.get('/usuarios/:id', usuariosControllers.findById)

router.post('/usuarios', usuariosControllers.new)

router.put('/usuarios/:id', usuariosControllers.editUsuario)
router.delete('/usuarios/:id', usuariosControllers.remove)

// ----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS-----------------

const mesasControllers = require('../controllers/mesasControllers')

router.get('/mesas', mesasControllers.listAll)
router.get('/mesas/:id', mesasControllers.findById)

router.post('/mesas', mesasControllers.new)

router.put('/mesas/:id', mesasControllers.editMesa)
router.delete('/mesas/:id', mesasControllers.remove)

// -----------------------------------------------------------------------------

module.exports = router