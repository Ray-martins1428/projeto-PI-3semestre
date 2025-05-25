require('dotenv').config();
const usuarios = require('../models/usuarios');
const comparePasswordService = require('../services/compare_password_service');
const jwt = require('jsonwebtoken');

class LoginController {
    async login(req, res){
        const { login, senha } = req.body;
        const usuario = await usuarios.findByLogin(login);

        if (usuario.values != undefined) {
            let senhaValida = comparePasswordService(senha, usuario.values.password_hash)
            if(!senhaValida){
               res.status(406).json({success: false, message:"Senha Invalida"})
            }else{
               let token = jwt.sign({login: usuario.values.email, role: usuario.values.role_id},process.env.SECRET,{expiresIn: 5000}) 
               res.status(200).json({success: true, token: token})
            }
        }else{
            usuario.values == undefined
            ? res.status(406).json({success: false, message:'Login não encontrado'})
            : res.status(404).json({success: false, message: usuario.error})
        }
    }
}

module.exports = new LoginController();
