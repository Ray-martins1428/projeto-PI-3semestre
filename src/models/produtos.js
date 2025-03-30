const knex = require('../config/data')  

class Produtos {

    async findAll() {
        try {
            let produtos = await knex.select(['nome','descricao','volume','valor']).table('produtos').where({status:1})
            return produtos.length > 0
                ? {validated: true, values: produtos}
                : {validated: true, values: undefined}
        } catch (error) {
            console.log("Erro ao executar a query", error)
            return {validated: false, error: error}
        }
    }
}

module.exports = new Produtos()