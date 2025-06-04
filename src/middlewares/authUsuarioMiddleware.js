 const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    const auth = req.headers['authorization']
    if (auth != undefined) {
        try {
            const bearer = auth.split(' ')
            let token = bearer[1]
            const decoded = jwt.verify(token, process.env.SECRET)
            req.user = decoded
            return next()
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: 'Usuário não Autenticado',
                error: error
            })
        }
    } else {
        return res.status(403).json({ success: false, message: 'Usuário não Autenticado' })
    }
}