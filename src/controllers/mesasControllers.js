const mesas = require('../models/mesas')

class mesasControllers {
    async listAll(req, res) {
        let result = await mesas.findAll()

        !result.validated
            ? res.status(404).json({ success: false, error: result.error })
            : res.status(200).json({ success: true, values: result.values })
    }
    
// ----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID-----------------

    async findById(req, res) {
        const id = req.params.id
        const result = await mesas.findById(id)
        !result.validated
            ? res.status(404).json({ success: false, error: result.error })
            : res.status(200).json({ success: true, values: result.values })
    }

// ----------NEW----------NEW----------NEW----------NEW----------NEW----------NEW-----------------

    async new(req, res){
        let {descricao, ocupada, status} = req.body
        
        let result = await produtos.create(descricao, ocupada, status)

        result.validated
        ? res.status(201).json({sucess: true, message:'Produto cadastrado com sucesso.'})
        : res.status(404).json({sucess: false, message: result.error})
    }

// ----------EDIT----------EDIT----------EDIT----------EDIT----------EDIT----------EDIT-----------------

    async editMesa(req, res){
        let id = req.params.id
        let {descricao, status} = req.body
        if(isNaN(id)){
            res.status(404).json({success: false, message: "Parametro inválido"})
        } else{
            let result = await mesas.update(descricao, status)
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
            let result = await mesas.delete(id)
            result.validated
            ? res.status(200).json ({success: true, message: result.message})
            : res.status(406).json ({success: false, message: result.error}) 
        }
    }

// ----------ADD_PRODUTO_MESA----------ADD_PRODUTO_MESA----------ADD_PRODUTO_MESA----------ADD_PRODUTO_MESA----------ADD_PRODUTO_MESA----------ADD_PRODUTO_MESA-----------------

    async adicionarProdutosNaMesa(req, res) {
        const idMesa = parseInt(req.params.id);
        const { produtos } = req.body;

        if (isNaN(idMesa)) {
            return res.status(400).json({ success: false, message: "ID de mesa inválido." });
        }

        if (!Array.isArray(produtos) || produtos.length === 0) {
            return res.status(400).json({ success: false, message: "Produtos inválidos." });
        }

        const result = await mesas.adicionarProdutosNaMesa(idMesa, produtos);

        if (!result.validated) {
            return res.status(500).json({ success: false, message: result.error });
        }

        return res.status(200).json({ success: true, message: result.message });
    }

// ----------LISTAR_PRODUTO_MESA----------LISTAR_PRODUTO_MESA----------LISTAR_PRODUTO_MESA----------LISTAR_PRODUTO_MESA----------LISTAR_PRODUTO_MESA----------LISTAR_PRODUTO_MESA-----------------

    async listarProdutosDaMesa(req, res) {
        const idMesa = parseInt(req.params.id);

        if (isNaN(idMesa)) {
            return res.status(400).json({ success: false, message: "ID da mesa inválido." });
        }

        const result = await mesas.listarProdutosDaMesa(idMesa);

        if (!result.validated) {
            return res.status(500).json({ success: false, message: result.error });
        }

        return res.status(200).json({ success: true, produtos: result.values });
    }

// ----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA-----------------

    async removerProdutoDaMesa(req, res) {
        const idMesa = parseInt(req.params.id);
        const idProduto = parseInt(req.params.id_produto);

        if (isNaN(idMesa) || isNaN(idProduto)) {
            return res.status(400).json({ success: false, message: "Parâmetros inválidos." });
        }

        const result = await mesas.removerProdutoDaMesa(idMesa, idProduto);

        if (!result.validated) {
            return res.status(404).json({ success: false, message: result.error });
        }

        return res.status(200).json({ success: true, message: result.message });
    }

// ----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA-----------------

    async fecharMesa(req, res) {
        const idMesa = parseInt(req.params.id);

        if (isNaN(idMesa)) {
            return res.status(400).json({ success: false, message: "ID da mesa inválido." });
        }

        const result = await mesas.fecharMesa(idMesa);

        if (!result.validated) {
            return res.status(400).json({ success: false, message: result.error });
        }

        return res.status(200).json({ success: true, message: result.message });
    }


}

module.exports = new mesasControllers()