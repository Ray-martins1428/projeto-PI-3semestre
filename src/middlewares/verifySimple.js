module.exports = function(req, res, next) {
    if (req.user.nivel === 3) {
        return next()
    } else {
        return res.status(403).json({ success: false, message: 'Acesso restrito ao nível SIMPLE.' })
    }
}