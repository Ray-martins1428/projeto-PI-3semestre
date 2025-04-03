const express = require('express')

const router = express.Router()
const produtosControllers =  require('../controllers/produtosControllers')
router.get('/produtos', produtosControllers.listAll)

const usuariosControllers = require('../controllers/usuariosControllers')
router.get('/usuarios', usuariosControllers.listAll)

const mesasControllers = require('../controllers/mesasControllers')
router.get('/mesas', mesasControllers.listAll)

//const ListAllUser = require('../controllers/users/listall_users')

//router.get('/users', ListAllUser.listAll)

module.exports = router

// colocando comentário pra fazer commit 