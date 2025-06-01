const knex = require('../config/data')

class FormasPagamento {
    async findAll() {
        try {
            const dados = await knex('frm_pagamentos').where({ status: 1 })
            return { validated: true, values: dados }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

// ----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID-----------------

    async findById(id) {
        try {
            const dado = await knex('frm_pagamentos').where({ id_frm_pagamento: id, status: 1 }).first()
            return dado
                ? { validated: true, values: dado }
                : { validated: true, values: undefined }
        } catch (error) {
            return { validated: false, error: error }
        }
    }
}

module.exports = new FormasPagamento()