const knex = require('../config/data')

class Mesas {

    async findAll() {
        try {
            let mesas = await knex
                .select(['descricao', 'ocupada', 'status'])
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

}

module.exports = new Mesas()