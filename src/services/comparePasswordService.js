const bcrypt = require('bcryptjs')

function comparePasswordService(password, senhaHash){
    return bcrypt.compareSync(password, senhaHash)
}

module.exports = comparePasswordService