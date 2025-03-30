const express = require('express')

const router = express.Router()

const produtosControllers =  require('../controllers/produtosControllers')

router.get('/produtos', produtosControllers.listAll)

//const ListAllUser = require('../controllers/users/listall_users')

//router.get('/users', ListAllUser.listAll)

module.exports = router