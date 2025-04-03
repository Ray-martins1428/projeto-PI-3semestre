const knex = require('../config/data')

class Usuarios {
    async findAll() {
        try{
            let usuarios = await knex.select(['login', 'senha', 'status']).table('usuarios').where({status:1})
            return usuarios.length > 0
                ?{validated: true, values: usuarios}
                :{validated: true, values: undefined}
        } catch (error) {
            console.log("Erro ao executar a query", error)
            return {validated: false, error:error}
        }
    }
}

module.exports = new Usuarios()