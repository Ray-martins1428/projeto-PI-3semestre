const mesas = require('../models/mesas')

class mesasControllers {
    async listAll(req, res) {
        let result = await mesas.findAll()

        !result.validated
            ? res.status(404).json({ success: false, error: result.error })
            : res.status(200).json({ success: true, values: result.values })
    }
    
// -----------------------------------------------------------------------------

    async findById(req, res) {
        const id = req.params.id
        const result = await mesas.findById(id)
        !result.validated
            ? res.status(404).json({ success: false, error: result.error })
            : res.status(200).json({ success: true, values: result.values })
    }

// -----------------------------------------------------------------------------

    async new(req, res){
        let {descricao, ocupada, status} = req.body
        
        let result = await produtos.create(descricao, ocupada, status)

        result.validated
        ? res.status(201).json({sucess: true, message:'Produto cadastrado com sucesso.'})
        : res.status(404).json({sucess: false, message: result.error})
    }

// -----------------------------------------------------------------------------

}

module.exports = new mesasControllers()