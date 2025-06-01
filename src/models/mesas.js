const knex = require('../config/data')

class Mesas {

    async findAll() {
        try {
            let mesas = await knex
                .select(['id_mesas', 'descricao', 'ocupada', 'status'])
                .table('mesas')
                .where({ status: 1 })

            return mesas.length > 0
                ? {validated: true, values: mesas}
                : {validated: true, values: undefined}

        } catch (error) {
            console.log("Erro ao executar a query", error)
            return {validated: false, error: error}
        }
    }

// ----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID-----------------

    async findById(id) {
        try {
            const mesa = await knex('mesas')
                .select(['descricao', 'ocupada', 'status'])
                .where({ id_mesas: id, status: 1 })
                .first()
            return mesa
                ? {validated: true, values: mesa}
                : {validated: true, values: undefined}
        } catch (error) {
            return {validated: false, error: error}
        }
    }

// ----------CREATE----------CREATE----------CREATE----------CREATE----------CREATE----------CREATE-----------------

    async create(descricao, ocupada, status){
        try {
            
            await knex
            .insert({descricao: descricao, ocupada: ocupada, status: status})
            .table('produtos')
            return{validated: true}

        } catch (error) {
            return {validated: false, error: error}
        }
    }

// ----------UPDATE----------UPDATE----------UPDATE----------UPDATE----------UPDATE----------UPDATE-----------------

    async update(descricao, status){
        let mesas = await this.findById(id)
        if(mesas.values != undefined){

            let editMesa = {}
            descricao != undefined ? editMesa.descricao = descricao : null
            status != undefined ? editMesa.status = status : null

            try{
                await knex
                .update(editMesa)
                .where({id_mesas:id})
                .table('mesas')
                return {validated: true, message: "Mesa editada com sucesso!"}

            } catch(error) {
                return {validated: false, error: error}
            }

        }else{
            return{validated: false, error: "Mesa não existente, portanto não pode ser editada!"}
        }
    }

// ----------DELETE----------DELETE----------DELETE----------DELETE----------DELETE----------DELETE-----------------

    async delete(id){
        let mesas = await this.findById(id)
        if (mesas.values != undefined) {

            try{
                await knex
                .delete()
                .where({id_mesas:id})
                .table('mesas')
                return {validated: true, message: "Mesa deletada com sucesso!!"}
            } catch (error) {
                return ({validated: false, error: error})
            }
        } else {
            return{validated: false, error: "Mesa não existente, portanto não pode ser editada!"} 
        }
    }

// ----------ADD_PRODUTO_MESA----------ADD_PRODUTO_MESA----------ADD_PRODUTO_MESA----------ADD_PRODUTO_MESA----------ADD_PRODUTO_MESA----------ADD_PRODUTO_MESA-----------------

    async adicionarProdutosNaMesa(id_mesa, produto) {
        if (!Array.isArray(produto) || produto.length === 0) {
            return { validated: false, error: "Lista de produtos vazia ou inválida." };
        }

        try {
            await knex.transaction(async trx => {
                for (const prod of produto) {
                    const existente = await trx('mesas_produtos')
                        .where({ id_mesa, id_produto: prod.id_produto })
                        .first();

                    if (existente) {
                        await trx('mesas_produtos')
                            .where({ id_mesa, id_produto: prod.id_produto })
                            .update({
                                quantidade: existente.quantidade + prod.quantidade,
                                atualizado_em: knex.fn.now(),
                            });
                    } else {
                        await trx('mesas_produtos')
                            .insert({
                                id_mesa,
                                id_produto: prod.id_produto,
                                quantidade: prod.quantidade,
                                criado_em: knex.fn.now(),
                            });
                    }
                }

                // Atualiza status da mesa para ocupada
                await trx('mesas')
                    .where({ id_mesas: id_mesa })
                    .update({ ocupada: 1 });
            });

            return { validated: true, message: "Produtos adicionados com sucesso." };
        } catch (error) {
            console.error("Erro ao adicionar produtos na mesa:", error);
            return { validated: false, error: error.message };
        }
    }

// ----------LISTAR_PRODUTO_MESA----------LISTAR_PRODUTO_MESA----------LISTAR_PRODUTO_MESA----------LISTAR_PRODUTO_MESA----------LISTAR_PRODUTO_MESA----------LISTAR_PRODUTO_MESA-----------------

    async listarProdutosDaMesa(id_mesa) {
        try {
        const produtos = await knex('mesas_produtos as mp')
            .join('produtos as p', 'mp.id_produto', 'p.id_produtos')
            .select(
            'p.id_produtos',
            'p.nome',
            'p.valor',
            'mp.quantidade'
            )
            .where('mp.id_mesa', id_mesa);

        return { validated: true, values: produtos };
        } catch (error) {
        console.error("Erro ao listar produtos da mesa:", error);
        return { validated: false, error: error.message };
        }
    }

// ----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA-----------------

    async removerProdutoDaMesa(id_mesa, id_produto) {
        try {
        const existe = await knex('mesas_produtos')
            .where({ id_mesa, id_produto })
            .first();

        if (!existe) {
            return { validated: false, error: "Produto não encontrado na mesa." };
        }

        await knex('mesas_produtos')
            .where({ id_mesa, id_produto })
            .del();

        // Verifica se restaram produtos na mesa e atualiza ocupada se não houver
        const produtosRestantes = await knex('mesas_produtos')
            .where({ id_mesa });

        if (produtosRestantes.length === 0) {
            await knex('mesas')
            .where({ id_mesas: id_mesa })
            .update({ ocupada: 0 });
        }

        return { validated: true, message: "Produto removido da mesa com sucesso." };
            } catch (error) {
            console.error("Erro ao remover produto da mesa:", error);
            return { validated: false, error: error.message };
        }
    }

// ----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA----------REMOVER_PRODUTO_MESA-----------------


    async fecharMesa(id_mesa) {
        const mesa = await this.findById(id_mesa);
        if (!mesa.values) {
        return { validated: false, error: "Mesa não encontrada." };
        }

        try {
        await knex.transaction(async trx => {
            // Remove todos os produtos da mesa
            await trx('mesas_produtos')
            .where({ id_mesa })
            .del();

            // Atualiza status da mesa para não ocupada
            await trx('mesas')
            .where({ id_mesas: id_mesa })
            .update({ ocupada: 0 });
        });

        return { validated: true, message: "Mesa fechada com sucesso." };
        } catch (error) {
        console.error("Erro ao fechar a mesa:", error);
        return { validated: false, error: error.message };
        }
    }
}

module.exports = new Mesas()