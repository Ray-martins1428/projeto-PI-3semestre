const express = require('express')
const router = express.Router()

const produtosControllers = require('../controllers/produtosControllers')
router.get('/produtos', produtosControllers.listAll)
router.get('/produtos/:id', produtosControllers.findById)

const usuariosControllers = require('../controllers/usuariosControllers')
router.get('/usuarios', usuariosControllers.listAll)

const mesasControllers = require('../controllers/mesasControllers')
router.get('/mesas', mesasControllers.listAll)
router.get('/mesas/:id', mesasControllers.findById)

//const ListAllUser = require('../controllers/users/listall_users')

//router.get('/users', ListAllUser.listAll)

module.exports = router

// colocando comentário pra fazer commit 