const express = require('express')

const api = express()

const routers = require('./routers/routers')

api.use('/', routers)

//informar que API poderá utilizar url's 
api.use(express.urlencoded({extended:false}))

api.use(express.json())

module.exports = api