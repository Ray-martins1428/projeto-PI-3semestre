const knex = require('../config/data')

class Usuarios {

    async findAll() {
        try{
            let usuarios = await knex
                .select(['login', 'senha', 'status'])
                .table('usuarios')
                .where({status:1})

            return usuarios.length > 0
                ? {validated: true, values: usuarios}
                : {validated: true, values: undefined}

        } catch (error) {
            console.log("Erro ao executar a query", error)
            return {validated: false, error:error}
        }
    }

// ----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID----------FIND_ID-----------------

    async findById(id) {
        try {
            const usuarios = await knex('usuarios')
                .select(['login', 'senha', 'status'])
                .where({ id_usuario: id, status: 1 })
                .first()
            return usuarios
                ? {validated: true, values: usuarios}
                : {validated: true, values: undefined}
        } catch (error) {
            return {validated: false, error: error}
        }
    }

// ----------FIND_BY_LOGIN----------FIND_BY_LOGIN----------FIND_BY_LOGIN--------------------FIND_BY_LOGIN----------FIND_BY_LOGIN----------FIND_BY_LOGIN----------

    async findByLogin(login) {
        try {
            const usuarios = await knex('usuarios')
                .select(['login', 'senha'])
                .where({ login: login, status: 1 })
                .first()

            return usuarios
                ? { validated: true, values: usuario }
                : { validated: true, values: undefined }

        } catch (error) {
            return { validated: false, error: error }
        }
    }

// ----------CREATE----------CREATE----------CREATE----------CREATE----------CREATE----------CREATE-----------------

    async create(login, senha, status){
        try {
            
            await knex
            .insert({login: login, senha: senha, status: status})
            .table('usuarios')
            return{validated: true}

        } catch (error) {
            return {validated: false, error: error}
        }
    }

// ----------UPDATE----------UPDATE----------UPDATE----------UPDATE----------UPDATE----------UPDATE-----------------

    async update(login){
        let usuarios = await this.findById(id, login)
        if(usuarios){

            let editUsuario = {}
            login != undefined ? editUsuario.login = login : null

            try{
                await knex
                .update(editUsuario)
                .where({id_usuarios:id})
                .table('usuarios')
                return {validated: true, message: "Usuário editado com sucesso!"}

            } catch(error) {
                return {validated: false, error: error}
            }

        }else{
            return{validated: false, error: "Usuário não existente, portanto não pode ser editado!"}
        }
    }

// ----------DELETE----------DELETE----------DELETE----------DELETE----------DELETE----------DELETE-----------------

    async delete(id){
        let usuarios = await this.findById(id)
        if (usuarios.values != undefined) {

            try{
                await knex
                .delete()
                .where({id_usuarios:id})
                .table('usuarios')
                return {validated: true, message: "Usuário deletado com sucesso!!"}
            } catch (error) {
                return ({validated: false, error: error})
            }
        } else {
            return{validated: false, error: "Usuário não existente, portanto não pode ser editado!"} 
        }
    }

}

module.exports = new Usuarios()