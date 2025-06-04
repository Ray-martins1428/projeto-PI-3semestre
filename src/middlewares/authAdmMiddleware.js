require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const auth = req.headers['authorization']

    if (auth) {
        const token = auth.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.SECRET)

            if (decoded.nivel === 1 || decoded.nivel === 2) {
                return next()
            } else {
                return res.status(403).json({ success: false, message: 'Acesso restrito ao ADM ou MASTER.' })
            }

        } catch (err) {
            return res.status(403).json({ success: false, message: 'Token inválido.', error: err.message })
        }
    } else {
        return res.status(403).json({ success: false, message: 'Token não fornecido.' })
    }
}