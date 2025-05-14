const usuariosModel = require('../models/usuarios');
const comparePasswordService = require('../services/compare_password_service');

class LoginController {
    async login(req, res){
        const { login, senha } = req.body;
        const usuario = await usuariosModel.findByLogin(login);

        if (!usuario) {
            return res.status(404).json({ success: false, message: "Login inválido!" });
        }

        const passValidated = comparePasswordService(senha, usuario.password_hash);
        if (!passValidated) {
            return res.status(406).json({ success: false, message: "Senha inválida!" });
        }

        return res.status(200).json({ success: true, message: 'OK' });
    }
}

module.exports = new LoginController();
