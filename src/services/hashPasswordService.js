const bcrypt = require('bcryptjs')

function hashPasswordService(password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

module.exports = hashPasswordService