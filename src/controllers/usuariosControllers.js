const usuarios = require('../models/usuarios')

class usuariosControllers {
    async listAll (req, res) {
        let result = await usuarios.findAll()

        !result.validated
        ?res.status(404).json({success:false, error: result.error})
        :res.status(200).json({success:true, values: result.values})
    }

    async findById(req, res) {
        const id = req.params.id
        const result = await usuarios.findById(id)
        !result.validated
            ? res.status(404).json({ success: false, error: result.error })
            : res.status(200).json({ success: true, values: result.values })
    }

    async new(req, res){
        let {login, senha, status} = req.body
        
        let result = await usuarios.create(login, senha, status)

        result.validated
        ? res.status(201).json({sucess: true, message:'Usuário cadastrado com sucesso.'})
        : res.status(404).json({sucess: false, message: result.error})
    }
}

module.exports = new usuariosControllers()