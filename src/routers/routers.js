const express = require('express')
const router = express.Router()


const Auth = require('../middleware/auth_usuario_middleware')
const authAdmin = require('../middleware/auth_admin_milddleware')

// ----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS----------ROTAS_PRODUTOS-----------------

const produtosControllers = require('../controllers/produtosControllers')

router.get('/produtos', produtosControllers.listAll)
router.get('/produtos/:id', produtosControllers.findById)

router.post('/produtos', produtosControllers.new)

router.put('/produtos/:id', produtosControllers.editProduto)
router.delete('/produtos/:id', produtosControllers.remove)

// ----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS----------ROTAS_USUARIOS-----------------

const usuariosControllers = require('../controllers/usuariosControllers')

router.get('/usuarios', Auth, usuariosControllers.listAll)
router.get('/usuarios/:id', Auth, usuariosControllers.findById)
router.get('/usuarios/login/:login', Auth, usuariosControllers.findByLogin)


router.post('/usuarios', Auth, usuariosControllers.new)


router.put('/usuarios/:id', Auth, usuariosControllers.editUsuario)
router.delete('/usuarios/:id', Auth, usuariosControllers.remove)

// ----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS----------ROTAS_MESAS-----------------

const mesasControllers = require('../controllers/mesasControllers')

router.get('/mesas', mesasControllers.listAll)
router.get('/mesas/:id', mesasControllers.findById)

router.post('/mesas', mesasControllers.new)

router.put('/mesas/:id', mesasControllers.editMesa)
router.delete('/mesas/:id', mesasControllers.remove)

// -----------------------------------------------------------------------------

router.post('/login', LoginController.login)

module.exports = router