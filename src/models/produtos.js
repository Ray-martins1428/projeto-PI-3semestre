const knex = require('../config/data')  

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

    async findById(id) {
        try {
            const produto = await knex('produtos')
                .select(['nome', 'descricao', 'volume', 'valor'])
                .where({ id_produtos: id, status: 1 })
                .first()
            return produto
                ? { validated: true, values: produto }
                : { validated: true, values: undefined }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    async create(nome, descricao, volume, valor){
        try {
            
            await knex.insert({nome: nome, descricao: descricao, volume: volume, valor: valor}).table('produtos')
            return{validated: true}

        } catch (error) {
            return {validated: false, error: error}
        }
    }

}



module.exports = new Produtos()

//colocando comentário pra fazer commit