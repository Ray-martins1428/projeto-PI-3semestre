const usuarios = require('../models/usuarios')

class usuariosControllers {
    async listAll (req, res) {
        let result = await produtos.findAll()
        !result.validated
        ?res.status(404).json({success:false, error: result.error})
        :res.status(200).json({success:true, values: result.values})
    }
}

module.exports = new usuariosControllers()