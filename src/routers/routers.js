const express = require('express')

const router = express.Router()

const ListAllUser = require('../controllers/users/listall_users')

router.get('/users', ListAllUser.listAll)

module.exports = router