const express = require('express')
const router = express.Router()



const produtosControllers = require('../controllers/produtosControllers')
router.get('/produtos', produtosControllers.listAll)
router.get('/produtos/:id', produtosControllers.findById)
router.post('/produtos', produtosControllers.new)


const usuariosControllers = require('../controllers/usuariosControllers')
router.get('/usuarios', usuariosControllers.listAll)
router.get('/usuarios/:id', usuariosControllers.findById)
router.post('/usuarios', usuariosControllers.new)


const mesasControllers = require('../controllers/mesasControllers')
router.get('/mesas', mesasControllers.listAll)
router.get('/mesas/:id', mesasControllers.findById)



module.exports = router