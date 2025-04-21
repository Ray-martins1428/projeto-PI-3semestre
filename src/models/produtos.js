const knex = require('../config/data')  
const usuarios = require('./usuarios')

class Produtos {

    async findAll() {
        try {
            let produtos = await knex
                .select(['nome','descricao','volume','valor'])
                .table('produtos')
                .where({status:1})

            return produtos.length > 0
                ? {validated: true, values: produtos}
                : {validated: true, values: undefined}

        } catch (error) {
            console.log("Erro ao executar a query", error)
            return {validated: false, error: error}
        }
    }

// ----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID-----------------

    async findById(id) {
        try {
            const produto = await knex('produtos')
                .select(['nome', 'descricao', 'volume', 'valor'])
                .where({ id_produtos: id, status: 1 })
                .first()
            return produto
                ? {validated: true, values: produto}
                : {validated: true, values: undefined}
        } catch (error) {
            return {validated: false, error: error}
        }
    }

// ----------CREATE----------CREATE----------CREATE----------CREATE----------CREATE----------CREATE-----------------

    async create(nome, descricao, volume, valor){
        try {
            
            await knex
            .insert({nome: nome, descricao: descricao, volume: volume, valor: valor})
            .table('produtos')
            return{validated: true}

        } catch (error) {
            return {validated: false, error: error}
        }
    }

// ----------UPDATE----------UPDATE----------UPDATE----------UPDATE----------UPDATE----------UPDATE-----------------

    async updade(nome, descricao, volume, valor){
        let usuarios = await this.findById(id)
        if(usuarios.values != undefined){

            let editProduto = {}
            nome != undefined ? editProduto.nome = nome : null
            descricao != undefined ? editProduto.descricao = descricao : null
            volume != undefined ? editProduto.volume = volume : null
            valor != undefined ? editProduto.valor = valor : null

            try{
                await knex
                .update(editProduto)
                .where({id_produtos:id})
                .table('produtos')
                return {validated: true, message: "Usuário editado com sucesso!"}

            } catch(error) {
                return {validated: false, error: error}
            }

        }else{
            return{validated: false, error: "Usuário não existente, portanto não pode ser editado!"}
        }
    }

// ----------DELETE----------DELETE----------DELETE----------DELETE----------DELETE----------DELETE-----------------

    async delete(id) {
        let produtos = await this.findById(id)
        if (produtos.values != undefined) {
            try {
                await knex
                .delete()
                .where({id_produtos:id})
                .table('produtos')
                return{validated:true, message:"Produto deletado com sucesso!!"}
            } catch (error){
                return{validated:false, error: error}
            }
        } else{
           return {validated: false, error: "PRoduto não existente, por tanto não será editado!"} 
        }
    }

}



module.exports = new Produtos()