const produtos = require('../models/produtos')

class produtosControllers {
    async listAll (req, res) {
        let result = await produtos.findAll()

        !result.validated
        ?res.status(404).json({success:false, error: result.error})
        :res.status(200).json({success:true, values: result.values})
    }

// ----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID-----------------

    async findById(req, res) {
        const id = req.params.id
        const result = await produtos.findById(id)
        !result.validated
            ? res.status(404).json({ success: false, error: result.error })
            : res.status(200).json({ success: true, values: result.values })
    }

// ----------NEW----------NEW----------NEW----------NEW----------NEW----------NEW-----------------

    async new(req, res){
        let {nome, descricao, volume, valor} = req.body
        
        let result = await produtos.create(nome, descricao, volume, valor)

        result.validated
        ? res.status(201).json({sucess: true, message:'Produto cadastrado com sucesso.'})
        : res.status(404).json({sucess: false, message: result.error})
    }

// ----------EDIT----------EDIT----------EDIT----------EDIT----------EDIT----------EDIT-----------------

    async editProduto(req, res){
        let id = req.params
        let {nome, descricao, volume, valor} = req.body
        if(isNaN(id)){
            res.status(404).json({success: false, message: "Parametro inválido"})
        } else{
            let result = await produtos.update(id, nome, descricao, volume, valor)
            result.validated
            ? res.status(200).json ({success: true, message: result.message})
            : res.status(406).json ({success: false, message: result.error}) 
        }
    }

// ----------REMOVE----------REMOVE----------REMOVE----------REMOVE----------REMOVE----------REMOVE-----------------

        async remove(req, res){
            let id = req.params.id
            if(isNaN(id)){
                res.status(404).json({success: false, message: "Parametro inválido"})
            } else{
                let result = await produtos.delete(id)
                result.validated
                ? res.status(200).json ({success: true, message: result.message})
                : res.status(406).json ({success: false, message: result.error}) 
            }
        }

}

module.exports = new produtosControllers()