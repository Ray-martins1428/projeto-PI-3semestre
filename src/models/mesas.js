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
}

module.exports = new Mesas()