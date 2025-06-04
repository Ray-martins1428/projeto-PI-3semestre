module.exports = function(req, res, next) {
    if (req.user.nivel === 1 || req.user.nivel === 2) {
        return next()
    } else {
        return res.status(403).json({ success: false, message: 'Acesso restrito a MASTER e ADM.' })
    }
}