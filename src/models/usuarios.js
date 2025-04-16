const knex = require('../config/data')

class Usuarios {
    async findAll() {
        try{
            let usuarios = await knex
                .select(['login', 'senha', 'status'])
                .table('usuarios')
                .where({status:1})

            return usuarios.length > 0
                ?{validated: true, values: usuarios}
                :{validated: true, values: undefined}

        } catch (error) {
            console.log("Erro ao executar a query", error)
            return {validated: false, error:error}
        }
    }

    async findById(id) {
        try {
            const usuarios = await knex('usuarios')
                .select(['login', 'senha', 'status'])
                .where({ id_usuarios: id, status: 1 })
                .first()
            return usuarios
                ? { validated: true, values: usuarios }
                : { validated: true, values: undefined }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    async create(login, senha, status){
        try {
            
            await knex.insert({login: login, senha: senha, status: status}).table('usuarios')
            return{validated: true}

        } catch (error) {
            return {validated: false, error: error}
        }
    }

}

module.exports = new Usuarios()