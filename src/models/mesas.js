const knex = require('../config/data')

class Mesas {
    async findAll() {
        try{
            let mesas = await knex.select(['descricao', 'ocupada', 'status']).table('mesas').where({status:1})
            return produtos.length > 0
                ? {validated: true, values: produtos}
                : {validated: true, values: undefined}
        } catch (error) {
            console.log("Erro ao executar a query", error)
            return {validated: false, error: error}
        }
    }
}

module.exports = new Mesas()