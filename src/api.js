const express = require('express')
const api = express()
const routers = require('./routers/routers')

// -----------------------------------------------------------------------------

// importação pacote-local para poder testar o html localmente
const cors = require('cors');
api.use(cors());

// -----------------------------------------------------------------------------

api.use(express.urlencoded({extended:false}))
api.use(express.json())
api.use('/', routers)

// -----------------------------------------------------------------------------

module.exports = api