require('dotenv').config()
const usuarios = require('../models/usuarios')
const comparePasswordService = require('../services/comparePasswordService')
const jwt = require('jsonwebtoken')

class LoginController {
    async login(req, res) {
        let { login, senha } = req.body

        const usuario = await usuarios.findByLogin(login)

        if (usuario.validated && usuario.values !== undefined) {
            const senhaValida = comparePasswordService(senha, usuario.values.senha)

            if (!senhaValida) {
                return res.status(401).json({ success: false, message: "Senha inválida!" })
            }

            const payload = {
                login: usuario.values.login,
                nivel: usuario.values.nivel_usuario
            }

            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' })

            return res.status(200).json({success: true,message: "Login realizado com sucesso.",token: token})
        } else {
            return res.status(406).json({success: false,message: "Login inválido!"})
        }
    }
}

module.exports = new LoginController()
